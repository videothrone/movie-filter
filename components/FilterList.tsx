import FilterLink from "./FilterLink";

export default function FilterList() {
  const sorting = [
    {
      id: 1,
      type: "sorting",
      filterName: "popularity",
      label: "Beliebteste",
      checked: true,
    },
    {
      id: 2,
      type: "sorting",
      filterName: "highest",
      label: "Höchste Bewertung",
      checked: false,
    },
    {
      id: 3,
      type: "sorting",
      filterName: "lowest",
      label: "Niedrigste Bewertung",
      checked: false,
    },
  ];

  const filters = [
    {
      id: 1,
      type: "filter",
      filterName: "released",
      label: "Bereits erschienen",
    },
    {
      id: 2,
      type: "filter",
      filterName: "upcoming",
      label: "Erscheint demnächst",
    },
    { id: 3, type: "filter", filterName: "action", label: "Action" },
    { id: 4, type: "filter", filterName: "horror", label: "Horror" },
    { id: 5, type: "filter", filterName: "scifi", label: "Sci-Fi" },
    { id: 6, type: "sorting", filterName: "/", label: "Zurücksetzen" },
  ];

  return (
    <div className="filter-list-wrapper">
      <h6 className="filter-list__title">Sortierung</h6>
      <ul className="filter-list filter-list--sorting">
        {sorting.map((sortingElem) => (
          <li key={sortingElem.id} className="filter-list__item">
            <FilterLink
              href={`?filter=${sortingElem.filterName}`}
              label={sortingElem.label}
              type={sortingElem.type}
              checked={sortingElem.checked}
            >
              {sortingElem.label}
            </FilterLink>
          </li>
        ))}
      </ul>
      <h6 className="filter-list__title">Filter</h6>
      <ul className="filter-list filter-list--filter">
        {filters.map((filter) => (
          <li key={filter.id} className="filter-list__item">
            <FilterLink
              href={`?filter=${filter.filterName}`}
              label={filter.label}
              type={filter.type}
            >
              {filter.label}
            </FilterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
