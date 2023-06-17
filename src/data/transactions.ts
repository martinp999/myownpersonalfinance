import { Connection } from "mysql2/promise";
import DbFacade from "./dbFacade";
import { TransactionType } from "../types/transaction";
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
}
