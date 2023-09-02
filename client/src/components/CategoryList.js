import React, { useState, useEffect } from "react";
import { Form, Button, Offcanvas, Modal } from "react-bootstrap";
import TagBadgeElement from "../elements/TagBadgeElement";

export default function CategoryListComponent({
  showCategoryList,
  handleCloseCategoryList,
}) {
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
      <Offcanvas show={showCategoryList} onHide={handleCloseCategoryList}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>List Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {categories.map((category) => (
              <li>{category.name}</li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
