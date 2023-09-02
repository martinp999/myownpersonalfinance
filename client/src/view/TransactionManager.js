import React, { useState, useEffect } from "react";
import { Stack, Form, Button, Row, Container, Col } from "react-bootstrap";
import TransactionsTable from "../components/TransactionsTable";
import CategoryCreateComponent from "../components/CategoryCreate";
import CategoryListComponent from "../components/CategoryList";

export default function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [transView, setTransView] = useState([]);
  const [showCategoryCreate, setShowCreateCategory] = useState(false);
  const [showCategoriesList, setShowListCategories] = useState(false);

  const handleCloseCategoryCreate = () => setShowCreateCategory(false);
  const handleShowCategoryCreate = () => setShowCreateCategory(true);

  const handleCloseCategoriesList = () => setShowListCategories(false);
  const handleShowListCategories = () => setShowListCategories(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/transactions");
      const t = await response.json();
      setTransactions(t);
      setTransView(t);
    };

    fetchData().catch(console.error);
  }, []);

  const resetTransactions = () => {
    setTransView(transactions);
  };

  const filterTransactions = () => {
    let elem = document.getElementById("regexp");
    if (validateRegExp(elem.value)) {
      let r = new RegExp(elem.value);
      setTransView(
        transactions.filter((t) => {
          return r.test(t.description);
        })
      );
    }
  };

  const validateRegExp = (r) => {
    let isValid = true;
    try {
      new RegExp(r);
    } catch (e) {
      isValid = false;
    }
    if (!isValid) alert("Invalid regular expression");
    return isValid;
  };

  return (
    <div>
      <CategoryCreateComponent
        showCategoryCreate={showCategoryCreate}
        handleCloseCategoryCreate={handleCloseCategoryCreate}
      />
      <CategoryListComponent
        showCategoryList={showCategoriesList}
        handleCloseCategoryList={handleCloseCategoriesList}
      />
      <Container>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <Form>
                <Form.Control type="text" id="regexp"></Form.Control>
              </Form>
              <Button variant="primary" onClick={filterTransactions}>
                Test
              </Button>
              <Button variant="primary" onClick={resetTransactions}>
                Reset
              </Button>
              <Button variant="primary" onClick={handleShowCategoryCreate}>
                Create Category
              </Button>
              <Button variant="primary" onClick={handleShowListCategories}>
                List Categories
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
      <Container>
        <TransactionsTable transactions={transView} />
      </Container>
    </div>
  );
}
