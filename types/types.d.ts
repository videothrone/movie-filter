import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Erweitert React HTMLAttributes um das 'xyz' Attribut für AnimXYZ
    xyz?: string;
  }
}

export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average?: number;
};

export type MovieDetails = {
  title: string;
  imdb_id: string;
  release_date: string;
  poster_path: string;
  vote_average?: number;
  overview: string;
};

export type MoviesResponse = {
  movies: Movie[];
  totalPages: number;
};

export type MovieWithGermanReleaseDate = MoviesResponse & {
  germanReleaseDate?: string;
};

export type TMDBResponse = {
  results: Movie[];
  total_pages: number;
};

export type FilterOptions = {
  year: number;
  genres?: string[];
  upcoming?: boolean;
  sortBy?: "popularity" | "vote_average" | "release_date";
  apiToken: string;
  page?: number;
  region?: string;
};
