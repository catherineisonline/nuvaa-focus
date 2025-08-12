"use client";

import { MusicPlayer, YoutubeEmbed } from "./Music.styled";

export const YouTube = ({ id }) => {
  return (
    <MusicPlayer>
      <h4>Now Playing</h4>
      <YoutubeEmbed>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </YoutubeEmbed>
    </MusicPlayer>
  );
};
