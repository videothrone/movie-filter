import FilterMovies from "@/components/Filters/FilterMovies";
import Pagination from "@/components/Pagination";
import { fetchMovies } from "@/lib/fetchApi";
import type { Movie, FilterOptions } from "@/types/types";
import type { Metadata } from "next";

const currentYear = new Date().getFullYear();
export const metadata: Metadata = {
  title: `Das Jahr ${currentYear} in Filmen`,
};

export default async function Home({
  searchParams,
}: {
  searchParams: { filter?: string; page?: string };
}) {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  let movies: Movie[] = [];
  let totalPages = 1;
  const filterOptions: FilterOptions = {
    year: currentYear,
    apiToken,
    page: currentPage,
  };

  console.log("searchParams", searchParams);

  if (searchParams.filter) {
    const filters = searchParams.filter.split(",");

    if (filters.includes("upcoming")) {
      filterOptions.upcoming = true;
    }

    if (filters.includes("highest")) {
      filterOptions.sortBy = "vote_average";
    }

    const genres = filters.filter((genreElem) =>
      ["action", "horror", "scifi"].includes(genreElem)
    );

    if (genres.length > 0) {
      filterOptions.genres = genres;
    }
  }

  const moviesData = await fetchMovies(filterOptions);
  movies = moviesData.movies;
  totalPages = moviesData.totalPages;

  return (
    <main className="default-layout">
      <FilterMovies movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
