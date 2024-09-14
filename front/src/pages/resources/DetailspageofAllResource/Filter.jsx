import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

const FilterOption = ({ title, count, isOpen, onClick, children }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      className="flex items-center justify-between w-full py-3 px-4 text-left hover:bg-gray-50 transition-colors duration-200"
      onClick={onClick}
    >
      <span className="flex items-center text-gray-700 font-medium">
        {title}
        {count !== undefined && (
          <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </span>
      {isOpen ? (
        <ChevronUp size={18} className="text-gray-400" />
      ) : (
        <ChevronDown size={18} className="text-gray-400" />
      )}
    </button>
    {isOpen && (
      <div className="p-4 bg-white text-gray-600 border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
);

const FilterComponent = () => {
  const [openFilters, setOpenFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState(0);

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const clearAllFilters = () => {
    setOpenFilters({});
    setActiveFilters(0);
  };

  const filterOptions = [
    { title: 'No. of questions', key: 'questions' },
    { title: 'Grade', key: 'grade' },
    { title: 'Question types', key: 'types' },
    { title: 'Subjects', key: 'subjects', count: 1 },
    { title: 'Languages', key: 'languages', count: 2 },
    { title: 'Sort by', key: 'sort' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-gray-800">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-500" />
            <span className="font-semibold text-sm">Filters</span>
          </div>
          <button
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200 flex items-center"
            onClick={clearAllFilters}
          >
            Clear all
            {activeFilters > 0 && (
              <span className="ml-1 bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200 text-sm">
        {filterOptions.map((option) => (
          <FilterOption
            key={option.key}
            title={option.title}
            count={option.count}
            isOpen={openFilters[option.key]}
            onClick={() => toggleFilter(option.key)}
          >
            {/* Example filter content (replace with actual filter options) */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span>Option 1</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span>Option 2</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span>Option 3</span>
              </label>
            </div>
          </FilterOption>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;