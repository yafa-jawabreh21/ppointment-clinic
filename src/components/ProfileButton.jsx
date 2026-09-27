import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Settings,
  UserPen,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-2.5 relative">
      {/* Button */}
      <button
        className="flex items-center justify-center text-gray-500
         transition-colors bg-white  rounded-full 
         hover:text-dark-900 h-10 w-10 hover:bg-gray-100 hover:text-gray-700 relative text-sm font-medium
         focus:outline-none"
      >
        <img
          className="w-full h-full rounded-full"
          src="https://i.pravatar.cc/40"
          alt="user"
        />
      </button>
      <h4 className="text-white cursor-pointer" onClick={() => setOpen(!open)}>
        Joseph McFall
      </h4>
      {open ? (
        <ChevronUp
          onClick={() => setOpen(false)}
          className="text-white cursor-pointer"
        />
      ) : (
        <ChevronDown
          onClick={() => setOpen(true)}
          className="text-white cursor-pointer"
        />
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-15 w-72 bg-white border-gray-500 rounded-2xl shadow-lg z-10">
          {/* User Info */}
          <div className="p-3">
            <div className="flex items-center gap-2">
              <div>
                <p className="font-medium text-sm">Joseph McFall</p>
                <p className="text-xs text-gray-500">name@flowbite.com</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <ul className="text-sm mx-4 pt-4 mb-4">
            <li className="p-3 hover:bg-gray-100 cursor-pointer flex gap-4 rounded-sm ">
              <UserPen size={20} /> Edit Profile
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer flex gap-4 rounded-sm">
              <Settings size={20} /> Settings
            </li>
          </ul>
          <hr className="text-gray-200" />
          <ul className="mx-4 pt-4 mb-1">
            <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 rounded-sm">
              <Link to="/signin" className="flex gap-4">
                <LogOut size={20} className=" rotate-180" /> Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
