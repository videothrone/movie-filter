import { fetchMovieById } from "@/lib/fetchMovieById";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import type { MovieWithGermanReleaseDate } from "@/types/types";
import { translateDate } from "@/lib/helpers";
import type { Metadata } from "next/types";
import YouTubeTrailer from "@/components/YouTubeTrailer";

type MoviePageProps = {
  params: { id: string };
};

export default async function MoviePage({ params }: MoviePageProps) {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const movieId = params.id;
  const movie = (await fetchMovieById(
    movieId,
    apiToken
  )) as MovieWithGermanReleaseDate;

  const roundedRating = Number((movie.vote_average ?? 0).toFixed(1));
  const germanFormattedReleaseDate = translateDate(
    movie.germanReleaseDate as string
  );

  const firstTrailer = movie.videos.find((video) => video.type === "Trailer");

  if (!movieId || isNaN(parseInt(movieId))) {
    notFound();
  }

  return (
    <div className="movie-page">
      <h1 className="movie-page__title">{movie.title}</h1>
      <ul className="movie-page__genre-list">
        {movie.genres.map((genre) => (
          <li key={genre.id} className="movie-page__genre">
            {genre.name}
          </li>
        ))}
      </ul>
      <div className="movie-page__content">
        <div className="movie-page__image-wrapper">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={700}
            className="movie-page__image"
          />
          <div className="movie-page__basic-details">
            <p>{germanFormattedReleaseDate}</p>
            <span>
              <strong>|</strong>
            </span>
            <p>
              <FaStar color="orange" /> {roundedRating}
            </p>
            <span>
              <strong>|</strong>
            </span>
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDb
            </a>
          </div>
        </div>
        <div className="movie-page__overview">
          <h2 className="movie-page__overview-title h5">Beschreibung:</h2>
          <p className="movie-page__overview-text">{movie.overview}</p>
          {firstTrailer && <YouTubeTrailer video={firstTrailer} />}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const apiToken = process.env.NEXT_PUBLIC_TMDB_API_KEY as string;
  const movieId = params.id;
  const movie = (await fetchMovieById(
    movieId,
    apiToken
  )) as MovieWithGermanReleaseDate;

  return {
    title: movie.title,
  };
}
