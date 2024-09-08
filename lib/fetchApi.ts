import type {
  FilterOptions,
  Movie,
  MoviesResponse,
  TMDBResponse,
} from "@/types/types";

export async function fetchMovies({
  year,
  genres,
  upcoming,
  sortBy,
  apiToken,
  page = 1,
  region = "DE",
}: FilterOptions): Promise<MoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiToken}&page=${page}&region=${region}&with_external_ids=true&with_runtime.gte=70`;

  if (!upcoming) {
    url += "&vote_count.gte=50&with_critic_reviews=true";
  }

  if (genres && genres.length > 0) {
    const genreApiReferences: { [key: string]: number } = {
      action: 28,
      horror: 27,
      scifi: 878,
      thriller: 53,
      comedy: 35,
      drama: 18,
      family: 10751,
    };
    const genreIds = genres
      .map((genre) => genreApiReferences[genre] || "")
      .filter(Boolean);
    if (genreIds.length > 0) {
      url += `&with_genres=${genreIds.join(",")}`;
    }
  }

  if (upcoming) {
    const currentDate = new Date().toISOString().split("T")[0];
    url += `&primary_release_date.gte=${currentDate}`;
  } else {
    url += `&primary_release_year=${year}`;
  }

  if (sortBy) {
    const sortOrder = sortBy === "release_date" ? "asc" : "desc";
    url += `&sort_by=${sortBy}.${sortOrder}`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as TMDBResponse;

  return {
    movies: data.results as Movie[],
    totalPages: data.total_pages,
  };
}
