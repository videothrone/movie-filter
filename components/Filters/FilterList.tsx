"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterLink from "./FilterLink";
import {
  filtersData,
  sortingData,
  filtersDataGenres,
} from "@/data/filterLinksData";
import { FaFilter, FaSort } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

export default function FilterList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>("popularity");
  const [activeSorting, setActiveSorting] = useState<string>("popularity");
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      const filters = filterParam.split(",");
      setSelectedFilters(
        filters.filter(
          (f) => f !== "popularity" && f !== "highest" && f !== "lowest"
        )
      );
      const sorting = filters.find(
        (f) => f === "popularity" || f === "highest" || f === "lowest"
      );
      if (sorting) setSelectedSorting(sorting);
    }
  }, [searchParams]);

  useEffect(() => {
    const defaultSorting =
      sorting.find((s) => s.checked)?.filterName || "popularity";
    setActiveSorting(defaultSorting);
  }, []);

  const handleFilterChange = (filterName: string) => {
    let newFilters: string[];
    if (selectedFilters.includes(filterName)) {
      newFilters = selectedFilters.filter((f) => f !== filterName);
    } else {
      newFilters = [...selectedFilters, filterName];
    }
    updateURL(newFilters, selectedSorting);
  };

  const handleSortingChange = (sortingName: string) => {
    setActiveSorting(sortingName);
    setSelectedSorting(sortingName);
    updateURL(selectedFilters, sortingName);
  };

  const updateURL = (filters: string[], sorting: string) => {
    const newParams = new URLSearchParams();
    const allFilters = [...filters, sorting].filter(Boolean);
    if (allFilters.length > 0) {
      newParams.set("filter", allFilters.join(","));
    }
    router.push(`?${newParams.toString()}`);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setActiveSorting("popularity");
    setSelectedSorting("popularity");
    router.push("/");
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  const filters = filtersData;
  const sorting = sortingData;
  const genreFilters = filtersDataGenres;

  return (
    <div className="filter-list-wrapper">
      <h6 className="filter-list__title">
        <FaSort />
        Sortierung
      </h6>
      <ul className="filter-list filter-list--sorting">
        {sorting.map((sortingElem) => (
          <li key={sortingElem.id} className="filter-list__item">
            <FilterLink
              href="#"
              label={sortingElem.label}
              type={sortingElem.type}
              checked={activeSorting === sortingElem.filterName}
              disabled={sortingElem.disabled}
              onClick={() => handleSortingChange(sortingElem.filterName)}
              groupName="sorting"
              onActivate={() => {}}
            >
              {sortingElem.label}
            </FilterLink>
          </li>
        ))}
      </ul>
      <h6 className="filter-list__title">
        <FaFilter style={{ fontSize: "1rem" }} />
        Filter
      </h6>
      <div className="filter-list__wrapper"></div>
      <ul className="filter-list filter-list--filter">
        {filters
          .filter((filter) => filter.filterName !== "/")
          .map((filter) => (
            <li key={filter.id} className="filter-list__item">
              <FilterLink
                href="#"
                label={filter.label}
                type={filter.type}
                checked={selectedFilters.includes(filter.filterName)}
                disabled={filter.disabled}
                onClick={() => handleFilterChange(filter.filterName)}
                groupName="filter"
                onActivate={() => {}}
              >
                {filter.label}
              </FilterLink>
            </li>
          ))}
      </ul>
      <div className="filter-list filter-list__section--genre">
        <button
          className="filter-list__dropdown-toggle filter-link"
          onClick={toggleGenreDropdown}
          aria-expanded={isGenreDropdownOpen}
          aria-controls="genre-dropdown"
        >
          <FaListCheck style={{ fontSize: "1rem" }} /> Genres
        </button>
        <ul
          id="genre-dropdown"
          className={`filter-list__dropdown ${
            isGenreDropdownOpen ? "filter-list__dropdown--open" : ""
          }`}
        >
          {genreFilters
            .filter((filter) => filter.filterName !== "/")
            .map((filter) => (
              <FilterLink
                key={filter.filterName}
                href="#"
                label={filter.label}
                type={filter.type}
                checked={selectedFilters.includes(filter.filterName)}
                disabled={filter.disabled}
                onClick={() => handleFilterChange(filter.filterName)}
                groupName="filter"
                onActivate={() => {}}
              >
                {filter.label}
              </FilterLink>
            ))}
        </ul>
      </div>
      <div className="filter-list__reset">
        <FilterLink
          href="#"
          label="Zurücksetzen"
          type="sorting"
          disabled={false}
          onClick={resetFilters}
          groupName="filter"
          onActivate={() => {}}
        >
          Zurücksetzen
        </FilterLink>
      </div>
    </div>
  );
}
