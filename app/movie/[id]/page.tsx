import { fetchMovieById } from "@/lib/fetchMovieById";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const movieId = params.id;
  const movie = (await fetchMovieById(movieId, apiToken)) as any;
  console.log("movie", movie);
  const roundedRating = Number(movie.vote_average.toFixed(1));

  // Überprüfe, ob die ID gültig ist
  if (!movieId || isNaN(parseInt(movieId))) {
    notFound();
  }

  return (
    <div>
      <h1>{movie.original_title}</h1>
      <a
        href={`https://www.imdb.com/title/${movie.imdb_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        IMDb
      </a>
      <p>{movie.release_date}</p>
      <p>
        <FaStar color="orange" /> {roundedRating}
      </p>
      <p>{movie.overview}</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={500}
      />
    </div>
  );
}