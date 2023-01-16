import React from "react";
import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "./Utils";
import { useBudgets } from "../Context/BudgetContext";

const BudgetCard = ({ name, amount, max }) => {
  const show = () => {
    return amount > max;
  };
  // // conditionally seting the cards bg-color
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else {
    classNames.push("bg-light");
  }
  return (
    <Card className={`${classNames.join(" ")}`}>
      <span
        style={{
          textAlign: "end",
          marginRight: "6px",
          border: ".5px transparent red",
          marginTop: "2px",
          visibility: `${show() ? "visible" : "hidden"}`,
        }}
      >
        Out Of Budget
      </span>{" "}
      <Card.Body>
        <Card.Title className="d-flex justify-content-between fw-normal mb-3 align-items-baseline ">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}{" "}
            <span className="text-muted fs-6 ms-1">
              /{currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>
        <ProgressBar
          min={0}
          max={max}
          now={amount}
          className="rounded-pill"
          variant={getProgressBar(amount, max)}
        />
        <Stack className="mt-2" direction="horizontal" gap="2">
          <Button className="ms-auto" variant="outline-primary">
            Add Expenses
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
const getProgressBar = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) {
    return "primary";
  } else if (ratio < 0.75) {
    return "warning";
  } else {
    return "danger";
  }
};
export default BudgetCard;
