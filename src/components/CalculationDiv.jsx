import React from "react";

export default function CalculationDiv({ title, result, subtitle }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-[23%]">
      {title && <h2 className="text-gray-500 text-sm">{title}</h2>}
      <p className="font-bold text-xl">{result}</p>
      <h2 className="text-gray-500 text-sm">{subtitle}</h2>
    </div>
  );
}
