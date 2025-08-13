import { MusicPlayer, SpotifyEmbed } from "./Music.styled";

export const SpotifyPlayer = () => {
  return (
    <MusicPlayer>
      <h4>Spotify Playlist</h4>
      <SpotifyEmbed>
        <iframe
          src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </SpotifyEmbed>
    </MusicPlayer>
  );
};
