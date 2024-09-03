export async function fetchMoviesByFilter(year: string, apiToken: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=release_date.desc&api_key=${apiToken}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
