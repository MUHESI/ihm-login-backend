import { Request, Response } from "express";
import Users from "../../models/userModel";
import { logicPagination } from "../../middleware/help.pagination";
const ObjectID = require("mongoose").Types.ObjectId;
import { BvHttpStatusCode } from "../../shared/constants/HTTPStatus";
import { ServerResponse } from "../../shared/interceptors/serverResponse";

const userCtrl = {
  // logicPagination

  getAllUsersByEntity: async (req: Request, res: Response) => {
    try {
      const users = await Users.find({
        entite: req.query.entite
      }).select("-password");

      if (!users)
        return new ServerResponse(BvHttpStatusCode.OK, "successfully", {
          results: "no users found",
          success: true
        }).sendResponse(res);

      return new ServerResponse(BvHttpStatusCode.OK, "successfully", {
        results: users,
        success: true
      }).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        BvHttpStatusCode.BAD_REQUEST,
        "users not found  ",
        null,
        err.message
      ).sendResponse(res);
    }
  },
  /**
   *
   * todo: review this fn
   * */
  getAllUsersByEntityPaginated: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string);
    const limitPage = parseInt(req.query.limit as string);
    const { entite }: any = req.params;

    if (entite) {
      const lengthResultats = await Users.countDocuments({ entite }).exec();
      if (lengthResultats === 0) return res.status(200).json([]);

      const { pagination, startIndex } = logicPagination(
        page,
        limitPage,
        lengthResultats
      );

      try {
        const users = await Users.find({
          entite
        }).select("-password");
        if (!users) return res.status(500).json({ users: "no user found" });
        return res.status(200).json({ users, pagination, success: true });
      } catch (err: any) {
        return new ServerResponse(
          BvHttpStatusCode.BAD_REQUEST,
          "users not found  ",
          null,
          err.message
        ).sendResponse(res);
      }
    }
  },
  getAllUsersByEntityRole: async (req: Request, res: Response) => {
    try {
      const users = await Users.find({
        entite: req.query.entite,
        role: req.query.role
      }).select("-password");

      return new ServerResponse(BvHttpStatusCode.OK, "successfully", {
        results: users,
        success: true
      }).sendResponse(res);
    } catch (err: any) {
      console.log(err.message);
      return new ServerResponse(
        BvHttpStatusCode.BAD_REQUEST,
        "users not found  ",
        null,
        err.message
      ).sendResponse(res);
    }
  },

  getInfoUser: async (req: Request, res: Response) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown : " + req.params.id);
    try {
      const user = await Users.findOne({ _id: req.params.id }).exec();
      res.status(200).json({ user, success: true });
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({ err });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    // WIP
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown : " + req.params.id);

    try {
      const res: any = [];
      res.status(200).json({ res, success: true });
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({ err });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown : " + req.params.id);

    try {
      await Users.remove({ _id: req.params.id }).exec();
      res
        .status(200)
        .json({ message: "Successfully deleted. ", success: true });
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({ err });
    }
  }
};

export default userCtrl;
