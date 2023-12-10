import React, { useState } from "react";
import { Form, Button, Offcanvas, Modal } from "react-bootstrap";
import TagBadgeElement from "../elements/TagBadgeElement";

export default function SubCat_Create_Component({
  idCategory,
  showSubCatCreate,
  handleCloseSubCatCreate,
  refreshSubCatList,
}) {
  const [subCatName, setSubCatName] = useState("");
  const [subCatPrimaryColour, setSubCatPrimaryColour] = useState("#000000");
  const [subCatSecondaryColour, setSubCatSecondaryColour] = useState("#000000");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitCreateSubCat = async () => {
    const response = await fetch(
      `/api/categories/${idCategory}/subcategories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subCatName,
          colourPrimary: subCatPrimaryColour,
          colourSecondary: subCatSecondaryColour,
        }),
      }
    );
    if (response.ok) {
      handleCloseSubCatCreate();
      setShowSuccessModal(true);
    }
  };

  return (
    <>
      <Offcanvas show={showSubCatCreate} onHide={handleCloseSubCatCreate}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create Subcategory</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formSubCatName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="subcatName"
                placeholder="Subcategory Name"
                onBlur={(e) => {
                  setSubCatName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubCatColours">
              <Form.Label>Primary Colour</Form.Label>
              <Form.Control
                type="color"
                id="subCatColourPrimary"
                onChange={(e) => {
                  setSubCatPrimaryColour(e.target.value);
                }}
              />
              <Form.Label>Secondary Colour</Form.Label>
              <Form.Control
                type="color"
                id="subCatColourSecondary"
                onChange={(e) => {
                  setSubCatSecondaryColour(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={submitCreateSubCat}>
            Create
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <CreateSuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
        subCatName={subCatName}
        subCatPrimaryColour={subCatPrimaryColour}
        subCatSecondaryColour={subCatSecondaryColour}
        refreshSubCatList={refreshSubCatList}
      />
    </>
  );

  function CreateSuccessModal({
    show,
    setShow,
    subCatName,
    subCatPrimaryColour,
    subCatSecondaryColour,
    refreshSubCatList,
  }) {
    const handleClose = () => {
      setShow(false);
      refreshSubCatList();
    };
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subcategory Creation Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TagBadgeElement
            name={subCatName}
            colourPrimary={subCatPrimaryColour}
            colourSecondary={subCatSecondaryColour}
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
