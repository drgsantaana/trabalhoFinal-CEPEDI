import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCalculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const navigate = useNavigate();

  const handleNumber = (number) => {
    if (waitingForNewValue) {
      setCurrentValue(String(number));
      setWaitingForNewValue(false);
    } else {
      setCurrentValue(
        currentValue === "0" ? String(number) : currentValue + number,
      );
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentValue);

    if (operator && waitingForNewValue) {
      setOperator(nextOperator);
      return;
    }

    if (previousValue == null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      setCurrentValue(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const calculate = (prev, current, op) => {
    if (op === "/" && current === 0) {
      // Condicional pra mandar pro login
      navigate("/login");
      return "Error";
    }

    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEqual = () => {
    if (!operator || previousValue == null) return;

    const inputValue = parseFloat(currentValue);
    const result = calculate(previousValue, inputValue, operator);

    setCurrentValue(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setCurrentValue("0.");
      setWaitingForNewValue(false);
      return;
    }

    if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case "C":
        handleClear();
        break;
      case "=":
        handleEqual();
        break;
      case ".":
        handleDecimal();
        break;
      case "+/-":
        setCurrentValue(String(parseFloat(currentValue) * -1));
        break;
      case "%":
        setCurrentValue(String(parseFloat(currentValue) / 100));
        break;
      default:
        break;
    }
  };

  return {
    currentValue,
    previousValue,
    operator,
    handleNumber,
    handleOperator,
    handleAction,
  };
};
