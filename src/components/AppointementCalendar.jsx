import { DayPicker, DayButton } from "react-day-picker";
import "react-day-picker/style.css";

export default function AppointementCalendar({
  appointdata,
  selectedDate,
  onDateSelect,
}) {
  const getStatusesForDate = (date) => {
    const statuses = appointdata
      .filter((appointment) => {
        if (!appointment.date) return false;

        const [year, month, day] = appointment.date.split("-");

        return (
          date.getFullYear() === Number(year) &&
          date.getMonth() === Number(month) - 1 &&
          date.getDate() === Number(day)
        );
      })
      .map((appointment) => appointment.appointstatus);

    return [...new Set(statuses)];
  };

  const CustomDayButton = (props) => {
    const { day, modifiers } = props;
    const statuses = getStatusesForDate(day.date);

    return (
      <DayButton
        {...props}
        day={day}
        modifiers={modifiers}
        onClick={() => onDateSelect(day.date)}
        className="
          relative
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <span>{day.date.getDate()}</span>

        {statuses.length > 0 && (
          <div className="flex items-center justify-center gap-[3px] mt-1">
            {statuses.includes("Confirmed") && (
              <span className="w-[5px] h-[5px] rounded-full bg-green-500" />
            )}

            {statuses.includes("Pending") && (
              <span className="w-[5px] h-[5px] rounded-full bg-orange-500" />
            )}

            {statuses.includes("Canceled") && (
              <span className="w-[5px] h-[5px] rounded-full bg-red-500" />
            )}
          </div>
        )}
      </DayButton>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="mb-4">
        <p className="text-sm text-gray-500 mt-1">
          Select a date to view appointments
        </p>
      </div>

      <DayPicker
        mode="single"
        selected={selectedDate || undefined}
        onSelect={(date) => {
          if (date) onDateSelect(date);
        }}
        components={{
          DayButton: CustomDayButton,
        }}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2035, 11)}
        hideNavigation
        classNames={{
          months: "flex flex-col",
          month: "space-y-4",

          month_caption: "flex justify-center items-center",

          dropdowns: "flex items-center justify-center gap-2",

          dropdown:
            "appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:bg-gray-100 hover:border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all",

          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-gray-400 font-medium text-xs w-10 h-10 flex items-center justify-center",

          row: "flex w-full mt-1",
          cell: "w-10 h-10 flex items-center justify-center",
        }}
      />

      <div className="border-t border-gray-100 mt-4 pt-4">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Confirmed
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Pending
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Canceled
          </div>
        </div>
      </div>
    </div>
  );
}
