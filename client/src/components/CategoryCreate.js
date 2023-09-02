import React, { useState } from "react";
import { Form, Button, Offcanvas, Modal } from "react-bootstrap";
import TagBadgeElement from "../elements/TagBadgeElement";

export default function CategoryCreateComponent({
  showCategoryCreate,
  handleCloseCategoryCreate,
}) {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryPrimaryColour, setCategoryPrimaryColour] = useState("#000000");
  const [categorySecondaryColour, setCategorySecondaryColour] = useState(
    "#000000"
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitCreateCategory = async () => {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: categoryName,
        colourPrimary: categoryPrimaryColour,
        colourSecondary: categorySecondaryColour,
      }),
    });
    if (response.ok) {
      setShowSuccessModal(true);
    }
  };

  return (
    <>
      <Offcanvas show={showCategoryCreate} onHide={handleCloseCategoryCreate}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCategoryName">
              <Form.Control
                type="text"
                id="catName"
                placeholder="Category Name"
                onBlur={(e) => {
                  setCategoryName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryColours">
              <Form.Label>Primary Colour</Form.Label>
              <Form.Control
                type="color"
                id="catColourPrimary"
                onChange={(e) => {
                  setCategoryPrimaryColour(e.target.value);
                }}
              />
              <Form.Label>Secondary Colour</Form.Label>
              <Form.Control
                type="color"
                id="catColourSecondary"
                onChange={(e) => {
                  setCategorySecondaryColour(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={submitCreateCategory}>
            Create
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <CreateSuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
        categoryName={categoryName}
        categoryPrimaryColour={categoryPrimaryColour}
        categorySecondaryColour={categorySecondaryColour}
      />
    </>
  );

  function CreateSuccessModal({
    show,
    setShow,
    categoryName,
    categoryPrimaryColour,
    categorySecondaryColour,
  }) {
    const handleClose = () => setShow(false);
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category Creation Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TagBadgeElement
            name={categoryName}
            colourPrimary={categoryPrimaryColour}
            colourSecondary={categorySecondaryColour}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
