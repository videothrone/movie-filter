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

  const roundedRating = Number(movie.vote_average.toFixed(1));

  return (
    <>
      <Link href={`/movie/${movie.id}`} className="filter-card">
        <h3 className="filter-card__title h6">{movie.title}</h3>
        {/* <p className="filter-card__overview">{movie.overview}</p> */}
        <Image
          src={fullImageUrl}
          alt={`${movie.title} Poster`}
          width={500}
          height={750}
          className="filter-card__image"
        />
        <p className="filter-card__rating">
          <FaStar color="orange" />
          {roundedRating}
        </p>
        <p className="filter-card__date">{movie.release_date}</p>
      </Link>
    </>
  );
}
