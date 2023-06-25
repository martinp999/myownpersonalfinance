import dayjs from "dayjs";
import { RowDataPacket } from "mysql2";

export type AccountType = { name: string; bank: string; type: AccountTypeEnum };

export interface IAccount extends RowDataPacket {
  id?: number;
  name: string;
  bank: string;
  type: AccountTypeEnum;
  earliestTransaction?: dayjs;
  latestTransaction?: dayjs;
}

export enum AccountTypeEnum {
  "credit",
  "savings",
}
