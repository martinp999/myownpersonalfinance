import mysql, { Connection } from "mysql2/promise";
import Transactions from "./transactions.js";
import Accounts from "./accounts.js";

export default class DbFacade {
  private _connection: Connection | null = null;

  private async _getConnection(): Promise<Connection> {
    if (!this._connection) {
      this._connection = await mysql.createConnection({
        host: "localhost",
        user: "mopf",
        password: "ajaxtop01!",
        database: "mopf",
      });
    }
    return this._connection;
  }

  get transactions() {
    return new Transactions(this._getConnection, this);
  }

  get accounts() {
    return new Accounts(this._getConnection, this);
  }
}
