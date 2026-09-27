import React, { useState } from "react";
import { Pen, Trash } from "lucide-react";
import AppointementForm from "./AppointementForm";
import Modal from "./Modal";

export default function AppointmentPreview({
  appointment,
  onAppointmentUpdate,
  deleteAppointment,
}) {
  const [open, setOpen] = useState(false);

  // =========================
  // FORMAT DATE
  // =========================
  const formatAppointmentDate = (dateString) => {
    if (!dateString) return "No date";

    const parts = dateString.split("-");

    if (parts.length !== 3) {
      return "Invalid Date";
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================
  // CARD BACKGROUND
  // =========================
  const getCardStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-50/40 border-green-100";

      case "Canceled":
        return "bg-red-50/40 border-red-100";

      case "Pending":
        return "bg-orange-50/40 border-orange-100";

      default:
        return "bg-gray-50/40 border-gray-100";
    }
  };

  // =========================
  // STATUS STYLE
  // =========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-50 text-green-600 border-green-100";

      case "Canceled":
        return "bg-red-50 text-red-600 border-red-100";

      case "Pending":
        return "bg-orange-50 text-orange-600 border-orange-100";

      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  // =========================
  // STATUS DOT
  // =========================
  const getStatusDot = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-300";

      case "Canceled":
        return "bg-red-300";

      case "Pending":
        return "bg-orange-300";

      default:
        return "bg-gray-300";
    }
  };

  // =========================
  // HANDLE EDIT
  // =========================
  const handleEdit = (updatedAppointment) => {
    if (onAppointmentUpdate) {
      onAppointmentUpdate(updatedAppointment);
    }

    setOpen(false);
  };

  return (
    <div
      className={`
        rounded-xl
        p-4
        border
        transition-all
        duration-200
        ${getCardStyle(appointment.appointstatus)}
      `}
    >
      {/* =========================
          TOP SECTION
      ========================= */}
      <div className="flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div>
            {/* TIME */}
            <h3 className="flex items-center gap-2 font-semibold text-gray-700">
              <span
                className={`
                  h-2.5
                  w-2.5
                  shrink-0
                  rounded-full
                  ${getStatusDot(appointment.appointstatus)}
                `}
              />

              <span>{appointment.time || "No time"}</span>
            </h3>

            {/* PATIENT NAME */}
            <div className="mt-1">
              <h3 className="font-medium text-gray-700">
                {appointment.name || "No name"}
              </h3>
            </div>
          </div>
        </div>

        {/* =========================
            EDIT + STATUS
        ========================= */}
        <div className="flex items-center gap-2">
          {/* EDIT BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              text-gray-500
              shadow-sm
              transition
              hover:bg-gray-50
              hover:text-blue-600
            "
            title="Edit appointment"
          >
            <Pen size={15} />
          </button>

          <button
            type="button"
            onClick={() => deleteAppointment(appointment)}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              text-gray-500
              shadow-sm
              transition
              hover:bg-gray-50
              hover:text-blue-600
            "
            title="Edit appointment"
          >
            <Trash size={15} />
          </button>

          {/* STATUS */}
          <span
            className={`
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-medium
              whitespace-nowrap
              ${getStatusStyle(appointment.appointstatus)}
            `}
          >
            {appointment.appointstatus || "Pending"}
          </span>
        </div>
      </div>

      {/* =========================
          DATE
      ========================= */}
      <div className="mt-3 border-t border-gray-200/50 pt-3">
        <p className="text-xs text-gray-400">
          {formatAppointmentDate(appointment.date)}
        </p>
      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}
      <Modal
        onClose={() => setOpen(false)}
        isOpen={open}
        title="Edit Appointment"
      >
        <AppointementForm
          onClose={() => setOpen(false)}
          editAppointment={appointment}
          editfun={handleEdit}
        />
      </Modal>
    </div>
  );
}
