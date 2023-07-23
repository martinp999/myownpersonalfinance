import { RowDataPacket } from "mysql2";

export type CategoryType = {
  id?: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
};

export interface ICategory extends RowDataPacket {
  id: number;
  name: string;
  colourPrimary: string;
  colourSecondary: string;
}
