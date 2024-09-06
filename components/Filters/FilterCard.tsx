import { translateDate } from "@/lib/helpers";
import type { Movie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

type FilterCardProps = {
  movie: Movie;
};

export default function FilterCard({ movie }: FilterCardProps) {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const fullImageUrl = `${baseImageUrl}${movie.poster_path}`;

  const roundedRating = Number((movie.vote_average ?? 0).toFixed(1));

  const germanFormattedReleaseDate = translateDate(movie.release_date);

  return (
    <div className="filter-card">
      <Link href={`/movie/${movie.id}`} className="filter-card__link">
        <h3 className="filter-card__title visually-hidden">{movie.title}</h3>
      </Link>
      <Image
        src={fullImageUrl}
        alt={`${movie.title} Poster`}
        width={500}
        height={750}
        className="filter-card__image"
      />
      {movie.vote_average === 0 ? (
        <p className="filter-card__rating">
          <FaStar color="orange" />
          <span>N/A</span>
        </p>
      ) : (
        <p className="filter-card__rating">
          <FaStar color="orange" />
          <span>{roundedRating}</span>
        </p>
      )}
      <p className="filter-card__date">{germanFormattedReleaseDate}</p>
    </div>
  );
}