import mysql, { Connection } from "mysql2/promise";
import Transactions from "./transactions.js";
import Accounts from "./accounts.js";
import Categories from "./categories.js";
import Payees from "./payees.js";
import Patterns from "./patterns.js";
import Subcategories from "./subcategories.js";

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

  get categories() {
    return new Categories(this._getConnection, this);
  }

  get payees() {
    return new Payees(this._getConnection, this);
  }

  get patterns() {
    return new Patterns(this._getConnection, this);
  }

  get subcategories() {
    return new Subcategories(this._getConnection, this);
  }
}
