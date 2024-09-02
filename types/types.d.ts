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
  vote_average: number;
};

export type Movies = Movie[];