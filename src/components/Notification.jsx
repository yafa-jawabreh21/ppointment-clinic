import { Bell, Eye } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Notification() {
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
    <div ref={ref} className="relative bg-white rounded-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center text-gray-500
         transition-colors bg-white border border-gray-200 rounded-full 
         hover:text-dark-900 h-10 w-10 hover:bg-gray-100 hover:text-gray-700 relative p-1  text-sm font-medium
         focus:outline-none cursor-pointer"
        type="button"
      >
        <Bell
          className="stroke-[1.5px] transition-transform duration-300 text-blue-900"
          size={20}
        />

        {/* <div className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0"></div> */}
      </button>

      {open && (
        <div className="absolute right-0 top-15 w-md bg-white border-gray-500 rounded-2xl shadow-lg z-10 ">
          <div className="px-4 py-4 font-semibold ">Notifications</div>
          <hr className="text-gray-200" />

          <div className="max-h-60 overflow-y-auto mx-2 mb-4 ">
            <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-lg">
              <img
                className="w-10 h-10 rounded-full"
                src="https://i.pravatar.cc/40?img=1"
                alt=""
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Ali</span> sent you a message
                </p>
                <p className="text-xs text-gray-500">2 min ago</p>
              </div>
            </div>

            <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-lg">
              <img
                className="w-10 h-10 rounded-full"
                src="https://i.pravatar.cc/40?img=2"
                alt=""
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">Sara</span> followed you
                </p>
                <p className="text-xs text-gray-500">10 min ago</p>
              </div>
            </div>
          </div>

          <div className="text-center flex justify-center gap-1 py-2 border-t-gray-200  text-sm cursor-pointer">
            <button
              className="mt-3 block rounded-lg border border-gray-300 bg-white text-blue-900 px-4 py-2 text-center text-sm font-medium hover:bg-gray-100"
              href="/"
              data-discover="true"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
