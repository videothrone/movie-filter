import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Erweitert React HTMLAttributes um das 'xyz' Attribut für AnimXYZ
    xyz?: string;
  }
}

export type Movie = {
  forEach(arg0: (movie: any) => void): unknown;
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
  poster_path: string;
  vote_average?: number;
  overview: string;
  genres: { id: number; name: string }[];
  videos: Video[];
  release_dates: {
    results: ReleaseDate[];
  };
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type VideoResponse = {
  results: Video[];
};

export type MoviesResponse = {
  movies: Movie[];
  totalPages: number;
};

export type MovieWithGermanReleaseDate = MovieDetails & {
  germanReleaseDate?: string;
};

export type ReleaseDate = {
  certification: string;
  iso_3166_1: string;
  release_dates: {
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
  }[];
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

export type GenreList = {
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
