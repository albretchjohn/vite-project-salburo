import { useState } from "react";

function ScientificCalculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setInput("");
  };

  const calculate = () => {
    try {
      let expression = input
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/pi/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/\^/g, "**");

      // Convert degrees to radians for trig functions
      expression = expression.replace(/Math\.(sin|cos|tan)\(([^()]+)\)/g, (_, fn, val) => {
        return `Math.${fn}((${val}) * Math.PI / 180)`;
      });

      const result = Function(`return (${expression})`)();
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-2xl max-w-md mx-auto">
      <div className="text-right text-2xl bg-gray-800 p-4 mb-4 rounded">{input}</div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+"
        ].map((btn) => (
          <button
            key={btn}
            className="bg-blue-700 p-2 rounded hover:bg-blue-500"
            onClick={() => btn === "=" ? calculate() : handleClick(btn)}
          >
            {btn}
          </button>
        ))}
        {["(", ")", "pi", "e", "sin", "cos", "tan", "log", "ln", "sqrt", "^", "%", "⌫", "C"].map((btn) => (
          <button
            key={btn}
            className="bg-purple-700 p-2 rounded hover:bg-purple-500"
            onClick={() => {
              if (btn === "C") return clear();
              if (btn === "⌫") return backspace();
              handleClick(btn);
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScientificCalculator;
