import { Document } from "mongoose";
import { Entity } from "../config/interfaces";
import { RaisonTransaction } from "../utils/interface";

enum StatusSociety {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  CLOSED = "CLOSED"
}
// add other types for  TypeGlasses, TypeReaprationGlasses

enum TypeGlasses {
  UNDEFINED = "UNDEFINED"
}
enum TypeReparationGlasses {
  UNDEFINED = "UNDEFINED"
}

interface IArticles {
  designation: string;
  quantity: number;
  PUnit: number;
  Total: number;
  idArticle: string;
  AddInfo: string;
}
export interface ITransaction extends Document {
  //common keys
  entite: Entity;
  status: StatusSociety;
  client: string;
  society?: string;
  raison: RaisonTransaction;
  amount: number;
  confirmPayment: boolean;
  dateConfirmPayment?: number;
  caissierRecette: string;
  confirmInsertByCaisseRecette?: boolean;
  DateConfirmInsertByCaisseRecette?: number;

  //specific fields
  advancedConsultation?: string;
  articles?: IArticles[];
  //laboratoryService fields
  consultation?: string;
  confirmWorkOfLaboratory?: boolean;
  DateConfirmWorkOfLaboratory?: number;
  typeGlasses?: TypeGlasses;
  typeReparation?: TypeReparationGlasses;
  addInfo?: string;
  _doc: object;
}

export interface ISaleArticles {
  client: string;
  entite: string;
  raison: string;
  amount: number;
  confirmPayment: boolean;
  confirmInsertByCaisseRecette: boolean;
  articles: IArticles;
}
