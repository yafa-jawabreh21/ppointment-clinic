import React from "react";

export default function SelectComp({ filterlist, filterationfun }) {
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <label htmlFor="underline_select" className="sr-only">
          Select
        </label>

        <select
          id="underline_select"
          onChange={(e) => filterationfun(e.target.value)}
          className="block py-2.5 ps-0 px-32 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500"
        >
          {filterlist.map((el) => (
            <option key={el === "Select" ? "" : el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
