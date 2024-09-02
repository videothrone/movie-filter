import type { Movie } from "@/types/types";
import FilterCard from "./FilterCard";

type Props = {
  movies: Movie[];
};

export default function FilterContent({ movies }: Props) {
  return (
    <div className="filter-content">
      {movies.map((movie) => (
        <FilterCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
