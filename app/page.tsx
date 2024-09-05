import FilterMovies from "@/components/FilterMovies";
import Pagination from "@/components/Pagination";
import { fetchApiData } from "@/lib/fetchApiData";
import {
  fetchMoviesByGenre,
  fetchMoviesByHighestRating,
  fetchMoviesByUpcomingDate,
} from "@/lib/fetchMoviesByFilter";
import type { Movie, MoviesResponse } from "@/types/types";
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
  const currentDate = new Date().toISOString();
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  /* let movies = await fetchApiData(currentYear, apiToken); */
  let moviesData: MoviesResponse;
  let movies: Movie[] = [];
  let totalPages = 1;

  /* const validGenres = new Set(["action", "horror", "scifi"]);
  const isValidGenre = validGenres.has(searchParams.get("filter")); */

  console.log("searchParams", searchParams);

  if (searchParams.filter === "upcoming") {
    moviesData = (await fetchMoviesByUpcomingDate(
      currentYear,
      currentDate,
      apiToken,
      currentPage
    )) as MoviesResponse;
  } else if (searchParams.filter === "highest") {
    moviesData = (await fetchMoviesByHighestRating(
      currentYear,
      apiToken,
      currentPage
    )) as MoviesResponse;
  } else if (
    searchParams.filter === "action" ||
    searchParams.filter === "horror" ||
    searchParams.filter === "scifi"
  ) {
    moviesData = (await fetchMoviesByGenre(
      currentYear,
      searchParams.filter,
      apiToken,
      currentPage
    )) as MoviesResponse;
  } else {
    moviesData = await fetchApiData(currentYear, apiToken, currentPage);
  }

  movies = moviesData.movies;
  totalPages = moviesData.totalPages;

  return (
    <main className="default-layout">
      <FilterMovies movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
