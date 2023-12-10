import { RowDataPacket } from "mysql2";

export type PatternType = {
  id: number;
  pattern: RegExp;
  idPayee: number;
};

export interface IPattern extends RowDataPacket {
  id: number;
  pattern: RegExp;
  idPayee: number;
}
