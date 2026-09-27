import React from "react";

export default function PatientsTable() {
  return (
    <div>
      <div class="overflow-x-auto px-4 md:px-8 mt-6">
        <table class="w-full max-w-7xl mx-auto">
          <thead class="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
            <tr>
              <th scope="col" class="px-3 py-3.5">
                ID
              </th>
              <th scope="col" class="px-3 py-3.5">
                Name
              </th>
              <th scope="col" class="px-3 py-3.5">
                Age
              </th>
              <th scope="col" class="px-3 py-3.5">
                Phone Number
              </th>
              <th scope="col" class="px-3 py-3.5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="text-sm">
            <tr class="even:bg-slate-50">
              <td class="px-3 py-4 font-medium text-slate-900 whitespace-nowrap">
                1
              </td>
              <td class="px-3 py-4 text-slate-500">Ahmed</td>
              <td class="px-3 py-4 text-slate-500">20</td>
              <td class="px-3 py-4 text-slate-500">0597592200</td>
              <td class="px-3 py-4 flex gap-3">
                <button
                  type="button"
                  class="text-sm text-blue-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="Edit John Doe"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                  aria-label="Delete John Doe"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="text-sm text-green-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                  aria-label="Delete John Doe"
                >
                  View Profile
                </button>
              </td>
            </tr>

            <tr class="even:bg-slate-50">
              <td class="px-3 py-4 font-medium text-slate-900 whitespace-nowrap">
                2
              </td>
              <td class="px-3 py-4 text-slate-500">Mohammed</td>
              <td class="px-3 py-4 text-slate-500">30</td>
              <td class="px-3 py-4 text-slate-500">0594436084</td>
              <td class="px-3 py-4 flex gap-3">
                <button
                  aria-label="Edit Jane Smith"
                  class="text-sm text-blue-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  aria-label="Delete Jane Smith"
                  class="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="text-sm text-green-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                  aria-label="Delete John Doe"
                >
                  View Profile
                </button>
              </td>
            </tr>

            <tr class="even:bg-slate-50">
              <td class="px-3 py-4 font-medium text-slate-900 whitespace-nowrap">
                3
              </td>
              <td class="px-3 py-4 text-slate-500">Sara</td>
              <td class="px-3 py-4 text-slate-500">27</td>
              <td class="px-3 py-4 text-slate-500">0594436085</td>
              <td class="px-3 py-4 flex gap-3">
                <button
                  aria-label="Edit Alex Brown"
                  class="text-sm text-blue-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  aria-label="Delete Alex Brown"
                  class="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="text-sm text-green-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                  aria-label="Delete John Doe"
                >
                  View Profile
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
