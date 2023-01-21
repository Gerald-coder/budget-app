import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../Context/BudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../Context/BudgetContext";

function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  const { budgets, addExpenses } = useBudgets();

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpenses({
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Expenses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" required ref={descriptionRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                required
                min={0}
                step={1}
                ref={amountRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="budgetId">
              <Form.Label>Budget</Form.Label>
              <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                <option id={UNCATEGORIZED_BUDGET_ID}>uncategorized</option>
                {budgets.map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleSubmit}>
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
