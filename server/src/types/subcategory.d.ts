import { RowDataPacket } from "mysql2";

export type SubCategoryType = {
  id?: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
};

export interface ISubCategory extends RowDataPacket {
  id: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
}
