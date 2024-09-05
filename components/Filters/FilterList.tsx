"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterLink from "./FilterLink";
import { filtersData, sortingData } from "@/data/filterLinksData";

export default function FilterList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>("popularity");
  const [activeSorting, setActiveSorting] = useState<string>("popularity");

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

  const filters = filtersData;
  const sorting = sortingData;

  return (
    <div className="filter-list-wrapper">
      <h6 className="filter-list__title">Sortierung</h6>
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
      <h6 className="filter-list__title">Filter</h6>
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
