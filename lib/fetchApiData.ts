import type { Movie, MoviesResponse } from "@/types/types";

export async function fetchApiData(
  year: number,
  apiToken: string,
  page: number = 1
): Promise<MoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?region=DE&primary_release_year=${year}&api_key=${apiToken}&page=${page}&vote_count.gte=30&with_external_ids=true&with_runtime.gte=70&with_critic_reviews=true`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as {
    results: unknown[];
    total_pages: number;
  };

  return {
    movies: data.results as Movie[],
    totalPages: data.total_pages,
  };
}
