import React from "react";
import SelectComp from "./SelectComp";

export default function Filteration({ filterlist, filterationfun }) {
  return (
    <div>
      <div className="flex">
        <h3 className="py-2 pr-6">Filter by </h3>
        <SelectComp filterlist={filterlist} filterationfun={filterationfun} />
      </div>
    </div>
  );
}
