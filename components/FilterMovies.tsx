import { fetchApiData } from "@/lib/fetchApiData";
import FilterContent from "./FilterContent";

type Props = {};
export default async function FilterMovies({}: Props) {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const currentYear = 2024;

  try {
    const movies = await fetchApiData(currentYear, apiToken);

    return (
      <div className="filter-movies">
        <FilterContent movies={movies} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load movies.</div>;
  }
}
