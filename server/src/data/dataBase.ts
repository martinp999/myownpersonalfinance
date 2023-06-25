import { Connection } from "mysql2/promise";
import DbFacade from "./dbFacade.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { AccountTypeEnum } from "../types/account";

dayjs.extend(customParseFormat);

export default class DataBase {
  private _connectionGetter: () => Promise<Connection>;
  private _facade: DbFacade;

  constructor(getConnection: () => Promise<Connection>, facade: DbFacade) {
    this._connectionGetter = getConnection;
    this._facade = facade;
  }

  protected async getConnection(): Promise<Connection> {
    return await this._connectionGetter.call(this._facade);
  }
}
