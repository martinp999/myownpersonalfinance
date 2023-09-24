import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Category() {
  const { cat_id } = useParams();

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("/api/categories/" + cat_id);
      const c = await response.json();
      setCategory(c);
    };
    fetchCategory().catch(console.error);
  }, []);

  const [payees, setPayees] = useState([]);
  useEffect(() => {
    const fetchPayees = async () => {
      const response = await fetch("/api/categories/" + cat_id + "/payees");
      const p = await response.json();
      setPayees(p);
    };
    fetchPayees().catch(console.error);
  }, []);

  return (
    <>
      <div>{category.name}</div>
      <ListGroup>
        {payees.map((payee) => (
          <ListGroup.Item action>{payee.payee_name}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
