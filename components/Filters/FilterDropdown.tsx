"use client";

import { useEffect, useRef, useState } from "react";
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Close dropdown when pressing the "Esc" key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`filter-dropdown ${isOpen ? "filter-dropdown--open" : ""}`}
      ref={dropdownRef}
    >
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
