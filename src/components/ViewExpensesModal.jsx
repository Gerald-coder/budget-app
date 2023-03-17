import React from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../Context/BudgetContext";

function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpenses } =
    useBudgets();

  const budget = 
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  // // getting out expenses according to the Id
  const expenses = getBudgetExpenses(budgetId);

  const handleDeleteBudget = (budget) => {
    console.log(`delete budget is ${JSON.stringify(budget)}`);
    deleteBudget(budget);
    handleClose();
  };

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={4}>
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteBudget(budget)}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => {
            return (
              <Stack direction="horizontal" gap={2}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-6">{expense.amount}</div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteExpenses(expense)}
                >
                  &times;
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default ViewExpensesModal;
