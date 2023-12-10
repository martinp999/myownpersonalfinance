import { RowDataPacket } from "mysql2";

export type PayeeType = {
  id: number;
  name: string;
  description: string;
  idCategory: number;
  idSubCategory: number;
};

export type PayeeDetailType = PayeeType & {
  catName: string;
  subCatName: string;
};

export interface IPayee extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  idCategory: number;
  idSubCategory: number;
}

export interface IPayeeDetail extends IPayee {
  catName: string;
  subCatName: string;
}
