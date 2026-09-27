import React from "react";
import SearchComp from "./SearchComp";

export default function Header({ title }) {
  return (
    <div>
      <div className=" mb-10 bg-blue-900 p-4  border-b-gray-200 border-b-2  ">
        {/* <h1 className="text-white text-2xl font-bold">{title}</h1> */}
        <SearchComp />
      </div>
      {/* <hr /> */}
    </div>
  );
}
