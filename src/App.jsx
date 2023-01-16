import { useState } from "react";
import { Container, Stack, Button, Card } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./Context/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showExpensesModal, setShowExpensesModal] = useState(false);
  // // getting our budgets array from context
  const { budgets, getBudgetExpenses } = useBudgets();
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" className="mb-3" gap="2">
          <h2 className="me-auto">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setShowExpensesModal(true)}
          >
            Add Expenses
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => {
                return total + expense.amount;
              },
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                amount={amount}
                name={budget.name}
                max={budget.max}
              />
            );
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showExpensesModal}
        handleClose={() => setShowExpensesModal(false)}
      />
    </>
  );
}

export default App;
