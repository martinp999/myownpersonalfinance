import React from "react";
import axios from "axios";
import "./App.css";

export default class App extends React.Component {
  state = {
    accounts: [],
  };
  componentDidMount() {
    axios.get("/api/accounts").then((response) => {
      this.setState({ accounts: response.data });
    });
  }

  render() {
    const { accounts: accounts } = this.state;
    return (
      <div>
        <ul className="accounts">
          {accounts.map((account) => (
            <li className="account">
              <p>
                <strong>Name:</strong> {account.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
