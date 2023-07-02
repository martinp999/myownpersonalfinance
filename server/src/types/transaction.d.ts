import dayjs from "dayjs";
import { RowDataPacket } from "mysql2";

export type TransactionType = {
  account: number;
  date: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
};

export interface ITransaction extends RowDataPacket {
  account: number;
  date: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
}
