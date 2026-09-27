import React, { useState } from "react";

export default function PatientForm({ onClose, addNewPatient }) {
  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    phone: "",
    age: "",
    gender: "",
    dob: "",
    IDnumber: "",
    optphone: "",
    status: "",
    address: "",
    actions: ["delete", "view profile"],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = {
      ...newPatient,
      id: Date.now().toString(),
    };

    addNewPatient(patient);
    onClose();
  };
  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        {/* Patient Name */}
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Patient Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
            placeholder="Enter patient name"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Address
          </label>

          <input
            type="text"
            value={newPatient.address}
            onChange={(e) =>
              setNewPatient({ ...newPatient, address: e.target.value })
            }
            placeholder="Enter patient Address"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* age */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Age <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Gender <span className="text-red-500">*</span>
          </label>

          <select
            onChange={(e) =>
              setNewPatient({ ...newPatient, gender: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            DOB <span className="text-red-500">*</span>
          </label>

          <input
            value={newPatient.dob}
            onChange={(e) =>
              setNewPatient({ ...newPatient, dob: e.target.value })
            }
            type="date"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            ID number <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            value={newPatient.IDnumber}
            onChange={(e) =>
              setNewPatient({ ...newPatient, IDnumber: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            value={newPatient.phone}
            onChange={(e) =>
              setNewPatient({ ...newPatient, phone: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Phone Number(2)
          </label>

          <input
            type="tel"
            value={newPatient.optphone}
            onChange={(e) =>
              setNewPatient({ ...newPatient, optphone: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* State */}
        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            status <span className="text-red-500">*</span>
          </label>

          <select
            onChange={(e) =>
              setNewPatient({ ...newPatient, status: e.target.value })
            }
            required
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Notes */}
        {/* <div className="col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-900">
                        Notes
                      </label>
        
                      <textarea
                        rows="4"
                        placeholder="Write notes here..."
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div> */}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center gap-3 border-t pt-5">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
        >
          Add
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
  );
}
