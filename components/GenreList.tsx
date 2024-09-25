import { genreApiReferences } from "@/data/genreApiReferences";

export default function GenreList({ movie }: any) {
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
