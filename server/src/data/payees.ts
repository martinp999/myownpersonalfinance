import { Connection } from "mysql2/promise";
import { PayeeType, IPayee } from "../types/payee";
import DataBase from "./dataBase.js";

export default class Payees extends DataBase {
  async getAll(categoryId: number): Promise<PayeeType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IPayee[]>(
      `select * from payees where payees_cat_id = ?;`,
      [categoryId]
    );
    return res;
  }
}
