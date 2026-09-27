import React, { useState } from "react";

export default function BillsForm({ onClose, addNewBills }) {
  const [newBills, setNewBills] = useState({
    name: "",
    Visitdate: "",
    amount: "",
    paid: "",
    Billstatus: "",
    billactions: ["View", "Mark Paid", "Delete"],
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewBills((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE STATUS CHANGE
  // =========================

  const handleStatusChange = (e) => {
    const status = e.target.value;

    setNewBills((prev) => ({
      ...prev,
      Billstatus: status,
      paid: "",
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = Number(newBills.amount);

    // Amount validation
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    let paid = 0;

    // =========================
    // PAID
    // =========================

    if (newBills.Billstatus === "Paid") {
      paid = amount;
    }

    // =========================
    // PARTIALLY PAID
    // =========================

    if (newBills.Billstatus === "Partially Paid") {
      paid = Number(newBills.paid);

      if (!paid || paid <= 0) {
        alert("Please enter the paid amount.");
        return;
      }

      if (paid >= amount) {
        alert(
          "For Partially Paid, the paid amount must be less than the total amount."
        );
        return;
      }
    }

    // =========================
    // CREATE BILL
    // =========================

    const bill = {
      id: Date.now().toString(),

      name: newBills.name.trim(),

      Visitdate: newBills.Visitdate,

      amount: amount,

      paid: paid,

      Billstatus: newBills.Billstatus,

      billactions: ["View", "Mark Paid", "Delete"],
    };

    // Send bill to Bills.jsx
    addNewBills(bill);

    // Close modal
    onClose();
  };

  // =========================
  // JSX
  // =========================

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        {/* =========================
            PATIENT NAME
        ========================= */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Patient Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="name"
            required
            value={newBills.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* =========================
            VISIT DATE
        ========================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Visit Date <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            name="Visitdate"
            value={newBills.Visitdate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* =========================
            TOTAL AMOUNT
        ========================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Total Amount <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={newBills.amount}
            onChange={handleChange}
            required
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* =========================
            BILL STATUS
        ========================= */}

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Status <span className="text-red-500">*</span>
          </label>

          <select
            name="Billstatus"
            value={newBills.Billstatus}
            onChange={handleStatusChange}
            required
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Select status</option>

            <option value="Pending">Pending</option>

            <option value="Partially Paid">Partially Paid</option>

            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* =========================
            PAID AMOUNT
        ========================= */}

        {newBills.Billstatus === "Partially Paid" && (
          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Paid Amount <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              name="paid"
              min="0"
              step="0.01"
              value={newBills.paid}
              onChange={handleChange}
              required
              placeholder="Enter paid amount"
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />

            <p className="mt-1 text-xs text-gray-500">
              Enter the amount already paid by the patient.
            </p>
          </div>
        )}
      </div>

      {/* =========================
          BUTTONS
      ========================= */}

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
