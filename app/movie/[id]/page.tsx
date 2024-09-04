import { fetchMovieById } from "@/lib/fetchMovieById";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import type { MovieDetails } from "@/types/types";
import { translateDate } from "@/lib/helpers";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const movieId = params.id;
  const movie = (await fetchMovieById(movieId, apiToken)) as MovieDetails;
  console.log("movie", movie);
  const roundedRating = Number((movie.vote_average ?? 0).toFixed(1));
  const germanFormattedReleaseDate = translateDate(movie.release_date);

  if (!movieId || isNaN(parseInt(movieId))) {
    notFound();
  }

  return (
    <div className="movie-page">
      <h1>{movie.title}</h1>
      <div className="movie-page__basic-details">
        <p>{germanFormattedReleaseDate}</p>
        <p>
          <FaStar color="orange" /> {roundedRating}
        </p>
        <a
          href={`https://www.imdb.com/title/${movie.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          IMDb
        </a>
      </div>
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
