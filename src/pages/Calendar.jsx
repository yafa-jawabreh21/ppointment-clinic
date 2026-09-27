import { useState } from "react";
import Modal from "../components/Modal";
import { CalendarDays, Clock } from "lucide-react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [activeView, setActiveView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  useDocumentTitle("Calendar");

  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(2026, 5, 7),
      time: "07:00",
      color: "purple",
      title: "Pickup the grandmother",
      range: "06:00 - 07:30",
      description:
        "Pick up grandmother from the airport. Flight arrives at 6:30 AM.",
      location: "Airport Terminal 2",
    },
    {
      id: 2,
      date: new Date(2026, 5, 9),
      time: "07:00",
      color: "green",
      title: "Workout and Yoga Session",
      range: "06:00 - 07:55",
      description: "Morning workout routine including yoga and cardio.",
      location: "Fitness Center",
    },
    {
      id: 3,
      date: new Date(2026, 0, 12),
      time: "08:00",
      color: "blue",
      title: "Project Task Review",
      range: "08:00 - 08:25",
      description: "Review project tasks and assign new responsibilities.",
      location: "Meeting Room A",
    },
    {
      id: 4,
      date: new Date(2024, 0, 9),
      time: "09:00",
      color: "yellow",
      title: "Breakfast with Patient",
      range: "08:00 - 09:00",
      description:
        "Morning breakfast meeting with patient to discuss treatment plan.",
      location: "Cafeteria",
    },
    {
      id: 5,
      date: new Date(2024, 0, 9),
      time: "10:00",
      color: "green",
      title: "Zumba / Therapy Session",
      range: "09:30 - 10:00",
      description: "Group therapy session with Zumba activities.",
      location: "Therapy Room",
    },
    {
      id: 6,
      date: new Date(2024, 0, 8),
      time: "11:00",
      color: "blue",
      title: "Daily Standup",
      range: "10:00 - 11:00",
      description: "Daily team standup meeting to discuss progress.",
      location: "Conference Room",
    },
    {
      id: 7,
      date: new Date(2024, 0, 11),
      time: "11:00",
      color: "yellow",
      title: "Patient Checkup",
      range: "10:00 - 11:45",
      description: "Regular patient checkup and medical assessment.",
      location: "Clinic Room 3",
    },
    {
      id: 8,
      date: new Date(2024, 0, 9),
      time: "14:00",
      color: "blue",
      title: "Team Meeting",
      range: "14:00 - 15:00",
      description: "Weekly team sync meeting.",
      location: "Conference Room B",
    },
    {
      id: 9,
      date: new Date(2024, 0, 9),
      time: "16:00",
      color: "purple",
      title: "Client Presentation",
      range: "16:00 - 17:30",
      description: "Present project updates to client.",
      location: "Board Room",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    location: "",
    color: "blue",
  });

  const colors = ["blue", "green", "yellow", "purple"];

  const generateTimeSlots = () => {
    const slots = [];

    for (let hour = 6; hour <= 22; hour++) {
      const timeStr = hour.toString().padStart(2, "0") + ":00";
      slots.push(timeStr);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getWeekDays = () => {
    const weekDays = [];
    const start = new Date(currentDate);

    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      weekDays.push(date);
    }

    return weekDays;
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const monthDays = [];

    for (let i = 0; i < startingDay; i++) {
      monthDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(new Date(year, month, i));
    }

    return monthDays;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);

    if (activeView === "day") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (activeView === "week") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else if (activeView === "month") {
      newDate.setMonth(newDate.getMonth() + direction);
    }

    setCurrentDate(newDate);
  };

  const getEventsForDate = (date, time = null) => {
    if (!date) return [];

    return events.filter((event) => {
      const eventDate = new Date(event.date);

      const matchDate =
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();

      if (time) {
        return matchDate && event.time === time;
      }

      return matchDate;
    });
  };

  const formatDateHeader = () => {
    if (activeView === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    if (activeView === "week") {
      const weekStart = new Date(currentDate);

      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      const weekEnd = new Date(weekStart);

      weekEnd.setDate(weekEnd.getDate() + 6);

      return `${weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${weekEnd.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    }

    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));

      handleCloseModal();
    }
  };

  const handleEditEvent = (event) => {
    setIsEditing(true);

    setFormData({
      title: event.title,
      date: event.date.toISOString().split("T")[0],
      startTime: event.time,
      endTime: event.range.split(" - ")[1],
      description: event.description || "",
      location: event.location || "",
      color: event.color,
    });
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();

    if (isEditing && selectedEvent) {
      const updatedEvents = events.map((event) => {
        if (event.id === selectedEvent.id) {
          return {
            ...event,
            title: formData.title,
            date: new Date(formData.date),
            time: formData.startTime,
            range: `${formData.startTime} - ${formData.endTime}`,
            description: formData.description,
            location: formData.location,
            color: formData.color,
          };
        }

        return event;
      });

      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: Date.now(),
        title: formData.title,
        date: new Date(formData.date),
        time: formData.startTime,
        range: `${formData.startTime} - ${formData.endTime}`,
        description: formData.description,
        location: formData.location,
        color: formData.color,
      };

      setEvents([...events, newEvent]);
    }

    handleCloseModal();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      location: "",
      color: "blue",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setIsEditing(false);
    resetForm();
  };

  const handleNewActivity = () => {
    setSelectedEvent(null);
    setIsEditing(false);

    setFormData({
      title: "",
      date: new Date(currentDate).toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      description: "",
      location: "",
      color: "blue",
    });

    setIsModalOpen(true);
  };

  const formatTimeDisplay = (timeStr) => {
    const [hour, minute] = timeStr.split(":").map(Number);

    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const renderDayView = () => {
    return (
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-1">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="grid grid-cols-1 border-t border-gray-200"
            >
              <TimeRow time={formatTimeDisplay(time)}>
                {getEventsForDate(new Date(currentDate), time).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="w-full"
                  >
                    <EventCard {...event} />
                  </div>
                ))}
              </TimeRow>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();

    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="grid grid-cols-7 border-t border-gray-200 flex-shrink-0 sticky top-0 bg-stone-50 z-10">
          <div className="p-1" />

          {weekDays.map((date, i) => (
            <div
              key={i}
              className="p-1 text-center text-xs font-medium text-gray-900"
            >
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 border-t border-gray-200">
          {timeSlots.map((time) => (
            <div key={time} className="contents">
              <TimeRow time={formatTimeDisplay(time)} />

              {weekDays.map((date, dayIndex) => (
                <TimeRow key={`${time}-${dayIndex}`}>
                  {getEventsForDate(date, time).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className="w-full"
                    >
                      <EventCard {...event} />
                    </div>
                  ))}
                </TimeRow>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getMonthDays();

    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="grid grid-cols-7 border-t border-gray-200 flex-shrink-0 sticky top-0 bg-stone-50 z-10">
          {days.map((day) => (
            <div
              key={day}
              className="p-1 text-center text-xs font-medium text-gray-900"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 border-t border-gray-200 flex-1">
          {monthDays.map((date, index) => (
            <div
              key={index}
              className={`border-r border-b border-gray-200 p-1 overflow-y-auto ${
                !date ? "bg-gray-50" : "hover:bg-stone-50 transition"
              }`}
            >
              {date && (
                <>
                  <div className="text-xs font-semibold text-gray-900 mb-0.5">
                    {date.getDate()}
                  </div>

                  <div className="space-y-0.5">
                    {getEventsForDate(date)
                      .slice(0, 3)
                      .map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="text-[10px]"
                        >
                          <EventCard {...event} />
                        </div>
                      ))}

                    {getEventsForDate(date).length > 3 && (
                      <div className="text-[10px] text-gray-500 font-medium">
                        +{getEventsForDate(date).length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-stone-50 h-screen overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 h-full flex flex-col">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-2 flex-shrink-0">
          {/* DATE NAVIGATION */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate(-1)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M17 4.5L17 5.15M7 4.5V3.85M3 8.5V17h18V8.5"
                stroke="#111827"
                strokeWidth="1.5"
              />
            </svg>

            <h2 className="text-base font-semibold text-gray-900">
              {formatDateHeader()}
            </h2>

            <button
              onClick={() => navigateDate(1)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="ml-1 px-2 py-0.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              Today
            </button>
          </div>

          {/* VIEW SWITCHER */}
          <div className="flex items-center gap-px bg-gray-100 p-0.5 rounded-lg">
            {["Day", "Week", "Month"].map((v) => (
              <button
                key={v}
                onClick={() => handleViewChange(v.toLowerCase())}
                className={`px-3 py-1 text-xs rounded-lg transition ${
                  activeView === v.toLowerCase()
                    ? "bg-white text-indigo-600"
                    : "text-gray-500 hover:bg-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* NEW ACTIVITY */}
          <button
            onClick={handleNewActivity}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold text-sm"
          >
            + New Activity
          </button>
        </div>

        {/* CALENDAR GRID */}
        <div className="flex-1 overflow-hidden">
          {activeView === "day" && renderDayView()}
          {activeView === "week" && renderWeekView()}
          {activeView === "month" && renderMonthView()}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedEvent && !isEditing
            ? selectedEvent.title
            : isEditing
            ? "Edit Activity"
            : "Create New Activity"
        }
      >
        {selectedEvent && !isEditing ? (
          <div>
            {/* <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                selectedEvent.color === "blue"
                  ? "bg-blue-100"
                  : selectedEvent.color === "green"
                  ? "bg-green-100"
                  : selectedEvent.color === "yellow"
                  ? "bg-yellow-100"
                  : "bg-purple-100"
              }`}
            >
              <span
                className={`text-2xl ${
                  selectedEvent.color === "blue"
                    ? "text-blue-600"
                    : selectedEvent.color === "green"
                    ? "text-green-600"
                    : selectedEvent.color === "yellow"
                    ? "text-yellow-600"
                    : "text-purple-600"
                }`}
              ></span>
            </div> */}

            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-sm">
                  <CalendarDays />
                </span>

                <span className="text-sm">
                  {selectedEvent.date.toLocaleDateString()}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <span className="text-sm">
                  <Clock />
                </span>

                <span className="text-sm">{selectedEvent.range}</span>
              </p>

              {selectedEvent.location && (
                <p className="flex items-center gap-2">
                  <span className="text-sm">📍</span>

                  <span className="text-sm">{selectedEvent.location}</span>
                </p>
              )}

              <p className="text-sm text-gray-600 mt-4">
                {selectedEvent.description}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleEditEvent(selectedEvent)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Edit Event
              </button>

              <button
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="flex-1 border border-red-300 hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter activity title"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>

                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* START / END TIME */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time *
                  </label>

                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time *
                  </label>

                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>

                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter location"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter activity description"
                />
              </div>

              {/* COLOR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>

                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          color,
                        })
                      }
                      className={`w-8 h-8 rounded-full border-2 ${
                        formData.color === color
                          ? "border-gray-900"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor:
                          color === "blue"
                            ? "#DBEAFE"
                            : color === "green"
                            ? "#D1FAE5"
                            : color === "yellow"
                            ? "#FEF3C7"
                            : "#F3E8FF",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  {isEditing ? "Update" : "Create"} Activity
                </button>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
}

function TimeRow({ time, children }) {
  return (
    <div className="h-12 border-r border-t border-gray-200 flex items-center p-1 text-[10px] text-gray-400 font-semibold relative">
      <span className="w-12 flex-shrink-0">{time}</span>

      <div className="flex-1 flex items-center justify-center px-1">
        {children}
      </div>
    </div>
  );
}

function EventCard({ title, range, color, onClick }) {
  const colors = {
    blue: "border-blue-600 bg-blue-50 text-blue-600",
    green: "border-green-600 bg-green-50 text-green-600",
    yellow: "border-yellow-600 bg-yellow-50 text-yellow-600",
    purple: "border-purple-600 bg-purple-50 text-purple-600",
  };

  return (
    <div
      className={`rounded px-1.5 py-0.5 border-l-2 ${colors[color]} cursor-pointer hover:opacity-80 transition w-full text-[10px]`}
      onClick={onClick}
    >
      <p className="font-medium text-gray-900 truncate">{title}</p>

      <p className="font-semibold truncate">{range}</p>
    </div>
  );
}

function MobileRow({ time }) {
  return (
    <div className="h-20 border-b border-gray-200 p-2 flex items-end text-xs font-semibold text-gray-400">
      {time}
    </div>
  );
}
