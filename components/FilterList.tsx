import FilterLink from "./FilterLink";

export default function FilterList() {
  const filters = [
    { id: 1, filterName: "upcoming", label: "Demnächst" },
    { id: 2, filterName: "highest", label: "Höchste Bewertung" },
    { id: 3, filterName: "action", label: "Action" },
    { id: 4, filterName: "horror", label: "Horror" },
    { id: 5, filterName: "scifi", label: "Sci-Fi" },
    { id: 6, filterName: "/", label: "Zurücksetzen" },
  ];

  return (
    <ul className="filter-list">
      {filters.map((filter) => (
        <li key={filter.id} className="filter-list__item">
          <FilterLink
            href={`?filter=${filter.filterName}`}
            label={filter.label}
          >
            {filter.label}
          </FilterLink>
        </li>
      ))}
    </ul>
  );
}
