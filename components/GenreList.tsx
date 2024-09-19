type GenreList = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function GenreList({ movie }: any) {
  const genreApiReferences: { [key: string]: number } = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scifi: 878,
    tvmovie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
  };

  const genreIds = movie.genre_ids;
  const genreList = genreIds.map((id: number) => {
    const genreName = Object.keys(genreApiReferences).find(
      (key) => genreApiReferences[key] === id
    );
    return genreName;
  });

  return (
    <ul className="genre-list">
      <li className="genre-list__genre">{genreList.join(", ")}</li>
    </ul>
  );
}
