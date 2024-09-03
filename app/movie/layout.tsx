import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  children: ReactNode;
};
export default function MovieLayout({ children }: Props) {
  return (
    <div className="movie-layout">
      <div className="movie-layout__back-wrapper">
        <Link href="/" className="movie-layout__back">
          <FaArrowLeft />
          Back to main page
        </Link>
      </div>
      {children}
    </div>
  );
}
