import type {
  MovieDetails,
  MovieWithGermanReleaseDate,
  ReleaseDate,
  VideoResponse,
} from "@/types/types";

export async function fetchMovieById(
  movieId: string,
  apiToken: string
): Promise<MovieWithGermanReleaseDate> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiToken}&append_to_response=release_dates&with_runtime.gte=70`,
    options
  );

  if (!movieResponse.ok) {
    throw new Error("Failed to fetch movie data");
  }

  const movieData = (await movieResponse.json()) as MovieDetails;

  const videoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiToken}`,
    options
  );

  if (!videoResponse.ok) {
    throw new Error("Failed to fetch video data");
  }

  const videoData = (await videoResponse.json()) as VideoResponse;

  const germanReleaseDate: string | undefined =
    movieData.release_dates.results.find(
      (result: ReleaseDate) => result.iso_3166_1 === "DE"
    )?.release_dates[0]?.release_date;

  return { ...movieData, videos: videoData.results, germanReleaseDate };
}
