import { Connection } from "mysql2/promise";
import {
  CategorySummaryType,
  CategoryType,
  ICategory,
} from "../types/category";
import DataBase from "./dataBase.js";
import { ISubCategory, SubCategoryType } from "../types/subcategory";

export default class Categories extends DataBase {
  async createCategory(category: CategoryType) {
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

  async createSubCategory(idCategory: number, subcategory: SubCategoryType) {
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
        idCategory,
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

  async getAll(): Promise<CategorySummaryType[]> {
    const conn: Connection = await this.getConnection();
    const [res] = await conn.execute<ICategory[]>(`
      select * from categories;`);
    return res;
  }

  async get(categoryId: number): Promise<CategoryType> {
    const conn: Connection = await this.getConnection();
    const [categories] = await conn.execute<ICategory[]>(
      `select * from categories where idCategory = ?;`,
      [categoryId]
    );

    const cat: CategoryType = categories[0];

    const [subcategories] = await conn.execute<ISubCategory[]>(
      `select * from subcategories where idCategory = ?;`,
      [categoryId]
    );

    cat.subCategories = subcategories;

    return cat;
  }
}
