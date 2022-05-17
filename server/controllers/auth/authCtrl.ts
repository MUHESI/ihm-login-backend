import { Request, Response } from "express";
import { BvHttpStatusCode } from "../../shared/constants/HTTPStatus";
import { BvHttpError } from "../../shared/helpers/error.handler";
import { ServerResponse } from "../../shared/interceptors/serverResponse";
import Users from "../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken
} from "../../config/generateToken";
import {
  validateEmail,
  validPhone,
  validRegister
} from "../../middleware/valid";
// import sendEMail from "../../config/sendMail";

import { IToken, IUser } from "../../config/interfaces";

const CLIENT_URL = `${process.env.BASE_URL}`;
const TEXT_TO_EMAIL = "Verify your email address check Now";
/**
 * auth user
 */
const autCtrl = {
  /**
   * register user
   */
  register: async (req: Request, res: Response) => {
    try {
      const { lName, account, password, fName, role, entite } = req.body;
      const user = await Users.findOne({ account });

      if (user) {
        return new ServerResponse(
          BvHttpStatusCode.BAD_REQUEST,
          `Something went wrong`,
          { user: user },
          "email or phone number is already exists."
        ).sendResponse(res);
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        lName,
        account,
        password: passwordHash,
        fName,
        role,
        entite
      };

      const activeToken = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${activeToken}`;
      if (validateEmail(account)) {
        try {
          const user = new Users(newUser);
          await user.save();
          if (user._id) {
            return new ServerResponse(
              BvHttpStatusCode.CREATED,
              "successfully ",
              {
                success: true,
                NewUser: user,
                resMail: null
              }
            ).sendResponse(res);
          }
        } catch (err: any) {
          console.log(err.message);
          return res.status(500).json({ err });
        }
      }
      return res.status(500).json({ err: "email no valid" });

      // validPhone();
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const decoded = <IToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      const { newUser } = decoded;
      const user = new Users(newUser);
      await user.save();
      res.status(201).json({ user });

      return res.status(200).json({ user, status: "ok" });

      console.log(decoded);
    } catch (err: any) {
      console.log(err.message);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });

      if (!user)
        return new ServerResponse(
          BvHttpStatusCode.BAD_REQUEST,
          "Password or email is incorrect"
        ).sendResponse(res);
      // if user exists
      loginUser(user, password, res);
    } catch (err: any) {
      return new ServerResponse(
        BvHttpStatusCode.BAD_REQUEST,
        "Password or email is incorrect.",
        null,
        err.message
      ).sendResponse(res);
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", { path: `/api/auth/refresh_token` });
      return new ServerResponse(BvHttpStatusCode.OK, "Logged out.", {
        success: true
      }).sendResponse(res);
    } catch (err: any) {
      console.log(err.message);
    }
  },
  verifyTokenUser: async (req: Request, res: Response) => {
    try {
      const autHeader: any | [] | string = req.headers["authorization"];
      const token = autHeader && autHeader.split(" ")[1];
      if (!token)
        return new ServerResponse(
          BvHttpStatusCode.NOT_FOUND,
          "token Not found"
        ).sendResponse(res);

      const decoded = <IToken>(
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      );

      if (!decoded.user) {
        return new ServerResponse(
          BvHttpStatusCode.NOT_FOUND,
          "token Not found,  Please login Now",
          { decoded }
        ).sendResponse(res);
      }

      return new ServerResponse(BvHttpStatusCode.OK, "successfully ", {
        success: true,
        user: decoded.user,
        accessToken: token
      }).sendResponse(res);
    } catch (err: any) {
      console.log(err.message);
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const r_token = req.cookies.refreshToken;
      console.clear();
      console.log("req.cookies :>> ", req.cookies);

      if (!r_token)
        return res.status(400).json({ msg: "No token, Please login Now !" });
      const decoded = <IToken>(
        jwt.verify(r_token, `${process.env.REFRRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id)
        return res.status(400).json({ msg: " Please login Now." });
      const user = await Users.findById(decoded.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: " This account does not exist! " });
      const access_token = generateAccessToken({ id: user._id });
      return res.json({ access_token, user });
    } catch (err: any) {
      console.log(err.message);
    }
  }
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);
  console.log({ passwordHash: user.password });

  if (!isMatch)
    return new ServerResponse(
      BvHttpStatusCode.BAD_REQUEST,
      "Password or email is incorrect."
    ).sendResponse(res);

  const userToken = { ...user._doc, password: "" };

  const accessToken = generateAccessToken({ user: userToken });
  const refreshToken = generateRefreshToken({ user: userToken });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: `/api/auth/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
  });
  return new ServerResponse(BvHttpStatusCode.OK, "Login success.", {
    success: true,
    accessToken,
    user: { ...user._doc, accessToken, password: "" }
  }).sendResponse(res);
};

export default autCtrl;
