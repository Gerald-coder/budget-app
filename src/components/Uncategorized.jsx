import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../Context/BudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../Context/BudgetContext";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();

  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => {
      return total + JSON.parse(expense.amount);
    },
    0
  );
  if (amount === 0) return null;
  return <BudgetCard name="uncategorized" amount={amount} {...props} />;
};

export default UncategorizedBudgetCard;
