import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

import Home from "./view/Home";
import TransactionManager from "./view/TransactionManager";
import Accounts from "./components/Accounts";
import TrxUpload from "./view/TrxUpload";

export default function App() {
  return (
    <BrowserRouter>
      <div class="topnav">
        <Stack direction="horizontal" gap={4} class="nav">
          <Link to="/">Home</Link>
          <Link to="/transactionmanager">Transaction Manager</Link>
          <Link to="/accounts">Accounts</Link>
          <Link to="/trxupload">Upload</Link>
        </Stack>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactionmanager" element={<TransactionManager />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/trxupload" element={<TrxUpload />} />
      </Routes>
    </BrowserRouter>
  );
}
