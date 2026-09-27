import React, { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";

const SearchFilters = ({ searchFilters, type }) => {
  const [searchFilter, setSearchFilter] = useState({
    searchvalue: "",
    searchstatus: "",
    searchagegender: "",
  });

  const handleSearchChange = (e) => {
    const updatedFilters = {
      ...searchFilter,
      searchvalue: e.target.value,
    };

    setSearchFilter(updatedFilters);
    searchFilters(updatedFilters);
  };

  const handleStatusChange = (e) => {
    const updatedFilters = {
      ...searchFilter,
      searchstatus: e.target.value,
    };

    setSearchFilter(updatedFilters);
    searchFilters(updatedFilters);
  };

  const handleAgeGenderChange = (e) => {
    const updatedFilters = {
      ...searchFilter,
      searchagegender: e.target.value,
    };

    setSearchFilter(updatedFilters);
    searchFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      searchvalue: "",
      searchstatus: "",
      searchagegender: "",
    };

    setSearchFilter(emptyFilters);
    searchFilters(emptyFilters);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchFilter.searchvalue}
            onChange={handleSearchChange}
            placeholder="Search by patient name, ID, or condition..."
            className="w-full pl-12 pr-4 font-normal py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
          />
        </div>

        {/* Filters */}
        {type !== "appointment" && (
          <div className="flex items-center flex-wrap gap-2">
            {/* Status Filter */}
            <div className="relative min-w-[140px]">
              <select
                value={searchFilter.searchstatus}
                onChange={handleStatusChange}
                className="w-full py-2.5 pl-3 font-normal pr-8 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer appearance-none"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Archived">Archived</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
            </div>

            {/* Age / Gender Filter */}
            <div className="relative min-w-[130px]">
              <select
                value={searchFilter.searchagegender}
                onChange={handleAgeGenderChange}
                className="w-full py-2.5 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer appearance-none"
              >
                <option value="">Age / Gender</option>
                <option value="Pediatric">Pediatric (&lt;18)</option>
                <option value="Adult">Adult (18-64)</option>
                <option value="Senior">Senior (65+)</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
            </div>

            {/* Clear Filters */}
            <button
              type="button"
              onClick={handleClearFilters}
              title="Clear filters"
              className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
