import React, { useMemo, useState } from "react";
import { Plus, X, CalendarDays } from "lucide-react";

import Header from "../components/Header";
import Modal from "../components/Modal";
import AppointementForm from "../components/AppointementForm";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AppointementCalendar from "../components/AppointementCalendar";
import AppointmentPreview from "../components/AppointmentPreview";
import SearchFilters from "../components/SearchFilters";

export default function Appointments() {
  useDocumentTitle("Appointments");

  // =========================
  // APPOINTMENTS
  // =========================
  const [data, setData] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");

    try {
      return savedAppointments ? JSON.parse(savedAppointments) : [];
    } catch (error) {
      console.error("Error reading appointments:", error);
      return [];
    }
  });

  // =========================
  // MODAL
  // =========================
  const [open, setOpen] = useState(false);

  // =========================
  // SELECTED DATE
  // =========================
  const [selectedDate, setSelectedDate] = useState(null);

  // =========================
  // SEARCH
  // =========================
  const [searchValue, setSearchValue] = useState("");

  // =========================
  // FORMAT DATE
  // =========================
  const formatDateToString = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================
  const saveAppointments = (appointments) => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  };

  // =========================
  // ADD APPOINTMENT
  // =========================
  const addNewAppointment = (appointment) => {
    setData((prev) => {
      const updatedAppointments = [...prev, appointment];

      saveAppointments(updatedAppointments);

      return updatedAppointments;
    });

    setOpen(false);
  };

  // =========================
  // EDIT APPOINTMENT
  // =========================
  const handleAppointmentUpdate = (updatedAppointment) => {
    setData((prev) => {
      const updatedAppointments = prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      );

      saveAppointments(updatedAppointments);

      return updatedAppointments;
    });
  };

  // =========================
  // DELETE APPOINTMENT
  // =========================
  const deleteAppointment = (deletedAppointment) => {
    setData((prev) => {
      const updatedAppointments = prev.filter(
        (appointment) => appointment.id !== deletedAppointment.id
      );

      saveAppointments(updatedAppointments);

      return updatedAppointments;
    });
  };

  // =========================
  // SELECT DATE
  // =========================
  const handleDateSelect = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return;
    }

    setSelectedDate(date);

    // Clear previous search when changing date
    setSearchValue("");
  };

  // =========================
  // CLEAR DATE
  // =========================
  const clearSelectedDate = () => {
    setSelectedDate(null);
    setSearchValue("");
  };

  // =========================
  // DISPLAY SELECTED DATE
  // =========================
  const displaySelectedDate = () => {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate.getTime())) {
      return "";
    }

    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================
  // APPOINTMENTS FOR SELECTED DATE
  // =========================
  const appointmentsForSelectedDate = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const selectedDateString = formatDateToString(selectedDate);

    return data.filter(
      (appointment) => appointment.date === selectedDateString
    );
  }, [data, selectedDate]);

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredAppointments = useMemo(() => {
    if (!searchValue.trim()) {
      return appointmentsForSelectedDate;
    }

    const value = searchValue.toLowerCase().trim();

    return appointmentsForSelectedDate.filter(
      (appointment) =>
        appointment.name?.toLowerCase().includes(value) ||
        appointment.id?.toString().toLowerCase().includes(value) ||
        appointment.date?.toLowerCase().includes(value) ||
        appointment.time?.toLowerCase().includes(value) ||
        appointment.appointstatus?.toLowerCase().includes(value)
    );
  }, [appointmentsForSelectedDate, searchValue]);

  // =========================
  // SEARCH HANDLER
  // =========================
  const searchFilters = (search) => {
    setSearchValue(search.searchvalue || "");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =========================
          HEADER
      ========================= */}
      <Header title="Appointments" />

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="my-6 mx-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Appointments</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your clinic appointments
          </p>
        </div>

        {/* ADD APPOINTMENT */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-blue-800
            px-4
            py-2.5
            text-sm
            font-bold
            text-white
            transition
            hover:bg-blue-900
            cursor-pointer
          "
        >
          <Plus size={18} />
          Add Appointment
        </button>
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="mx-6 pb-8">
        {/* =========================
            ADD APPOINTMENT MODAL
        ========================= */}
        <Modal
          onClose={() => setOpen(false)}
          isOpen={open}
          title="New Appointment"
        >
          <AppointementForm
            onClose={() => setOpen(false)}
            addNewAppointment={addNewAppointment}
          />
        </Modal>

        {/* =========================
            MAIN GRID
        ========================= */}
        <div className="grid grid-cols-[360px_1fr] gap-6">
          {/* =========================
              CALENDAR
          ========================= */}
          <div>
            <AppointementCalendar
              appointdata={data}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* =========================
              APPOINTMENTS PANEL
          ========================= */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            {selectedDate ? (
              <>
                {/* =========================
                    SELECTED DATE HEADER
                ========================= */}
                <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="mt-1 text-xl font-bold text-blue-900">
                      {displaySelectedDate()}
                    </h2>

                    <p className="text-sm text-gray-400">
                      {appointmentsForSelectedDate.length}{" "}
                      {appointmentsForSelectedDate.length === 1
                        ? "Appointment Scheduled"
                        : "Appointments Scheduled"}
                    </p>
                  </div>

                  {/* CLEAR DATE */}
                  <button
                    type="button"
                    onClick={clearSelectedDate}
                    className="
                      flex
                      items-center
                      gap-1
                      text-sm
                      text-gray-500
                      transition
                      hover:text-gray-800
                    "
                  >
                    <X size={16} />
                    Clear
                  </button>
                </div>

                {/* =========================
                    SEARCH + APPOINTMENTS
                ========================= */}
                <div className="mt-5 space-y-3">
                  {/* SEARCH */}
                  {appointmentsForSelectedDate.length > 0 && (
                    <SearchFilters
                      searchFilters={searchFilters}
                      type="appointment"
                    />
                  )}

                  {/* =========================
                      NO APPOINTMENTS
                  ========================= */}
                  {appointmentsForSelectedDate.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-14">
                      <div
                        className="
                          mb-4
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-50
                        "
                      >
                        <CalendarDays size={22} className="text-blue-700" />
                      </div>

                      <p className="text-sm text-gray-500">
                        No appointments scheduled
                      </p>
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    /* =========================
                       NO SEARCH RESULTS
                    ========================= */
                    <div className="flex flex-col items-center justify-center py-14">
                      <div
                        className="
                          mb-4
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-gray-50
                        "
                      >
                        <CalendarDays size={22} className="text-gray-400" />
                      </div>

                      <p className="text-sm text-gray-500">
                        No appointments found
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Try a different search
                      </p>
                    </div>
                  ) : (
                    /* =========================
                       APPOINTMENT LIST
                    ========================= */
                    filteredAppointments.map((appointment) => (
                      <AppointmentPreview
                        key={appointment.id}
                        appointment={appointment}
                        onAppointmentUpdate={handleAppointmentUpdate}
                        deleteAppointment={deleteAppointment}
                      />
                    ))
                  )}
                </div>
              </>
            ) : (
              /* =========================
                  NO DATE SELECTED
              ========================= */
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div
                  className="
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                  "
                >
                  <CalendarDays size={25} className="text-blue-700" />
                </div>

                <h3 className="text-base font-semibold text-gray-700">
                  No Date Selected
                </h3>

                <p className="mt-2 max-w-xs text-sm text-gray-500">
                  Choose a date from the calendar to see the appointments
                  scheduled for that day.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
