import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../Context/BudgetContext";

function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets();

  // // getting the total budget
  const max = budgets.reduce((total, budget) => {
    return total + budget.max;
  }, 0);
  // // getting the total expenses
  const amount = expenses.reduce((total, expense) => {
    return total + JSON.parse(expense.amount);
  }, 0);
  return <BudgetCard name="total" max={max} amount={amount} hideButtons />;
}

export default TotalBudgetCard;
