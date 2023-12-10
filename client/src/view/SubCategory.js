import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, ListGroup, Stack } from "react-bootstrap";
import { useHref, useParams } from "react-router-dom";
import PayeeCreateComponent from "../components/PayeeCreate";

export default function SubCategory() {
  const thisHref = useHref();
  const { cat_id, subcat_id } = useParams();

  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [payees, setPayees] = useState([]);
  const [showPayeeCreate, setShowPayeeCreate] = useState(false);

  const handleClosePayeeCreate = () => setShowPayeeCreate(false);
  const handleShowPayeeCreate = () => setShowPayeeCreate(true);

  const getCategoryDetails = () => {
    const fetchCategory = async () => {
      const response = await fetch("/api/categories/" + cat_id);
      const c = await response.json();
      setCategory(c);
    };
    fetchCategory().catch(console.error);
  };

  const getSubCategoryDetails = () => {
    const fetchSubCategory = async () => {
      const response = await fetch(
        `/api/categories/${cat_id}/subcategories/${subcat_id}`
      );
      const c = await response.json();
      setSubCategory(c);
    };
    fetchSubCategory().catch(console.error);
  };

  const getPayees = () => {
    const fetchPayees = async () => {
      const response = await fetch(
        `/api/categories/${cat_id}/subcategories/${subcat_id}/payees`
      );
      const p = await response.json();
      setPayees(p);
    };
    fetchPayees().catch(console.error);
  };
  const getData = () => {
    getCategoryDetails();
    getSubCategoryDetails();
    getPayees();
  };

  // useEffect(getCategoryDetails, []);
  // useEffect(getSubCategoryDetails, []);
  // useEffect(getPayees, []);
  useEffect(getData, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href={"/categories"}>Categories</Breadcrumb.Item>
        <Breadcrumb.Item href={`/categories/${cat_id}`}>
          {category.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{subcategory.name}</Breadcrumb.Item>
      </Breadcrumb>
      <PayeeCreateComponent
        idCategory={cat_id}
        showPayeeCreate={showPayeeCreate}
        handleClosePayeeCreate={handleClosePayeeCreate}
        refreshPayeeList={getPayees}
      />
      <Stack direction="horizontal" gap={2}>
        <Button variant="primary" onClick={handleShowPayeeCreate}>
          Create Payee
        </Button>
      </Stack>
      <ListGroup>
        {payees.map((payee) => (
          <ListGroup.Item action href={thisHref + "/payees/" + payee.id}>
            {payee.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
