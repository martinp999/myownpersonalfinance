import React, { useState, useEffect } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/accounts");
      setAccounts(await response.json());
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <div id="transaction-container">
        <table className="transactions">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Bank</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr>
                <td>{account.idAccount}</td>
                <td>{account.name}</td>
                <td>{account.bank}</td>
                <td>{account.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ul className="accounts">
        {accounts.map((account) => (
          <li className="account">
            <p>
              <strong>Name:</strong> {account.name}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
