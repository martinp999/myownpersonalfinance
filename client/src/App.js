import React, { useState, useEffect } from "react";
import "./App.css";
import CategoryManager from "./components/CategoryManager";

export default function App() {
  return (
    <div id="transaction-container">
      <CategoryManager />
    </div>
  );
}
