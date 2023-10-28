import { RowDataPacket } from "mysql2";

export type PayeeType = {
  id: number;
  name: string;
  description: string;
  idCategory: number;
};

export type PayeeDetailType = PayeeType & {
  catName: string;
};

export interface IPayee extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  idCategory: number;
}

export interface IPayeeDetail extends IPayee {
  catName: string;
}
