import React, { useState, useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useHref } from "react-router-dom";
import CategoryCreateComponent from "../components/CategoryCreate";

export default function Categories() {
  const thisHref = useHref();

  const [categories, setCategories] = useState([]);
  const [showCategoryCreate, setShowCreateCategory] = useState(false);

  const handleCloseCategoryCreate = () => setShowCreateCategory(false);
  const handleShowCategoryCreate = () => setShowCreateCategory(true);
  const refreshCategoryList = () => {
    const fetchData = async () => {
      const response = await fetch("/api/categories");
      const c = await response.json();
      setCategories(c);
    };
    fetchData().catch(console.error);
  };

  useEffect(refreshCategoryList, []);

  return (
    <>
      <CategoryCreateComponent
        showCategoryCreate={showCategoryCreate}
        handleCloseCategoryCreate={handleCloseCategoryCreate}
        refreshCategoryList={refreshCategoryList}
      />

      <Stack direction="horizontal" gap={2}>
        <Button variant="primary" onClick={handleShowCategoryCreate}>
          Create Category
        </Button>
      </Stack>

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
