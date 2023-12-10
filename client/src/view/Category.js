import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, ListGroup, Stack } from "react-bootstrap";
import { useHref, useParams } from "react-router-dom";
import SubCat_Create_Component from "../components/SubCat_Create";

export default function Category() {
  const { cat_id } = useParams();
  const [category, setCategory] = useState([]);
  const [showSubCatCreate, setShowSubCatCreate] = useState(false);

  const handleCloseSubCatCreate = () => setShowSubCatCreate(false);
  const handleShowSubCatCreate = () => setShowSubCatCreate(true);

  const getCategoryDetails = () => {
    const fetchCategory = async () => {
      const response = await fetch("/api/categories/" + cat_id);
      const c = await response.json();
      setCategory(c);
    };
    fetchCategory().catch(console.error);
  };

  useEffect(getCategoryDetails, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href={"/categories"}>Categories</Breadcrumb.Item>
        <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
      </Breadcrumb>
      <SubCat_Create_Component
        idCategory={cat_id}
        showSubCatCreate={showSubCatCreate}
        handleCloseSubCatCreate={handleCloseSubCatCreate}
        refreshSubCatList={getCategoryDetails}
      />
      <Stack direction="horizontal" gap={2}>
        <Button variant="primary" onClick={handleShowSubCatCreate}>
          Create Subcategory
        </Button>
      </Stack>
      <SubCategoryList category={category} />
    </>
  );
}

function SubCategoryList({ category }) {
  // it seems that React renders prior to useEffect response
  // then renders again.  On the first render category.subCategories
  // will be undefined
  if (category.subCategories) {
    const thisHref = useHref();
    return (
      <ListGroup>
        {category.subCategories.map((subcat) => {
          return (
            <ListGroup.Item
              action
              href={thisHref + "/subcategories/" + subcat.idSubCategory}
            >
              {subcat.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
