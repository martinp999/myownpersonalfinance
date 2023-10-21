import { RowDataPacket } from "mysql2";

export type PayeeRegexpType = {
  id: number;
  name: string;
  regexp: RegExp;
  idPayee: number;
};

export interface IPayeeRegexp extends RowDataPacket {
  id: number;
  name: string;
  regexp: RegExp;
  idPayee: number;
}
