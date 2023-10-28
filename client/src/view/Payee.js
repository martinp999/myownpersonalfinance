import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, ListGroup, Stack } from "react-bootstrap";
import { useHref, useParams } from "react-router-dom";

export default function Payee() {
  const thisHref = useHref();
  const { cat_id, payee_id } = useParams();

  const [payee, setPayee] = useState([]);

  const getPayeeDetails = () => {
    const fetchPayee = async () => {
      const response = await fetch(
        "/api/categories/" + cat_id + "/payees/" + payee_id
      );
      const c = await response.json();
      setPayee(c);
    };
    fetchPayee().catch(console.error);
  };

  useEffect(getPayeeDetails, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href={"/categories/" + cat_id}>
          {payee.catName}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{payee.name}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
