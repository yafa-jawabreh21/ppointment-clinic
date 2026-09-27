import { ClipboardClock, ReceiptText, Users } from "lucide-react";

export default function EmptyState({ title }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-gray-200 bg-white">
      <div className="flex max-w-md flex-col items-center px-6 py-12 text-center">
        {/* Icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
          {title === "Bills" ? (
            <ReceiptText size={28} className="text-gray-500" />
          ) : title === "Patients" ? (
            <Users size={28} className="text-gray-500" />
          ) : (
            <ClipboardClock size={28} className="text-gray-500" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">No {title} yet</h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-gray-500">
          You haven't added any {title} yet. Add your first {title} to start
          managing.
        </p>

        {/* Button */}
        {/* <button
          onClick={onAdd}
          className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Add Product
        </button> */}
      </div>
    </div>
  );
}
