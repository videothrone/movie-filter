import type { Video } from "@/types/types";

type YouTubeTrailerProps = {
  video: Video;
};

export default function YouTubeTrailer({ video }: YouTubeTrailerProps) {
  return (
    <div className="movie-page__trailer">
      <h2 className="movie-page__trailer-title h5">Trailer:</h2>
      <iframe
        width="640"
        height="390"
        src={`https://www.youtube.com/embed/${video.key}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Trailer"
      ></iframe>
    </div>
  );
}
