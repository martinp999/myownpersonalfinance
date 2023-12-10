import { Connection } from "mysql2/promise";
import { CategorySummaryType, ICategory } from "../types/category";
import DataBase from "./dataBase.js";
import { ISubCategory, SubCategoryType } from "../types/subcategory";

export default class Subcategories extends DataBase {
  async create(categoryId: number, subcategory: SubCategoryType) {
    if (!this._isValidHexColourCode(subcategory.colourPrimary)) {
      throw new Error(
        `subcategory.colourPrimary: ${subcategory.colourPrimary} is not a valid hex colour code`
      );
    }
    if (!this._isValidHexColourCode(subcategory.colourSecondary)) {
      throw new Error(
        `subcategory.colourSecondary: ${subcategory.colourSecondary} is not a valid hex colour code`
      );
    }
    const conn: Connection = await this.getConnection();
    const res = await conn.execute(
      "INSERT INTO `subcategories` (`idCategory`, `name`, `colourPrimary`, `colourSecondary`) VALUES (?, ?, ?, ?);",
      [
        categoryId,
        subcategory.name,
        subcategory.colourPrimary,
        subcategory.colourSecondary,
      ]
    );
  }

  private _isValidHexColourCode(code: string): boolean {
    const r = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return r.test(code);
  }

  async getAll(categoryId: number): Promise<CategorySummaryType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<ICategory[]>(
      `
      select * from subcategories where idCategory = ?;`,
      [categoryId]
    );
    return res;
  }

  async get(
    categoryId: number,
    subcategoryId: number
  ): Promise<SubCategoryType> {
    const conn: Connection = await this.getConnection();
    const [subcategories] = await conn.execute<ISubCategory[]>(
      `select * from subcategories where idCategory = ? and idSubCategory = ?;`,
      [categoryId, subcategoryId]
    );

    const subcat: SubCategoryType = subcategories[0];

    return subcat;
  }
}
