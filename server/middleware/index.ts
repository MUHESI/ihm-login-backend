const ObjectID = require("mongoose").Types.ObjectId;
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { BvHttpStatusCode } from "../shared/constants/HTTPStatus";
import { ServerResponse } from "../shared/interceptors/serverResponse";
// import FactConsult from "../models/caisse/FacturationConsultationModel";
// import ManagerDebt from "../models/caisse/transactForPurchaseFactConsulLabotModel";
// import PayBackDebt from "../models/caisse/paybackDebtModel";
// import Debt from "../models/caisse/_debtModel";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unkown : " + req.params.id);
  else next();
};
export const checkEntity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.entite)
    return res.status(400).send({ error: "params entity  miss" });
  else next();
};

export const checkParamsOfPagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string);
    const limitPage = parseInt(req.query.limit as string);
    if (!page || !limitPage)
      return new ServerResponse(
        BvHttpStatusCode.BAD_REQUEST,
        "params page or limit miss",
        null,
        null
      ).sendResponse(res);
    else return next();
  } catch (error: any) {
    return new ServerResponse(
      BvHttpStatusCode.BAD_REQUEST,
      "Error !  ",
      null,
      error.message
    ).sendResponse(res);
  }
};

// to delete cause is obsolete
export const updateCollectionOfDebts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  //
  const factConsultations = "factConsultations";
  const laboratoryService = "laboratoryService";
  const factConsultationMed = "factConsultationMed";
  const purchaseOfArticles = "purchaseOfArticles";
  const advancedConsultation = "advancedConsultation";

  /*  switch (req.body.collectionToUpdate) {
    case factConsultations:
      console.log(" cond. I. factConsultations :>> ", factConsultations);
      try {
        const factConsult = await FactConsult.findOneAndUpdate(
          { _id: req.body.factConsultationMed },
          {
            confirmPayement: {
              date: new Date().getTime(),
              confirmation: false
            },
            confirmInsertByCaisseRecette: {
              date: new Date().getTime(),
              confirmation: false
            }
          },
          { new: true }
        );

        if (
          factConsult.confirmPayement.confirmation === false &&
          factConsult.confirmInsertByCaisseRecette.confirmation === false
        ) {
          next();
        } else {
          return res.status(500).json({
            error: "Some thing is invalid",
            docFromDB: factConsult,
            docFromClient: req.body,
            success: false
          });
        }
      } catch (err) {
        return res.status(500).json({ message: err });
      }
      break;
    case laboratoryService:
      console.log(" cond. II. laboratoryService :>> ", laboratoryService);

      try {
        await FactConsult.findOneAndUpdate(
          { _id: req.params.id },
          {
            confirmPayement: req.body.confirmPayement,
            confirmInsertByCaisseRecette: req.body.confirmInsertByCaisseRecette
          }
        );
        const factConsult = await FactConsult.findOne({
          _id: req.params.id
        }).exec();

        if (
          factConsult.confirmPayement.confirmation ===
            req.body.confirmPayement.confirmation &&
          factConsult.confirmInsertByCaisseRecette.confirmation ===
            req.body.confirmInsertByCaisseRecette.confirmation
        ) {
          next();
        } else {
          return res.status(500).json({
            error: "Some thing is invalid",
            docFromDB: factConsult,
            docFromClient: req.body,
            success: false
          });
        }
      } catch (err) {
        return res.status(500).json({ message: err });
      }
      break;

    default:
      break;
  } */
};
