# This Year In Movies

A multi-filter / sort interface using the [TMBD API](https://developer.themoviedb.org/reference/intro/getting-started) to display films of the current year, with dynamic detail pages and pagination. 

This project was initially my final project for a [Next.js](https://nextjs.org) / TypeScript Course at [CimData](https://www.cimdata.de/weiterbildung/mobile-app-entwicklung-full-stack-webentwicklung-next-js-und-typescript/) done in about 4 days and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app). The boilerplate behind it was provided, though I'll change and adjust the project incrementally to my liking as I work on it.

## Getting Started (locally)

- Get a free API-Key from https://api.themoviedb.org
- Clone the repo
- Add a `.env`. The correct format is:
```
NEXT_PUBLIC_TMDB_API_KEY=YourAPIKey
```

Install NPM packages:
```bash
npm i
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live
https://this-year-in-movies.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e7983ed-4de3-492b-a8c8-8704d7b6f4f1/deploy-status)](https://app.netlify.com/sites/this-year-in-movies/deploys)