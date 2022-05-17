import { Document } from "mongoose";

export interface IPagination {
  nbOfPages: number | any;
  next?: number;
  previous?: number;
  nbOfDocs: number;
  limit: number;
  page?: number | string;
}

export interface IResult {
  data: any[] | any;
  pagination: IPagination | any;
}

export interface IUser extends Document {
  data: any[] | any;
  pagination: IPagination | any;
}
export enum RaisonTransaction {
  FACT_CONSULTATION = "FACT_CONSULTATION",
  PURCHASE_OF_ARTICLES = "PURCHASE_OF_ARTICLES",
  MOUNT_GLASSES = "MOUNT_GLASSES",
  MOUNT_GLASSES_FROM_OPTIC_PRESCRIPTION = "MOUNT_GLASSES_FROM_OPTIC_PRESCRIPTION",
  REPARATION_OF_GLASSES = "REPARATION_OF_GLASSES",
  ADVANCED_CONSULTATION = "ADVANCED_CONSULTATION"
}
