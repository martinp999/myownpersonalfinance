import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useHref } from "react-router-dom";

export default function Categories() {
  const thisHref = useHref();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/categories");
      const c = await response.json();
      setCategories(c);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <ListGroup>
        {categories.map((category) => (
          <ListGroup.Item
            action
            href={thisHref + "/" + category.idCategory + "/"}
          >
            {category.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
