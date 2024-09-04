import type { Movie } from "@/types/types";
import FilterContent from "./FilterContent";
import FilterList from "./FilterList";

export async function generateMetadata() {
  return {
    title: "2024 in Movies",
  };
}

type FilterMoviesProps = {
  movies: Movie[];
};

export default async function FilterMovies({ movies }: FilterMoviesProps) {
  return (
    <div className="filter-movies">
      <FilterList />
      <FilterContent movies={movies} />
    </div>
  );
}
