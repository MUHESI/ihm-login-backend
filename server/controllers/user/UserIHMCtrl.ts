import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserIHM from "../../models/userModel.IHM";

const ObjectID = require("mongoose").Types.ObjectId;
import { BvHttpStatusCode } from "../../shared/constants/HTTPStatus";
import { ServerResponse } from "../../shared/interceptors/serverResponse";

const userIHMCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { password, email, address, names, phone } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await UserIHM.create({
        password: passwordHash,
        email,
        address,
        names,
        phone
      });

      return new ServerResponse(BvHttpStatusCode.OK, "successfully", {
        results: user,
        success: true
      }).sendResponse(res);
    } catch (err) {
      console.clear();
      console.log("err", err);
      return new ServerResponse(
        BvHttpStatusCode.BAD_REQUEST,
        `Something went wrong`,
        null,
        (err as unknown as Error).message
      ).sendResponse(res);
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserIHM.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch)
        return new ServerResponse(
          BvHttpStatusCode.OK,
          " logged successfully !",
          {
            results: user,
            success: true
          }
        ).sendResponse(res);
      else
        return new ServerResponse(BvHttpStatusCode.OK, "error", {
          results: null,
          success: false
        }).sendResponse(res);
    } catch (err) {
      return new ServerResponse(
        BvHttpStatusCode.OK,
        `Something went wrong`,
        {
          results: null,
          success: false
        },
        (err as unknown as Error).message
      ).sendResponse(res);
    }
  }
};

export default userIHMCtrl;
