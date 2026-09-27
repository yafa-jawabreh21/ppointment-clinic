import React, { useState } from "react";
import Tables from "../components/Tables";
import { Plus } from "lucide-react";
import Header from "../components/Header";
import PatientForm from "../components/PatientForm";
import Modal from "../components/Modal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import CalculationDiv from "../components/CalculationDiv";
import SearchFilters from "../components/SearchFilters";

export default function Patients() {
  const [open, setOpen] = useState(false);
  const headers = ["#", "Patient Name", "Phone Number", "Status", "Actions"];
  const [data, setData] = useState(() => {
    const savedPatients = localStorage.getItem("patients");

    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  const [filteration, setFilteration] = useState(data);
  console.log(filteration);
  useDocumentTitle("Patients");

  const addNewPatient = (patient) => {
    setData((prev) => {
      const updatedPatients = [...prev, patient];

      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      return updatedPatients;
    });

    setOpen(false);
  };

  const deletePatient = (id) => {
    setData((prev) => {
      const updatedPatients = prev.filter(
        (patient) => String(patient.id) !== String(id)
      );

      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      return updatedPatients;
    });
  };

  const totalPatients = data.length;

  const activePatients = data.filter(
    (patient) => patient.status === "Active"
  ).length;

  const inactivePatients = data.filter(
    (patient) => patient.status === "Inactive"
  ).length;

  const searchFilters = (search) => {
    let filteredData = data;

    // Search
    if (search.searchvalue.trim()) {
      const value = search.searchvalue.toLowerCase();

      filteredData = filteredData.filter(
        (el) =>
          el.name?.toLowerCase().includes(value) ||
          el.id?.toString().toLowerCase().includes(value) ||
          el.phone?.toLowerCase().includes(value) ||
          el.condition?.toLowerCase().includes(value)
      );
    }

    // Status
    if (search.searchstatus) {
      filteredData = filteredData.filter(
        (el) => el.status === search.searchstatus
      );
    }

    // Age / Gender
    if (search.searchagegender) {
      filteredData = filteredData.filter((el) => {
        if (search.searchagegender === "Pediatric") {
          return el.age < 18;
        }

        if (search.searchagegender === "Adult") {
          return el.age >= 18 && el.age <= 64;
        }

        if (search.searchagegender === "Senior") {
          return el.age >= 65;
        }

        if (search.searchagegender === "Female") {
          return el.gender === "Female";
        }

        if (search.searchagegender === "Male") {
          return el.gender === "Male";
        }

        return true;
      });
    }

    setFilteration(filteredData);
  };

  return (
    <div className="">
      <Header title="Patients" />

      <div className="my-5 flex gap-10 justify-between mx-6">
        <h1 className="text-blue-900 font-bold text-3xl">Patients</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-800 text-white flex gap-2 px-4 py-2 rounded-[8px] hover:bg-blue-900 transition text-[15px] font-bold font-mono cursor-pointer"
        >
          <Plus /> Add Patient
        </button>
      </div>

      <div className="flex gap-6 flex-wrap mx-6">
        <CalculationDiv result={totalPatients} subtitle="Total Patients" />

        <CalculationDiv result={activePatients} subtitle="Active" />

        <CalculationDiv result={inactivePatients} subtitle="Inactive" />
      </div>

      <div className="p-5">
        {open && (
          <Modal
            onClose={() => setOpen(false)}
            isOpen={open}
            title="New Patient"
          >
            <PatientForm
              onClose={() => setOpen(false)}
              addNewPatient={addNewPatient}
            />
          </Modal>
        )}

        <div>
          <div>
            <SearchFilters searchFilters={searchFilters} />
          </div>
          <Tables
            className=""
            headers={headers}
            data={filteration}
            title="Patients"
            deletePatient={deletePatient}
          />
        </div>
      </div>
    </div>
  );
}
