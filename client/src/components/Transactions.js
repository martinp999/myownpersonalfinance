import React, { useState, useEffect } from "react";
import transactionFacade from "../facade/transactions";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTransactions(await transactionFacade.getAll());
    };
    fetchData().catch(console.error);
  }, []);

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
