import FilterMovies from "@/components/FilterMovies";

export default function Home() {
  return (
    <main className="default-layout">
      <h1 className="h3 default-layout__title">2024 in Movies</h1>
      <FilterMovies />
    </main>
  );
}
