import { Search } from "lucide-react";
import React from "react";
import Notification from "./Notification";
import ProfileButton from "./ProfileButton";

export default function SearchComp() {
  return (
    <div className="flex items-center justify-between">
      <div className="relative">
        <input
          placeholder="Search..."
          class="h-11 w-full text-white rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14
           text-sm  shadow-theme-xs
            placeholder:text-gray-400
            "
          type="text"
          fdprocessedid="6dwg5h"
        />

        <Search className="absolute left-3 top-3.5 text-white" size={18} />
      </div>
      <div className="flex  gap-3.5">
        <Notification />
        <ProfileButton />
      </div>
    </div>
  );
}
