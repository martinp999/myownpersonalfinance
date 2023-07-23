import React from "react";
import moment from "moment/moment";

export default function TransactionsView({ transactions }) {
  const currencyFormatter = new Intl.NumberFormat("en-AU", {
    style: "decimal",
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    currency: "AUD",
  });

  return (
    <div id="transaction-container">
      <table className="transactions">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{moment(transaction.date).format("DD/MM/YYYY")}</td>
              <td>{transaction.description}</td>
              <td className="currency">
                {currencyFormatter.format(transaction.creditAmount)}
              </td>
              <td className="currency">
                {currencyFormatter.format(transaction.debitAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
