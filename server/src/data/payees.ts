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
    idSubCategory: number,
    payeeName: string,
    payeeDescription?: string
  ) {
    const conn: Connection = await this.getConnection();
    const res = await conn.execute(
      "INSERT INTO `payees` (`name`, `description`, `idSubCategory`) VALUES (?, ?, ?);",
      [payeeName, payeeDescription || "", idSubCategory]
    );
  }

  async getAll(idSubCategory: number): Promise<PayeeType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IPayee[]>(
      `select p.*, sc.idCategory 
      from payees p
      inner join subcategories sc on p.idSubCategory = sc.idSubCategory
      where p.idSubCategory = ?;`,
      [idSubCategory]
    );
    return res;
  }

  async get(idPayee: number): Promise<PayeeDetailType> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<IPayeeDetail[]>(
      `select p.*, sc.idCategory, sc.name as subCatName, c.name as catName 
        from payees p
	      inner join subcategories sc on p.idSubCategory = sc.idSubCategory 
        inner join categories c on sc.idCategory = c.idCategory 
        where p.id = ?;`,
      [idPayee]
    );
    return res[0];
  }
}
