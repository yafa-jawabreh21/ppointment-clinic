import { Outlet, Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  ClipboardClock,
  LayoutDashboard,
  Users,
  Wallet,
} from "lucide-react";
import logo from "../assets/mend-container.svg";
import { useState } from "react";

export default function DashboardLayout() {
  const [close, setClose] = useState(false);

  const itemClass = `
    flex items-center gap-3 p-2 rounded cursor-pointer
    hover:bg-gray-100 hover:text-blue-900
    transition-colors duration-200
  `;

  return (
    <div className="relative flex h-screen overflow-hidden bg-blue-900">
      <aside
        className={`
          h-screen shrink-0
          bg-blue-900 text-white
          py-[2%] px-[2%]
          transition-all duration-300
          ${close ? "w-[10%]" : "w-[20%]"}
          border-r-2
          border-r-gray-100 
        `}
      >
        <div className="flex justify-center">
          <img src={logo} width={50} height={50} alt="Clinic Logo" />
        </div>

        <hr className="my-7 text-gray-200" />

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard">
            <div
              className={`
                ${itemClass}
                ${close ? "justify-center" : ""}
                my-3
              `}
            >
              <LayoutDashboard size={20} />

              {!close && <span>Dashboard</span>}
            </div>
          </Link>

          <Link to="patients">
            <div
              className={`
                ${itemClass}
                ${close ? "justify-center" : ""}
                my-3
              `}
            >
              <Users size={20} />

              {!close && <span>Patients</span>}
            </div>
          </Link>

          <Link to="appointements">
            <div
              className={`
                ${itemClass}
                ${close ? "justify-center" : ""}
                my-3
              `}
            >
              <ClipboardClock size={20} />

              {!close && <span>Appointments</span>}
            </div>
          </Link>

          <Link to="billing">
            <div
              className={`
                ${itemClass}
                ${close ? "justify-center" : ""}
                my-3
              `}
            >
              <Wallet size={20} />

              {!close && <span>Billing</span>}
            </div>
          </Link>

          {/* <Link to="calendar">
            <div
              className={`
                ${itemClass}
                ${close ? "justify-center" : ""}
                my-3
              `}
            >
              <CalendarDays size={20} />

              {!close && <span>Calendar</span>}
            </div>
          </Link> */}
        </nav>
      </aside>

      <main
        className="
          flex-1
          min-w-0
          h-screen
          overflow-y-auto
          bg-gray-50
          border-r
          border-r-gray-200     
          transition-all
          duration-300
        "
      >
        <Outlet />
      </main>

      {/* ================= SIDEBAR TOGGLE ================= */}
      <button
        type="button"
        onClick={() => setClose(!close)}
        className={`
          absolute
          top-[12%]
          z-50
          cursor-pointer
          transition-all
          duration-300
          ${close ? "left-[10%]" : "left-[20%]"}
        `}
      >
        <ChevronLeft
          className={`
            rounded-2xl
            bg-white
            text-blue-900
            transition-transform
            duration-300
            ${close ? "rotate-180" : ""}
          `}
          size={20}
        />
      </button>
    </div>
  );
}
