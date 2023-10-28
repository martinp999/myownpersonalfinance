import { Connection } from "mysql2/promise";
import {
  PayeeType,
  IPayee,
  PayeeDetailType,
  IPayeeDetail,
} from "../types/payee";
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

  async get(categoryId: number, payeeId: number): Promise<PayeeDetailType> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IPayeeDetail[]>(
      `select p.*, c.name as catName 
        from payees p
	      inner join categories c on p.idCategory = c.idCategory 
        where p.idCategory = ? and p.id = ?;`,
      [categoryId, payeeId]
    );
    return res[0];
  }
}
