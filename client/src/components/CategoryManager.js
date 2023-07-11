import React, { useState, useEffect } from "react";
import TransactionsView from "../view/TransactionsView";

export default function CategoryManager() {
  const [transactions, setTransactions] = useState([]);
  const [transView, setTransView] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/transactions");
      const t = await response.json();
      setTransactions(t);
      setTransView(t);
    };

    fetchData().catch(console.error);
  }, []);

  const filterTransactions = () => {
    setTransView(
      transactions.filter((t) => {
        return t.description.includes("Telstra");
      })
    );
  };

  return (
    <div>
      <input id="regexp"></input>
      <button onClick={filterTransactions}>Click</button>
      <TransactionsView transactions={transView} />
    </div>
  );
}
