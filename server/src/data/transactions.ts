import { Connection } from "mysql2/promise";
import {
  TransactionType,
  ITransaction,
  TrxSortType,
  ITrxSort,
} from "../types/transaction";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import DataBase from "./dataBase.js";

dayjs.extend(customParseFormat);

export default class Transactions extends DataBase {
  async insert(transaction: TransactionType) {
    const conn: Connection = await this.getConnection();
    const res = await conn.execute(
      "INSERT INTO `transactions` (`idAccount`, `date`, `description`, `debit`, `credit`) VALUES (?, ?, ?, ?, ?);",
      [
        transaction.account,
        transaction.date.format("YYYY-MM-DD"),
        transaction.description,
        transaction.debitAmount,
        transaction.creditAmount,
      ]
    );
  }

  async getAll(): Promise<TransactionType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<ITransaction[]>(`
      select idAccount as account,
      date,
      description,
      credit as creditAmount,
      debit as debitAmount
      from transactions;`);
    return res;
  }

  async getDistinctDescriptions(): Promise<TrxSortType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<ITrxSort[]>(`
      select  t.description, a.name as account, count(*) as count, sum(t.credit) as credit, sum(t.debit) as debit
      from transactions t
      inner join accounts a on t.idAccount = a.idAccount
      group by t.description, a.name
      order by count desc, debit desc;`);
    return res;
  }
}
