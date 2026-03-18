import { Button } from "@/components/ui/button";

const CalcButton = ({ label, onClick, variant = "default" }) => {
  let btnVariant = "secondary";
  if (variant === "operator") btnVariant = "default";
  if (variant === "action") btnVariant = "destructive";
  let sizeClass = "h-14 text-xl font-medium";
  if (variant === "zero") sizeClass = "h-14 text-xl font-medium col-span-2";

  return (
    <Button
      variant={btnVariant}
      className={`rounded-2xl bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] ${sizeClass}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

const Keyboard = ({ onNumber, onOperator, onAction }) => {
  return (
    <div className="calculator-keyboard grid grid-cols-4 gap-3 p-2">
      {/* Coluna 1 */}
      <CalcButton label="C" onClick={() => onAction("C")} variant="action" />
      <CalcButton
        label="+/-"
        onClick={() => onAction("+/-")}
        variant="action"
      />
      <CalcButton label="%" onClick={() => onAction("%")} variant="action" />
      <CalcButton
        label="÷"
        onClick={() => onOperator("/")}
        variant="operator"
      />

      {/* Coluna 2 */}
      <CalcButton label="7" onClick={() => onNumber("7")} />
      <CalcButton label="8" onClick={() => onNumber("8")} />
      <CalcButton label="9" onClick={() => onNumber("9")} />
      <CalcButton
        label="×"
        onClick={() => onOperator("*")}
        variant="operator"
      />

      {/* Coluna 3 */}
      <CalcButton label="4" onClick={() => onNumber("4")} />
      <CalcButton label="5" onClick={() => onNumber("5")} />
      <CalcButton label="6" onClick={() => onNumber("6")} />
      <CalcButton
        label="-"
        onClick={() => onOperator("-")}
        variant="operator"
      />

      {/* Coluna 4 */}
      <CalcButton label="1" onClick={() => onNumber("1")} />
      <CalcButton label="2" onClick={() => onNumber("2")} />
      <CalcButton label="3" onClick={() => onNumber("3")} />
      <CalcButton
        label="+"
        onClick={() => onOperator("+")}
        variant="operator"
      />

      {/* Coluna 5 */}
      <CalcButton label="0" onClick={() => onNumber("0")} variant="zero" />
      <CalcButton label="." onClick={() => onAction(".")} />
      <CalcButton label="=" onClick={() => onAction("=")} variant="operator" />
    </div>
  );
};

export default Keyboard;
