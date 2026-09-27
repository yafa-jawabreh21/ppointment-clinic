import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
import {
  BanknoteCheck,
  Eye,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Tables({
  headers,
  data,
  onView,
  handleMarkPaid,
  title,
  deleteBill,
  deletePatient,
}) {
  // ================= PAGINATION =================

  const rowsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [data, currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      {/* ================= TABLE ================= */}

      {data.length > 0 ? (
        <>
          <div className="relative rounded-lg overflow-x-auto bg-white shadow-xs border border-gray-200">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
              {/* ================= TABLE HEADER ================= */}

              <thead className="text-sm bg-blue-50 text-gray-700 border-b border-gray-200">
                <tr>
                  {headers.map((el, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 font-normal"
                    >
                      {el}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}

              <tbody>
                {currentData.map((el, index) => (
                  <tr
                    key={el.id || index}
                    className="bg-white border-b border-gray-200"
                  >
                    {/* ================= ID ================= */}

                    {headers.includes("#") && (
                      <th
                        scope="row"
                        className="px-6 py-4 font-normal text-gray-700 whitespace-nowrap"
                      >
                        {el.id}
                      </th>
                    )}

                    {/* ================= PATIENT NAME ================= */}

                    {headers.includes("Patient Name") && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}

                          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-normal">
                            {el.name
                              ?.trim()
                              .split(/\s+/)
                              .map((word) => word.charAt(0))
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>

                          {/* Name */}

                          <span className="font-normal text-gray-700">
                            {el.name}
                          </span>
                        </div>
                      </td>
                    )}

                    {/* ================= PHONE NUMBER ================= */}

                    {headers.includes("Phone Number") && (
                      <td className="px-6 py-4">{el.phone}</td>
                    )}

                    {/* ================= DATE ================= */}

                    {headers.includes("Date") && (
                      <td className="px-6 py-4">{el.date}</td>
                    )}

                    {/* ================= VISIT DATE ================= */}

                    {headers.includes("Visit Date") && (
                      <td className="px-6 py-4">{el.Visitdate}</td>
                    )}

                    {/* ================= TIME ================= */}

                    {headers.includes("Time") && (
                      <td className="px-6 py-4">{el.time}</td>
                    )}

                    {/* ================= TOTAL AMOUNT ================= */}

                    {headers.includes("Total Amount") && (
                      <td className="px-6 py-4">{el.amount}</td>
                    )}

                    {/* ================= STATUS ================= */}

                    {headers.includes("Status") && (
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-normal rounded-full ${
                            el.appointstatus === "Canceled" ||
                            el.status === "Inactive"
                              ? "bg-red-100 text-red-700"
                              : el.appointstatus === "Confirmed" ||
                                el.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {el.appointstatus || el.status}
                        </span>
                      </td>
                    )}

                    {/* ================= BILL STATUS ================= */}

                    {headers.includes("Bill status") && (
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            el.Billstatus === "Partially Paid"
                              ? "bg-red-100 text-red-700"
                              : el.Billstatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {el.Billstatus}
                        </span>
                      </td>
                    )}

                    {/* ================= PATIENT ACTIONS ================= */}

                    {headers.includes("Actions") && el.actions && (
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          {el.actions.map((action, actionIndex) => {
                            const actionName = action.toLowerCase();

                            return (
                              <div key={actionIndex} className="relative group">
                                {/* DELETE */}

                                {actionName === "delete" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      deletePatient && deletePatient(el.id)
                                    }
                                    className="p-2 rounded-md hover:bg-red-50 transition cursor-pointer"
                                    aria-label={`Delete ${el.name}`}
                                  >
                                    <Trash2
                                      size={20}
                                      className="text-gray-600 group-hover:text-red-600"
                                    />
                                  </button>
                                )}

                                {/* EDIT */}

                                {actionName === "edit" && (
                                  <button
                                    type="button"
                                    className="p-2 rounded-md hover:bg-blue-50 transition cursor-pointer"
                                    aria-label={`Edit ${el.name}`}
                                  >
                                    <Pencil
                                      size={20}
                                      className="text-gray-600 group-hover:text-blue-600"
                                    />
                                  </button>
                                )}

                                {/* VIEW PROFILE */}

                                {actionName === "view profile" && (
                                  <Link
                                    to={`/dashboard/profile/${el.id}`}
                                    className="block p-2 rounded-md hover:bg-blue-50 transition"
                                    aria-label={`View ${el.name} profile`}
                                  >
                                    <Eye
                                      size={20}
                                      className="text-gray-600 group-hover:text-blue-600"
                                    />
                                  </Link>
                                )}

                                {/* TOOLTIP */}

                                <span
                                  className="
                                    absolute
                                    bottom-full
                                    left-1/2
                                    -translate-x-1/2
                                    mb-2
                                    px-2
                                    py-1
                                    text-xs
                                    text-white
                                    bg-gray-800
                                    rounded
                                    whitespace-nowrap
                                    opacity-0
                                    invisible
                                    group-hover:opacity-100
                                    group-hover:visible
                                    transition
                                    duration-200
                                    pointer-events-none
                                    z-50
                                  "
                                >
                                  {action}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    )}

                    {/* ================= BILL ACTIONS ================= */}

                    {headers.includes("Actions") && el.billactions && (
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          {el.billactions
                            .filter(
                              (action) =>
                                !(
                                  el.Billstatus === "Paid" &&
                                  action.toLowerCase() === "mark paid"
                                )
                            )
                            .map((action, actionIndex) => {
                              const actionName = action.toLowerCase();

                              return (
                                <div
                                  key={actionIndex}
                                  className="relative group"
                                >
                                  {/* ACTION BUTTON */}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      // VIEW
                                      if (actionName === "view" && onView) {
                                        onView(el);
                                      }

                                      // MARK PAID
                                      if (
                                        actionName === "mark paid" &&
                                        handleMarkPaid
                                      ) {
                                        handleMarkPaid(el);
                                      }

                                      // DELETE
                                      if (
                                        actionName === "delete" &&
                                        deleteBill
                                      ) {
                                        deleteBill(el.id);
                                      }
                                    }}
                                    className="p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                                    aria-label={`${action} ${el.name}`}
                                  >
                                    {/* VIEW */}

                                    {actionName === "view" && (
                                      <Eye
                                        size={20}
                                        className="text-gray-600 group-hover:text-blue-600"
                                      />
                                    )}

                                    {/* MARK PAID */}

                                    {actionName === "mark paid" && (
                                      <BanknoteCheck
                                        size={20}
                                        className="text-gray-600 group-hover:text-green-600"
                                      />
                                    )}

                                    {/* DELETE */}

                                    {actionName === "delete" && (
                                      <Trash2
                                        size={20}
                                        className="text-gray-600 group-hover:text-red-600"
                                      />
                                    )}
                                  </button>

                                  {/* TOOLTIP */}

                                  <span
                                    className="
                                      absolute
                                      bottom-full
                                      left-1/2
                                      -translate-x-1/2
                                      mb-2
                                      px-2
                                      py-1
                                      text-xs
                                      text-white
                                      bg-gray-800
                                      rounded
                                      whitespace-nowrap
                                      opacity-0
                                      invisible
                                      group-hover:opacity-100
                                      group-hover:visible
                                      transition
                                      duration-200
                                      pointer-events-none
                                      z-50
                                    "
                                  >
                                    {action}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-2">
              {/* Showing information */}

              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-700">
                  {Math.min(startIndex + rowsPerPage, data.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {data.length} Patients
                </span>
              </div>

              {/* Pagination */}

              <div className="flex items-center gap-1">
                {/* Previous */}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`
                    flex items-center justify-center
                    w-9 h-9
                    rounded-md
                    border border-gray-200
                    transition
                    ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    }
                  `}
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Page Numbers */}

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`
                      w-9 h-9
                      rounded-md
                      border
                      text-sm
                      transition
                      ${
                        currentPage === page
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`
                    flex items-center justify-center
                    w-9 h-9
                    rounded-md
                    border border-gray-200
                    transition
                    ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    }
                  `}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState title={title} />
      )}
    </div>
  );
}
