import { Document } from "mongoose";

export enum Entity {
  GORMA = "GORMA",
  BUTEMBO = "BUTEMBO",
  BUNIA = "BUNIA",
  KISANGANI = "KISANGANI",
  KINSHASA = "KINSHASA"
}

export interface IUser extends Document {
  fName: string;
  lName: string;
  bio: string;
  codePersonel: string;
  entite: Entity;
  role: string;
  account: string;
  password: string;
  adress: string;
  onHolyday: boolean;
  actif: boolean;
  catDr: string;
  specialityofDr: string;
  sex: string;
  status: string;
  active: boolean;
  phone: string;
  cover: string;
  onholyday: boolean;
  createdBy: string;
  _doc: object;
}

export interface INewUser {
  lName: string;
  fName: string;
  account: string;
  password: string;
  role: string;
  entite: string;
}

export interface IToken extends INewUser {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
  user: any;
}

export interface IClientReq extends INewUser {
  page?: number;
  limit?: number;
  query: any;
}
