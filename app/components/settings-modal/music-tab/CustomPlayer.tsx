"use client";

import { MusicPlayer, SpotifyEmbed, YoutubeEmbed } from "./Music.styled";

export const CustomPlayer = ({ id, linkType }) => {
  return (
    <MusicPlayer>
      <h4>Now Playing</h4>
      {linkType === "youtube" ? (
        <YoutubeEmbed>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
            title="YouTube video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write;  gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </YoutubeEmbed>
      ) : linkType === "spotify" ? (
        <SpotifyEmbed>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
            title="Spotify Playlist"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media 'self' https://open.spotify.com; fullscreen; picture-in-picture; encrypted-media:robustness=SW_SECURE_CRYPTO"
            sandbox="allow-scripts allow-same-origin"
          />
        </SpotifyEmbed>
      ) : linkType === "vimeo" ? (
        <YoutubeEmbed>
          <iframe
            src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`}
            title="Vimeo video"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media:robustness=SW_SECURE_CRYPTO; fullscreen; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </YoutubeEmbed>
      ) : linkType === "apple-music" ? (
        <YoutubeEmbed>
          <iframe
            src={`https://embed.music.apple.com/us/playlist/lo-fi-chill/${id}`}
            title="Apple Music playlist"
            loading="lazy"
            allow="autoplay; encrypted-media"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </YoutubeEmbed>
      ) : null}
    </MusicPlayer>
  );
};
