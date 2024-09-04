import type { Movie, MoviesResponse } from "@/types/types";

export async function fetchMoviesByUpcomingDate(
  year: number,
  currentDate: string,
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
  // Formate date to (YYYY-MM-DD)
  const formattedDate = currentDate.split("T")[0];

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?region=DE&primary_release_date.gte=${formattedDate}&primary_release_year=${year}&api_key=${apiToken}&page=${page}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as {
    results: any[];
    total_pages: number;
  };

  // Check is there no results
  if (data.results.length === 0) {
    return {
      movies: [],
      totalPages: 0,
    };
  }

  return {
    movies: data.results as Movie[],
    totalPages: data.total_pages,
  };
}

type Genre = "action" | "horror" | "scifi";

export async function fetchMoviesByGenre(
  year: number,
  genre: Genre,
  apiToken: string,
  page: number = 1
) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const genreApiReferences = {
    action: 28,
    horror: 27,
    scifi: 878,
  };

  let genreInApiFormat = "";

  if (genre in genreApiReferences) {
    const genreAsNumber =
      genreApiReferences[genre as keyof typeof genreApiReferences];

    genreInApiFormat = genreAsNumber.toString();
  } else {
    console.log(`Genre "${genre}" does not exist in genreApiReferences.`);
    return;
  }

  /* console.log("year", year, "genre", genreInApiFormat, "apiToken", apiToken); */

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?region=DE&primary_release_year=${year}&with_genres=${genreInApiFormat}&api_key=${apiToken}&page=${page}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as {
    results: any[];
    total_pages: number;
  };

  // Check is there no results
  if (data.results.length === 0) {
    return {
      movies: [],
      totalPages: 0,
    };
  }

  return {
    movies: data.results as Movie[],
    totalPages: data.total_pages,
  };
}

export async function fetchMoviesByHighestRating(
  year: number,
  apiToken: string,
  page: number = 1
) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?region=DE&primary_release_year=${year}&sort_by=vote_average.desc&api_key=${apiToken}&page=${page}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as {
    results: any[];
    total_pages: number;
  };

  // Check is there no results
  if (data.results.length === 0) {
    return {
      movies: [],
      totalPages: 0,
    };
  }

  return {
    movies: data.results as Movie[],
    totalPages: data.total_pages,
  };
}
