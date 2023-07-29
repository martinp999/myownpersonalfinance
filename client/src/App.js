import React from "react";
import "./App.css";
import CategoryManager from "./components/CategoryManager";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./view/Home";
import { Stack } from "react-bootstrap";
import Accounts from "./components/Accounts";

export default function App() {
  return (
    <BrowserRouter>
      <div class="topnav">
        <Stack direction="horizontal" gap={4} class="nav">
          <Link to="/">Home</Link>
          <Link to="/categorymanager">Category Manager</Link>
          <Link to="/accounts">Accounts</Link>
        </Stack>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorymanager" element={<CategoryManager />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
}
