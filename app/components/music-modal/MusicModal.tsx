"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../redux/slices/navigationSlice";
import {
  CloseBtn,
  CustomUrlSection,
  HiddenRadio,
  Modal,
  ModalBody,
  ModalHeader,
  MusicControls,
  MusicOption,
  MusicOptions,
  OptionContent,
  OptionText,
  Overlay,
  RadioOption,
  UrlHelp,
  UrlInput,
} from "./Music.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";

import AudioLines from "lucide-react/dist/esm/icons/audio-lines";
import Link from "lucide-react/dist/esm/icons/link";
import VolumeOff from "lucide-react/dist/esm/icons/volume-off";
import X from "lucide-react/dist/esm/icons/x";
import { RootState } from "../../redux/store";
import {
  setCustomUrl,
  setHideModal,
  setMusicEnabled,
  setMusicModalOn,
  setMusicUrl,
  setSelectedOption,
} from "../../redux/slices/musicSlice";
import { CustomPlayer } from "./CustomPlayer";
import { useEffect } from "react";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { FocusTrap } from "focus-trap-react";
type LinkType = "youtube" | "spotify" | "vimeo" | "apple-music" | "unknown";

export const MusicModal = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const selectedOption = useSelector((state: RootState) => state.music.selectedOption);
  const customUrl = useSelector((state: RootState) => state.music.customUrl);
  const musicUrl = useSelector((state: RootState) => state.music.musicUrl);
  const musicEnabled = useSelector((state: RootState) => state.music.musicEnabled);
  const musicModalOn = useSelector((state: RootState) => state.music.musicModalOn);
  const hideModal = useSelector((state: RootState) => state.music.hideModal);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !musicModalOn) {
      dispatch(toggleModal({ target: "isMusicActive" }));
    } else if (e.target === e.currentTarget) {
      dispatch(setHideModal({ value: true }));
    }
  };

  const handleModalClose = () => {
    if (!musicModalOn) {
      dispatch(closeModal({ target: "isMusicActive" }));
    } else {
      dispatch(setHideModal({ value: true }));
      dispatch(closeModal({ target: "closeMusicModal" }));
    }
  };

  const handleOptionChange = (option: string) => {
    dispatch(setSelectedOption({ value: option }));

    if (option === "none") {
      dispatch(setMusicEnabled({ value: false }));
      dispatch(setMusicUrl({ value: "" }));
    } else {
      dispatch(setMusicEnabled({ value: true }));
      dispatch(setMusicModalOn({ value: true }));
    }
  };
  const handleCustomUrlChange = (e: React.ChangeEvent) => {
    const url = e.target;
    const { value } = url as HTMLInputElement;
    dispatch(setCustomUrl({ value: value }));
    if (selectedOption === "custom") {
      dispatch(setMusicUrl({ value: value }));
    }
    dispatch(setCustomUrl({ value: "" }));
  };

  const extractMediaId = (platform: string, url: string) => {
    switch (platform) {
      case "youtube": {
        return url.split("v=")[1].substring(0, 11);
      }
      case "spotify": {
        const match = url.match(/spotify\.com\/(?:track|playlist|album)\/([a-zA-Z0-9]+)(?:\?|$)/);
        return match[1];
      }

      case "vimeo": {
        const match = url.match(/vimeo\.com\/(\d+)(?:\?|$)/);
        return match[1];
      }

      case "apple-music": {
        const match = url.match(/music\.apple\.com\/[a-z]{2}\/playlist\/[^/]+\/(pl\.[\w]+)/);

        return match[1];
      }

      default:
        return null;
    }
  };

  const detectLinkType = (url: string): LinkType => {
    if (/youtu\.be\/|youtube\.com\/watch\?v=/.test(url)) return "youtube";
    if (/spotify\.com\/(track|playlist|album)\//.test(url)) return "spotify";
    if (/vimeo\.com\//.test(url)) return "vimeo";
    if (/music\.apple\.com\//.test(url)) return "apple-music";
    return "unknown";
  };
  const renderMusicPlayer = () => {
    if (selectedOption === "lofi") {
      return <SpotifyPlayer />;
    }
    if (!musicEnabled || !musicUrl) return null;

    if (selectedOption === "custom") {
      const linkType = detectLinkType(musicUrl);

      const id = extractMediaId(linkType, musicUrl);

      if (linkType) {
        return <CustomPlayer id={id} linkType={linkType} />;
      }
    }
  };
  return (
    // <FocusTrap>
    <Overlay onClick={handleOutsideClick} $hideModal={hideModal}>
      <Modal $hideModal={hideModal} $bgImage={isBackgroundActive} role="dialog" aria-labelledby="music-title">
        <ModalHeader>
          <h2 id="music-title">Music Settings</h2>
          <CloseBtn aria-label="Close" onClick={handleModalClose}>
            <X size={32} />
          </CloseBtn>
        </ModalHeader>

        <ModalBody>
          <h3>Choose Your Focus Music</h3>
          <MusicOptions $bgActive={isBackgroundActive}>
            <MusicOption $active={selectedOption === "none"}>
              <RadioOption>
                <HiddenRadio
                  type="radio"
                  name="musicOption"
                  checked={selectedOption === "none"}
                  onChange={() => handleOptionChange("none")}
                />
                <OptionContent>
                  <VolumeOff />
                  <OptionText>
                    <h4>No Music</h4>
                    <p>Focus in silence</p>
                  </OptionText>
                </OptionContent>
              </RadioOption>
            </MusicOption>

            <MusicOption $active={selectedOption === "lofi"}>
              <RadioOption>
                <HiddenRadio
                  type="radio"
                  name="musicOption"
                  checked={selectedOption === "lofi"}
                  onChange={() => handleOptionChange("lofi")}
                />
                <OptionContent>
                  <AudioLines />
                  <OptionText>
                    <h4>Lo-fi Music</h4>
                    <p>Curated chill beats for focus</p>
                  </OptionText>
                </OptionContent>
              </RadioOption>
            </MusicOption>

            <MusicOption $active={selectedOption === "custom"}>
              <RadioOption>
                <HiddenRadio
                  type="radio"
                  name="musicOption"
                  checked={selectedOption === "custom"}
                  onChange={() => handleOptionChange("custom")}
                />
                <OptionContent>
                  <Link />
                  <OptionText>
                    <h4>Custom Music</h4>
                    <p>Your own music URL</p>
                  </OptionText>
                </OptionContent>
              </RadioOption>
            </MusicOption>
          </MusicOptions>
          {selectedOption === "custom" && (
            <CustomUrlSection>
              <h3>Paste your music URL here</h3>
              <UrlInput
                type="url"
                value={customUrl}
                onChange={handleCustomUrlChange}
                placeholder="youtube.com/watch?v=..."
              />
              {musicUrl && <em>Your latest url: {musicUrl}</em>}
              <UrlHelp>
                <p>Supported platforms:</p>
                <ul>
                  <li>YouTube (youtube.com/watch?v=...)</li>
                  <li>Spotify (open.spotify.com/...)</li>
                  <li>Vimeo (vimeo.com/...)</li>
                  <li>Apple Music (music.apple.com/...)</li>
                </ul>
              </UrlHelp>
            </CustomUrlSection>
          )}
          {renderMusicPlayer()}

          <MusicControls>
            <p>Music volume can be controlled using your browser or system controls.</p>
            <p>For best focus, keep the volume at a comfortable background level.</p>
          </MusicControls>
        </ModalBody>
      </Modal>
    </Overlay>
  );
};
