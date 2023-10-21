import React, { useState, useEffect } from "react";
import { Button, ListGroup, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PayeeCreateComponent from "../components/PayeeCreate";

export default function Category() {
  const { cat_id } = useParams();

  const [category, setCategory] = useState([]);
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
  const getPayees = () => {
    const fetchPayees = async () => {
      const response = await fetch("/api/categories/" + cat_id + "/payees");
      const p = await response.json();
      setPayees(p);
    };
    fetchPayees().catch(console.error);
  };

  useEffect(getCategoryDetails, []);
  useEffect(getPayees, []);

  return (
    <>
      <div>{category.name}</div>
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
          <ListGroup.Item action>{payee.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
