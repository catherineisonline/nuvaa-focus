import { MusicPlayer, SpotifyEmbed } from "./Music.styled";

export const SpotifyPlayer = () => {
  return (
    <MusicPlayer>
      <h4>Spotify Playlist</h4>
      <SpotifyEmbed>
        <iframe
          src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
          title="Spotify Playlist"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media 'self' https://open.spotify.com; fullscreen; picture-in-picture; "
          sandbox="allow-scripts allow-same-origin"
        />
      </SpotifyEmbed>
    </MusicPlayer>
  );
};
