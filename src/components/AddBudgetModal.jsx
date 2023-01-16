import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../Context/BudgetContext";

function AddBudgetModal({ show, handleClose }) {
  // // getting out addBudget handler from our custom hook
  const { addBudgets } = useBudgets();

  // // targeting dom elements with useRef
  const nameRef = useRef();
  const maxRef = useRef();

  // // handleSubmit form
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudgets({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budgets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required ref={nameRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={1.0}
              ref={maxRef}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default AddBudgetModal;
