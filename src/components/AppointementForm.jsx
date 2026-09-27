import React, { useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import DateTimePicker from "./DateTimePicker";

export default function AppointementForm({
  onClose,
  addNewAppointment,
  editAppointment,
  editfun,
}) {
  const [newAppointment, setNewAppointment] = useState(
    editAppointment || {
      id: "",
      name: "",
      date: "",
      time: "",
      appointstatus: "Pending",
    }
  );

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE DATE + TIME
  // =========================
  const handleDateTimeSave = ({ date, time }) => {
    setNewAppointment((prev) => ({
      ...prev,
      date,
      time,
    }));

    setShowDateTimePicker(false);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // =========================
    // EDIT EXISTING APPOINTMENT
    // =========================
    if (editAppointment) {
      const updatedAppointment = {
        ...newAppointment,
        id: editAppointment.id,
      };

      console.log("Updated Appointment:", updatedAppointment);

      if (editfun) {
        editfun(updatedAppointment);
      }

      onClose();
      return;
    }

    // =========================
    // ADD NEW APPOINTMENT
    // =========================
    const appointment = {
      ...newAppointment,
      id: Date.now().toString(),
    };

    console.log("New Appointment:", appointment);

    if (addNewAppointment) {
      addNewAppointment(appointment);
    }

    onClose();
  };

  return (
    <>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* ================= PATIENT NAME ================= */}
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Patient Name <span className="text-red-500">*</span>
            </label>

            <input
              required
              name="name"
              value={newAppointment.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter patient name"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* ================= DATE ================= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Date <span className="text-red-500">*</span>
            </label>

            <button
              type="button"
              onClick={() => setShowDateTimePicker(true)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-2.5 text-left text-sm outline-none transition hover:border-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <span
                className={
                  newAppointment.date ? "text-gray-900" : "text-gray-400"
                }
              >
                {newAppointment.date || "Select date"}
              </span>

              <CalendarDays size={18} className="text-gray-500" />
            </button>
          </div>

          {/* ================= TIME ================= */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Time <span className="text-red-500">*</span>
            </label>

            <button
              type="button"
              onClick={() => setShowDateTimePicker(true)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-2.5 text-left text-sm outline-none transition hover:border-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <span
                className={
                  newAppointment.time ? "text-gray-900" : "text-gray-400"
                }
              >
                {newAppointment.time || "Select time"}
              </span>

              <Clock size={18} className="text-gray-500" />
            </button>
          </div>

          {/* ================= STATUS ================= */}
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Status <span className="text-red-500">*</span>
            </label>

            <select
              required
              name="appointstatus"
              value={newAppointment.appointstatus}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-6 flex items-center gap-3 border-t pt-5">
          <button
            type="submit"
            disabled={!newAppointment.date || !newAppointment.time}
            className="rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {editAppointment ? "Save Changes" : "Add"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* ================= DATE + TIME MODAL ================= */}

      <DateTimePicker
        isOpen={showDateTimePicker}
        onClose={() => setShowDateTimePicker(false)}
        selectedDate={newAppointment.date}
        selectedTime={newAppointment.time}
        onSave={handleDateTimeSave}
      />
    </>
  );
}
