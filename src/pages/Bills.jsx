import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Filteration from "../components/Filteration";
import { Plus } from "lucide-react";
import Tables from "../components/Tables";
import BillsForm from "../components/BillsForm";
import Modal from "../components/Modal";
import ViewBillInfo from "../components/ViewBillInfo";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Bills() {
  useDocumentTitle("Bills");

  // =========================
  // MODAL STATE
  // =========================

  const [open, setOpen] = useState(false);

  const [viewBill, setViewBill] = useState(null);

  // =========================
  // TABLE HEADERS
  // =========================

  const headers = [
    "#",
    "Patient Name",
    "Visit Date",
    "Total Amount",
    "Bill status",
    "Actions",
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const storedBills = localStorage.getItem("bills");

    if (storedBills) {
      try {
        const parsedBills = JSON.parse(storedBills);

        if (Array.isArray(parsedBills)) {
          setData(parsedBills);
        }
      } catch (error) {
        console.error("Error reading bills from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(data));
  }, [data]);

  const handleViewBill = (bill) => {
    setViewBill(bill);
  };

  const handleMarkPaid = (elem) => {
    setData((prevData) =>
      prevData.map((el) =>
        el.id === elem.id
          ? {
              ...el,
              Billstatus: "Paid",
              paid: Number(el.amount),
            }
          : el
      )
    );

    // Update the bill currently being viewed
    setViewBill((prev) =>
      prev && prev.id === elem.id
        ? {
            ...prev,
            Billstatus: "Paid",
            paid: Number(elem.amount),
          }
        : prev
    );
  };

  const addNewBills = (bill) => {
    setData((prevData) => [...prevData, bill]);
  };

  const deleteBill = (id) => {
    setData((prevData) => prevData.filter((el) => el.id !== id));

    // If the deleted bill is currently open
    // close the view modal
    setViewBill((prev) => (prev && prev.id === id ? null : prev));
  };

  const getRemainingAmount = (bill) => {
    if (bill.Billstatus === "Paid") {
      return 0;
    }

    if (bill.Billstatus === "Partially Paid") {
      return Number(bill.amount || 0) - Number(bill.paid || 0);
    }

    if (bill.Billstatus === "Pending") {
      return Number(bill.amount || 0);
    }

    return 0;
  };

  const handleCloseView = () => {
    setViewBill(null);
  };

  const getStatusStyle = (status) => {
    if (status === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Partially Paid") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div>
      <Header title="Bills" />

      <div className="my-5 flex gap-10 justify-between mx-6">
        <h1 className="text-blue-900 font-bold text-3xl">Billing</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-800 text-white flex gap-2 px-4 py-2 rounded-[8px] hover:bg-blue-900 transition text-[15px] font-bold cursor-pointer"
          >
            <Plus />
            Add Bills
          </button>
        </div>
      </div>

      <div className="p-5">
        {open && (
          <Modal onClose={() => setOpen(false)} isOpen={open} title="New Bill">
            <BillsForm
              onClose={() => setOpen(false)}
              addNewBills={addNewBills}
            />
          </Modal>
        )}

        <Tables
          headers={headers}
          data={data}
          onView={handleViewBill}
          handleMarkPaid={handleMarkPaid}
          title="Bills"
          deleteBill={deleteBill}
        />
      </div>

      {viewBill && (
        <Modal isOpen={true} onClose={handleCloseView} title="Bill Overview">
          <ViewBillInfo
            viewBill={viewBill}
            getStatusStyle={getStatusStyle}
            getRemainingAmount={getRemainingAmount}
          />
        </Modal>
      )}
    </div>
  );
}
