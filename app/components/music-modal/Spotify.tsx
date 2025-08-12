import { MusicLink, MusicPlayer } from "./Music.styled";

export const Spotify = () => {
  return (
    <MusicPlayer>
      <h4>Spotify Link</h4>
      <MusicLink
        href={"https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM"}
        target="_blank"
        rel="noopener noreferrer">
        Open in Spotify
      </MusicLink>
    </MusicPlayer>
  );
};
