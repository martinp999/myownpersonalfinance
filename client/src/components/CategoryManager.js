import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
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

  const resetTransactions = () => {
    setTransView(transactions);
  };

  const filterTransactions = () => {
    let elem = document.getElementById("regexp");
    if (validateRegExp(elem.value)) {
      let r = new RegExp(elem.value);
      setTransView(
        transactions.filter((t) => {
          return r.test(t.description);
        })
      );
    }
  };

  const validateRegExp = (r) => {
    let isValid = true;
    try {
      new RegExp(r);
    } catch (e) {
      isValid = false;
    }
    if (!isValid) alert("Invalid regular expression");
    return isValid;
  };

  return (
    <div>
      <input id="regexp"></input>
      <Button onClick={filterTransactions}>Apply</Button>
      <Button onClick={resetTransactions}>Reset</Button>
      <TransactionsView transactions={transView} />
    </div>
  );
}
