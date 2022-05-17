import { Response, Request, NextFunction } from "express";
import { ServerResponse } from "../interceptors/serverResponse";
import { BvHttpStatusCode } from "../constants/HTTPStatus";
// import { JaCallBack, JaExpressHandler } from "../../@types";
export class BvHttpError extends Error {
  constructor(
    public message: string,
    public status: number = BvHttpStatusCode.INTERNAL_SERVER_ERROR,
    public error?: Error
  ) {
    super();
  }
  static throwError<T = any>(
    data: T,
    message = "something went wrong",
    code = BvHttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    if (!data) {
      throw new BvHttpError(message, code);
    }
  }
  static sendErrorMessage(errorInstance: BvHttpError, res: Response) {
    const { status = 500, message, error } = errorInstance;
    return res
      .status(status)
      .json(new ServerResponse(status, message, null, error));
  }

  // static asyncHandler(controller: JaExpressHandler, callback: JaCallBack) {
  //    return async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //          await controller(req, res, next);
  //          return callback(req, res);
  //       } catch (error: any) {
  //          if (error instanceof BvHttpError) {
  //             BvHttpError.sendErrorMessage(error, res);
  //          } else {
  //             const errorInstance = new BvHttpError(error.message, BvHttpStatusCode.INTERNAL_SERVER_ERROR, error);
  //             BvHttpError.sendErrorMessage(errorInstance, res);
  //          }
  //       }
  //    };
  // }
}
