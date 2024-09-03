import { fetchApiData } from "@/lib/fetchApiData";
import FilterContent from "./FilterContent";
import FilterList from "./FilterList";

export async function generateMetadata() {
  return {
    title: "2024 in Movies",
  };
}

export default async function FilterMovies() {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const currentYear = new Date().getFullYear();

  try {
    const movies = await fetchApiData(currentYear, apiToken);

    return (
      <div className="filter-movies">
        <FilterList />
        <FilterContent movies={movies} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load movies.</div>;
  }
}
