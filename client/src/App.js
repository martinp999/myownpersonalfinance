import React from "react";
import axios from "axios";
import "./App.css";

export default class App extends React.Component {
  state = {
    transactions: [],
  };
  componentDidMount() {
    axios.get("/api/transactions").then((response) => {
      this.setState({ transactions: response.data });
    });
  }

  render() {
    const { transactions: transactions } = this.state;
    return (
      <div>
        <table className="transactions">
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.creditAmount}</td>
              <td>{transaction.debitAmount}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
