export async function fetchMovieById(movieId: string, apiToken: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiToken}&append_to_response=release_dates`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: any = await response.json();

  const germanReleaseDate = data.release_dates.results.find(
    (result: any) => result.iso_3166_1 === "DE"
  )?.release_dates[0]?.release_date;

  return { ...data, germanReleaseDate };
}
