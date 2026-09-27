import React, { useState } from "react";
import { X, CalendarDays, Clock } from "lucide-react";

export default function DateTimePicker({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  onSave,
}) {
  const [date, setDate] = useState(selectedDate || "");
  const [time, setTime] = useState(selectedTime || "");

  if (!isOpen) return null;

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
  ];

  const handleSave = () => {
    if (!date || !time) return;

    onSave({
      date,
      time,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Modal */}
      <div className="relative w-full max-w-[23rem] rounded-xl bg-white shadow-2xl">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              Schedule an appointment
            </h3>

            <p className="mt-1 text-xs text-gray-500">Select date and time</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-5">
          {/* DATE */}
          <div className="mb-5">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900">
              <CalendarDays size={16} />
              Select date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* TIME */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-900">
              <Clock size={16} />
              Pick your time
            </label>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`rounded-lg border px-2 py-2 text-sm font-medium transition
                    ${
                      time === slot
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!date || !time}
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
