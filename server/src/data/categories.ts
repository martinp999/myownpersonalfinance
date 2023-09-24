import { Connection } from "mysql2/promise";
import { CategoryType, ICategory } from "../types/category";
import DataBase from "./dataBase.js";

export default class Categories extends DataBase {
  async create(category: CategoryType) {
    if (!this._isValidHexColourCode(category.colourPrimary)) {
      throw new Error(
        `category.colourPrimary: ${category.colourPrimary} is not a valid hex colour code`
      );
    }
    if (!this._isValidHexColourCode(category.colourSecondary)) {
      throw new Error(
        `category.colourSecondary: ${category.colourSecondary} is not a valid hex colour code`
      );
    }
    const conn: Connection = await this.getConnection();
    const res = await conn.execute(
      "INSERT INTO `categories` (`name`, `colourPrimary`, `colourSecondary`) VALUES (?, ?, ?);",
      [category.name, category.colourPrimary, category.colourSecondary]
    );
  }

  private _isValidHexColourCode(code: string): boolean {
    const r = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return r.test(code);
  }

  async getAll(): Promise<CategoryType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<ICategory[]>(`
      select * from categories;`);
    return res;
  }

  async get(categoryId: number): Promise<CategoryType> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<ICategory[]>(
      `select * from categories where idCategory = ?;`,
      [categoryId]
    );
    return res[0];
  }
}
