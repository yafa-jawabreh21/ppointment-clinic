import React, { useState } from "react";
import { Pencil, Phone, MapPin, Calendar, User, Activity } from "lucide-react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Profile = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("overview");

  // =========================
  // GET PATIENTS FROM STORAGE
  // =========================

  const patients = JSON.parse(localStorage.getItem("patients") || "[]");

  // Find patient using URL id
  const foundPatient = patients.find(
    (patient) => String(patient.id) === String(id)
  );

  const [patient, setPatient] = useState(foundPatient);

  useDocumentTitle("Profile");

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleInputChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE PATIENT
  // =========================

  const handleSave = () => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");

    const updatedPatients = patients.map((el) =>
      String(el.id) === String(patient.id) ? patient : el
    );

    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    console.log("Updated patient:", patient);
  };

  // =========================
  // PATIENT NOT FOUND
  // =========================

  if (!patient) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <h1 className="text-xl font-bold text-gray-900">
              Patient Not Found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              No patient was found with ID: {id}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Patient Card */}

        <div className="overflow-hidden rounded-lg bg-white shadow">
          {/* Header */}

          <div className="bg-blue-800 px-6 py-8 text-white">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* Patient Avatar */}

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-blue-800">
                <User size={45} />
              </div>

              {/* Patient Information */}

              <div>
                <p className="text-sm font-medium text-blue-200">
                  Patient ID: {patient.id}
                </p>

                <h1 className="mt-1 text-3xl font-bold">{patient.name}</h1>
              </div>

              {/* Status */}

              <div className="sm:ml-auto">
                <span
                  className={`rounded-full ${
                    patient.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : patient.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  } px-4 py-2 text-sm font-medium`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact */}

          <div className="grid grid-cols-1 gap-4 border-b p-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
                <Phone size={20} />
              </div>

              <div>
                <p className="text-xs text-gray-500">Phone</p>

                <p className="text-sm font-medium text-gray-900">
                  {patient.phone}
                </p>
              </div>
            </div>

            {patient.address && (
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Address</p>

                  <p className="text-sm font-medium text-gray-900">
                    {patient.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}

          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                {
                  id: "overview",
                  label: "Overview",
                },
                {
                  id: "edit",
                  label: "Edit Patient",
                },
                {
                  id: "appointments",
                  label: "Appointments",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}

          <div className="p-6">
            {/* ================= OVERVIEW ================= */}

            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <InfoItem label="Full Name" value={patient.name} />

                    <InfoItem label="Patient ID" value={patient.id} />

                    <InfoItem label="Gender" value={patient.gender} />

                    <InfoItem
                      label="Date of Birth"
                      value={patient.dateOfBirth || patient.dob}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}

                {patient.optphone && (
                  <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                      Emergency Contact
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InfoItem
                        label="Contact Phone"
                        value={patient.optphone}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= EDIT ================= */}

            {activeTab === "edit" && (
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <Pencil size={20} className="text-blue-600" />

                  <h2 className="text-lg font-semibold text-gray-900">
                    Edit Patient
                  </h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  {/* Name */}

                  <FormInput
                    label="Full Name"
                    name="name"
                    value={patient.name || ""}
                    onChange={handleInputChange}
                  />

                  {/* Phone */}

                  <FormInput
                    label="Phone Number"
                    name="phone"
                    value={patient.phone || ""}
                    onChange={handleInputChange}
                  />

                  {/* DOB */}

                  <FormInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={patient.dob || ""}
                    onChange={handleInputChange}
                  />

                  {/* Gender */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={patient.gender || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="Male">Male</option>

                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Address */}

                  <div className="sm:col-span-2">
                    <FormInput
                      label="Address"
                      name="address"
                      value={patient.address || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Emergency Phone */}

                  <FormInput
                    label="Emergency Phone"
                    name="optphone"
                    value={patient.optphone || ""}
                    onChange={handleInputChange}
                  />

                  {/* Status */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Patient Status
                    </label>

                    <select
                      name="status"
                      value={patient.status || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="Active">Active</option>

                      <option value="Inactive">Inactive</option>

                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  {/* Save */}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================= APPOINTMENTS ================= */}

            {activeTab === "appointments" && (
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />

                  <h2 className="text-lg font-semibold text-gray-900">
                    Appointment History
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Date</th>

                        <th className="px-4 py-3">Time</th>

                        <th className="px-4 py-3">Doctor</th>

                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-4">15/08/2026</td>

                        <td className="px-4 py-4">10:00 AM</td>

                        <td className="px-4 py-4">Dr. Ahmad</td>

                        <td className="px-4 py-4">
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Confirmed
                          </span>
                        </td>
                      </tr>

                      <tr className="border-b">
                        <td className="px-4 py-4">01/08/2026</td>

                        <td className="px-4 py-4">11:00 AM</td>

                        <td className="px-4 py-4">Dr. Ahmad</td>

                        <td className="px-4 py-4">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>

      <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function FormInput({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
      />
    </div>
  );
}

export default Profile;
