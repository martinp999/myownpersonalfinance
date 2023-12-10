import { RowDataPacket } from "mysql2";
import { ISubCategory, SubCategoryType } from "./subcategory";

export type CategorySummaryType = {
  id?: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
};

export type CategoryType = {
  id?: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
  subCategories?: SubCategoryType[];
};

export interface ICategory extends RowDataPacket {
  id: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
}
