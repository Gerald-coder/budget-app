import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContexts = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export function useBudgets() {
  return useContext(BudgetContexts);
}

export const BudgetsProvider = ({ children }) => {
  // const [budgets, setBudgets] = useState([]);
  // const [expenses, setExpenses] = useState([]);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [budgets, setBudgets] = useLocalStorage("budgets", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpenses({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudgets({ max, name }) {
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => budget.name === name)) {
        return prevBudget;
      }
      return [...prevBudget, { id: uuidV4(), max, name }];
    });
  }
  function deleteBudget({ id }) {
    // TODO: deal with expenses
    setExpenses((preExpesne) => {
      return preExpesne.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudget) => {
      return prevBudget.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpenses({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }
  return (
    <BudgetContexts.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudgets,
        deleteBudget,
        deleteExpenses,
      }}
    >
      {children}
    </BudgetContexts.Provider>
  );
};
