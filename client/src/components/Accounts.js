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
