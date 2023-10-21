import { Connection } from "mysql2/promise";
import { PayeeType, IPayee } from "../types/payee";
import DataBase from "./dataBase.js";

export default class Payees extends DataBase {
  async create(
    idCategory: number,
    payeeName: string,
    payeeDescription?: string
  ) {
    const conn: Connection = await this.getConnection();
    const res = await conn.execute(
      "INSERT INTO `payees` (`name`, `description`, `idCategory`) VALUES (?, ?, ?);",
      [payeeName, payeeDescription || "", idCategory]
    );
  }

  async getAll(categoryId: number): Promise<PayeeType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IPayee[]>(
      `select * from payees where idCategory = ?;`,
      [categoryId]
    );
    return res;
  }
}
