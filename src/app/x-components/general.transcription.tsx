import React, { useEffect } from "react";

declare global {
  interface Window {
    MathJax: {
      typesetPromise: () => Promise<void>;
    };
  }
}

interface TranscriptionInputProps {
  value: {
    userInput: string;
    latex: string;
  };
  onChange: (value: { userInput: string; latex: string }) => void;
}

const TranscriptionInput = ({ value, onChange }: TranscriptionInputProps) => {
  // Function to convert basic math notation to LaTeX
  const convertToLatex = (input: string) => {
    return input
      .replace(/\*/g, "\\times ")
      .replace(/\//g, "\\div ")
      .replace(/sqrt\((.*?)\)/g, "\\sqrt{$1}")
      .replace(/\^(.*?)( |$)/g, "^{$1}")
      .replace(/pi/g, "\\pi ")
      .replace(/sin\(/g, "\\sin(")
      .replace(/cos\(/g, "\\cos(")
      .replace(/tan\(/g, "\\tan(");
  };

  // Update MathJax rendering whenever value changes
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    const latex = convertToLatex(newInput);
    onChange({ userInput: newInput, latex });
  };

  return (
    <div className="w-full max-w-2xl border rounded-lg p-6">
      <div className="space-y-4">
        <input
          type="text"
          value={value.userInput}
          onChange={handleInputChange}
          placeholder="Enter math expression (e.g., 2*x^2 + sqrt(4))"
          className="w-full px-3 py-2 border rounded-md"
        />

        <div className="p-4 bg-slate-50 rounded-md min-h-12">
          <div className="text-lg">{"\\(" + value.latex + "\\)"}</div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionInput;
