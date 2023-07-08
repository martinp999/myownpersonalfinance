import React, { useState, useEffect } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/transactions");
      setTransactions(await response.json());
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
