"use client";

import { useState } from "react";
import FilterLink from "./FilterLink";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterDropdownProps = {
  title: string;
  filters: Array<{
    filterName: string;
    label: string;
    type: string;
    disabled: boolean;
  }>;
  selectedFilters: string[];
  onFilterChange: (filterName: string) => void;
};

export default function FilterDropdown({
  title,
  filters,
  selectedFilters,
  onFilterChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={`filter-dropdown ${isOpen ? "filter-dropdown--open" : ""}`}>
      <button
        onClick={toggleDropdown}
        className="button filter-link filter-dropdown__toggle"
      >
        {isOpen ? (
          <FaChevronUp className="filter-dropdown__toggle-icon" />
        ) : (
          <FaChevronDown className="filter-dropdown__toggle-icon" />
        )}
        {title}
      </button>
      <ul
        className={`filter-dropdown__list ${
          isOpen ? "filter-dropdown__list--open" : ""
        }`}
      >
        <div className="filter-dropdown__list-container">
          {filters
            .filter((filter) => filter.filterName !== "/")
            .map((filter) => (
              <FilterLink
                key={filter.filterName}
                href="#"
                label={filter.label}
                type={filter.type}
                checked={selectedFilters.includes(filter.filterName)}
                disabled={filter.disabled}
                onClick={() => onFilterChange(filter.filterName)}
                groupName="filter"
                onActivate={() => {}}
              >
                {filter.label}
              </FilterLink>
            ))}
        </div>
      </ul>
    </div>
  );
}
