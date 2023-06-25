import dayjs from "dayjs";
export type TransactionType = {
  account: number;
  date: dayjs;
  description: string;
  debitAmount: number;
  creditAmount: number;
};
