import { Connection } from "mysql2/promise";
import {
  PayeeType,
  IPayee,
  PayeeDetailType,
  IPayeeDetail,
} from "../types/payee";
import DataBase from "./dataBase.js";

export default class Patterns extends DataBase {
  async create(idPayee: number, pattern: string) {
    const conn: Connection = await this.getConnection();
    const res = await conn.execute(
      "INSERT INTO `patterns` (`pattern`, `idPayee`) VALUES (?, ?);",
      [pattern, idPayee]
    );
  }

  async getAll(idPayee: number): Promise<PayeeType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IPayee[]>(
      `select * from patterns where idPayee = ?;`,
      [idPayee]
    );
    return res;
  }
}
