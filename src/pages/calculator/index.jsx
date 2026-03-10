import { useCalculator } from "../../hooks/useCalculator";
import Display from "../../components/Calculator/Display";
import Keyboard from "../../components/Calculator/Keyboard";
import { Card, CardContent } from "@/components/ui/card";

const Calculator = () => {
  const {
    currentValue,
    previousValue,
    operator,
    handleNumber,
    handleOperator,
    handleAction,
  } = useCalculator();

  return (
    <div className="flex items-center justify-center min-vh-100 w-full p-4">
      <Card className="w-full max-w-sm bg-slate-900 border-slate-800 shadow-2xl overflow-hidden rounded-[2rem]">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Display
            currentValue={currentValue}
            previousValue={previousValue}
            operator={operator}
          />
          <Keyboard
            onNumber={handleNumber}
            onOperator={handleOperator}
            onAction={handleAction}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
