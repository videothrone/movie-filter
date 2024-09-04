import Link from "next/link";

export default function Header() {
  const currentYear = new Date().getFullYear();

  return (
    <header className="site-header">
      <h1 className="h3 site-header__title">
        🎞️
        <Link
          href="/"
          className="site-header__link"
        >{`Filme ${currentYear}`}</Link>
      </h1>
    </header>
  );
}
