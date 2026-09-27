import React, { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Header from "../components/Header";
import CalculationDiv from "../components/CalculationDiv";
import Tables from "../components/Tables";
import RevenueChart from "../components/RevenueChart";

export default function Dashboard() {
  useDocumentTitle("Dashboard");

  // Get appointments from localStorage
  const [data, setData] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");

    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  const headers = ["#", "Patient Name", "Date", "Time", "Status"];

  const today = new Date();

  const todayDate = today.toISOString().split("T")[0];

  const todayAppointments = data.filter((appointment) => {
    return appointment.date === todayDate;
  });

  return (
    <div>
      <Header title="Dashboard" />

      <div className="my-6 mx-6 flex items-center justify-between">
        <div>
          <h1 className="text-blue-900 font-bold text-3xl">
            Good Morning, Dr. Smith
          </h1>
          <h6 className="text-gray-500 text-sm">
            Here's what's happening at City Medical today.
          </h6>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap mx-6">
        <CalculationDiv
          title="Today's Appointments"
          result={todayAppointments.length}
          subtitle="Total booked"
        />

        <CalculationDiv
          title="Today's Revenue"
          result="3,000₪"
          subtitle="Cash collected"
        />

        <CalculationDiv
          title="Pending Billing"
          result="3"
          subtitle="Awaiting payment"
        />

        <CalculationDiv
          title="Completed Today"
          result="14"
          subtitle="Appointments done"
        />
      </div>

      <div className="mt-6 mr-12 ml-6 flex justify-between gap-6">
        <div className="w-[60%] border border-gray-200 rounded-lg rounded-b-none">
          <div className="bg-white font-bold rounded-lg rounded-b-none py-4 px-4">
            Today's Schedule
          </div>

          <Tables
            headers={headers}
            data={todayAppointments}
            title="Appointments"
          />
        </div>

        <div className="w-[40%]">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}
