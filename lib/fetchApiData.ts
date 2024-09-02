export async function fetchApiData(year: number, apiToken: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&api_key=${apiToken}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as { results: any[] };
  return data.results;
}
