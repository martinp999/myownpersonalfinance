import dayjs from "dayjs";
import { RowDataPacket } from "mysql2";

export type TransactionType = {
  account: number;
  date: dayjs;
  description: string;
  debitAmount: number;
  creditAmount: number;
};

export interface ITransaction extends RowDataPacket {
  account: number;
  date: dayjs;
  description: string;
  debitAmount: number;
  creditAmount: number;
}

export type TrxSortType = {
  description: string;
  account: string;
  count: number;
  debitAmount: number;
  creditAmount: number;
};

export interface ITrxSort extends RowDataPacket {
  description: string;
  account: string;
  count: number;
  debitAmount: number;
  creditAmount: number;
}
