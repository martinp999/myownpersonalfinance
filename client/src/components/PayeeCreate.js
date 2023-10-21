import React, { useState } from "react";
import { Form, Button, Offcanvas, Modal } from "react-bootstrap";

export default function PayeeCreateComponent({
  idCategory,
  showPayeeCreate,
  handleClosePayeeCreate,
  refreshPayeeList,
}) {
  const [payeeName, setPayeeName] = useState("");
  const [payeeDescription, setPayeeDescription] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitCreatePayee = async () => {
    const response = await fetch(`/api/categories/${idCategory}/payees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payeeName: payeeName,
        payeeDescription: payeeDescription,
      }),
    });
    if (response.ok) {
      handleClosePayeeCreate();
      setShowSuccessModal(true);
    }
  };

  return (
    <>
      <Offcanvas show={showPayeeCreate} onHide={handleClosePayeeCreate}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Create Payee</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formPayeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="payeeName"
                placeholder="Payee Name"
                onBlur={(e) => {
                  setPayeeName(e.target.value);
                }}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                id="payeeDescription"
                onChange={(e) => {
                  setPayeeDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={submitCreatePayee}>
            Create
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      <CreateSuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
        payeeName={payeeName}
        payeeDescription={payeeDescription}
        refreshPayeeList={refreshPayeeList}
      />
    </>
  );

  function CreateSuccessModal({
    show,
    setShow,
    payeeName,
    payeeDescription,
    refreshPayeeList,
  }) {
    const handleClose = () => {
      setShow(false);
      refreshPayeeList();
    };
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payee Creation Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{payeeName}</span>
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
