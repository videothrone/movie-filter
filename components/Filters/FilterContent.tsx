import type { Movie } from "@/types/types";
import FilterCard from "./FilterCard";

type FilterContentProps = {
  movies: Movie[];
};

export default function FilterContent({ movies }: FilterContentProps) {
  return (
    <div className="filter-content">
      {movies.map((movie) => (
        <FilterCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
