import { useState } from "react";
import { Container, Stack, Button, Card } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Context/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/Uncategorized";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showExpensesModal, setShowExpensesModal] = useState(false);
  const [showAddExpenseModalBudgetId, setShowAddExpenseModalBudgetId] =
    useState();
  // const [showViewExpenseBudgetModal, setShowViewExpenseBudgetModal] =
  useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  // // getting our budgets array from context
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowExpensesModal(true);
    setShowAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" className="mb-3" gap="2">
          <h2 className="me-auto">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
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
              (total, expense) => total + JSON.parse(expense.amount),
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                amount={amount}
                name={budget.name}
                max={budget.max}
                addExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            addExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        defaultBudgetId={showAddExpenseModalBudgetId}
        show={showExpensesModal}
        handleClose={() => setShowExpensesModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default App;
