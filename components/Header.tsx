import Link from "next/link";

export default function Header() {
  const currentYear = new Date().getFullYear();

  return (
    <header className="site-header">
      <h1 className="h3 site-header__title">
        <span className="site-header__logo">🎞️</span>
        <Link href="/" className="site-header__link">
          Das Jahr <span className="site-header__year">{currentYear}</span> in
          Filmen
        </Link>
      </h1>
    </header>
  );
}
