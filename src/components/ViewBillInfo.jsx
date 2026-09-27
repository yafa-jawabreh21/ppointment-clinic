import { CreditCard, Receipt } from "lucide-react";
import React from "react";

export default function ViewBillInfo({
  viewBill,
  getStatusStyle,
  getRemainingAmount,
}) {
  return (
    <div className="space-y-5">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Receipt size={20} className="text-blue-700" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Patient</p>

            <p className="font-semibold text-gray-900">{viewBill.name}</p>

            <p className="text-xs text-gray-500">Patient ID: {viewBill.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Visit Date</p>

          <p className="text-sm font-medium text-gray-900 mt-1">
            {viewBill.Visitdate}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Status</p>

          <span
            className={`inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
              viewBill.Billstatus
            )}`}
          >
            {viewBill.Billstatus}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Bill Details
        </h3>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* TABLE HEADER */}

          <div className="grid grid-cols-[1fr_auto] gap-3 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
            <span>Amount</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Amount</span>

          <span className="font-semibold text-gray-900">{viewBill.amount}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Paid</span>

          <span className="font-semibold text-green-600">{viewBill.paid}₪</span>
        </div>

        <div className="flex justify-between border-t border-gray-200 pt-2">
          <span className="font-semibold text-gray-900">Remaining</span>

          <span className="font-semibold text-red-600">
            {getRemainingAmount(viewBill)}₪
          </span>
        </div>
      </div>

      {/* {getRemainingAmount(viewBill) > 0 && (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          <CreditCard size={17} />
          Record Payment
        </button>
      )} */}
    </div>
  );
}
