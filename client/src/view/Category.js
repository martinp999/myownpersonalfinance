import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Category() {
  const { cat_id } = useParams();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/categories/" + cat_id);
      const c = await response.json();
      setCategory(c);
    };
    fetchData().catch(console.error);
  }, []);
  return <>{category.name}</>;
}
