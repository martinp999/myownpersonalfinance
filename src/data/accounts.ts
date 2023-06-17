import { Connection } from "mysql2/promise";
import { RowDataPacket } from "mysql2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { IAccount, AccountType } from "../types/account";
import DataBase from "./dataBase.js";

dayjs.extend(customParseFormat);

export default class Accounts extends DataBase {
  async get(accountId: number): Promise<IAccount | undefined> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IAccount[]>(
      "select * from accounts where idAccount = ?;",
      [accountId]
    );
    return res[0];
  }

  async getAll(): Promise<IAccount[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IAccount[]>("select * from accounts;");
    return res;
  }

  async create(account: AccountType) {
    const conn: Connection = await this.getConnection();
    const q =
      "insert into `accounts` (`name`, `bank`, `type`) values (?, ?, ?)";
    await conn.execute(q, [account.name, account.bank, account.type]);
  }
}
