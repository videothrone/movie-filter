import FilterLink from "./FilterLink";

export default function FilterList() {
  const currentYear = new Date().getFullYear();

  const filters = [
    { id: 1, label: `Upcoming ${currentYear}` },
    { id: 2, label: "Genre Action" },
    { id: 3, label: "Filter 3" },
  ];

  return (
    <ul className="filter-list">
      {filters.map((filter) => (
        <li key={filter.id} className="filter-list__item">
          <FilterLink
            href={
              filter.id === 1
                ? `/filter/${currentYear}`
                : `/filter/${filter.id}`
            }
          >
            {filter.label}
          </FilterLink>
        </li>
      ))}
    </ul>
  );
}
