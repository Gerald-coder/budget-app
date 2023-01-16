import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function AddExpenseModal({ show, handleClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Expenses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="min">
              <Form.Label>Minimum Expenses</Form.Label>
              <Form.Control type="number" required min={0} step={1} />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleClose}>
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default AddExpenseModal;
