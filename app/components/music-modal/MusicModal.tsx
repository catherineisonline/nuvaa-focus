"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeModal, toggleModal } from "../../redux/slices/navigationSlice";
import {
  CloseBtn,
  CustomUrlSection,
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
import { AudioLines, Link, VolumeOff, X } from "lucide-react";
import { RootState } from "../../redux/store";
import {
  setCustomUrl,
  setHideModal,
  setMusicEnabled,
  setMusicModalOn,
  setMusicUrl,
  setSelectedOption,
} from "../../redux/slices/musicSlice";
import { YouTube } from "./Youtube";
import { useEffect } from "react";
import { SpotifyPlayer } from "./SpotifyPlayer";

const MusicModal = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const selectedOption = useSelector(
    (state: RootState) => state.music.selectedOption
  );
  const customUrl = useSelector((state: RootState) => state.music.customUrl);
  const musicUrl = useSelector((state: RootState) => state.music.musicUrl);
  const musicEnabled = useSelector(
    (state: RootState) => state.music.musicEnabled
  );
  const musicModalOn = useSelector(
    (state: RootState) => state.music.musicModalOn
  );
  const hideModal = useSelector((state: RootState) => state.music.hideModal);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !musicModalOn) {
      dispatch(toggleModal({ target: "isMusicActive" }));
    } else if (e.target === e.currentTarget) {
      dispatch(setHideModal({ value: true }));
    }
  };

  useEffect(() => {
    console.log(musicModalOn, hideModal);
  }, [musicModalOn, hideModal]);
  
  const handleModalClose = () => {
    // e.stopPropagation();
    if (!musicModalOn) {
      dispatch(closeModal({ target: "isMusicActive" }));
    } else {
      dispatch(setHideModal({ value: true }));
    }
  };

  const handleOptionChange = (option: string) => {
    dispatch(setSelectedOption({ value: option }));

    if (option === "none") {
      dispatch(setMusicEnabled({ value: false }));
      dispatch(setMusicUrl({ value: "" }));
    } else if (option === "lofi") {
      dispatch(setMusicEnabled({ value: true }));
      dispatch(setMusicModalOn({ value: true }));
      dispatch(
        setMusicUrl({
          value:
            "https://www.youtube.com/embed/sF80I-TQiW0?si=XA9_ukuvimAQtqE3",
        })
      );
    } else if (option === "custom") {
      dispatch(setMusicEnabled({ value: true }));
      dispatch(setMusicUrl({ value: customUrl }));
    }
  };
  const handleCustomUrlChange = (e: React.ChangeEvent) => {
    const url = e.target;
    const { value } = url as HTMLInputElement;
    dispatch(setCustomUrl({ value: value }));
    if (selectedOption === "custom") {
      dispatch(setMusicUrl({ value: value }));
    }
  };

  const extractYouTubeId = (url: string) => {
    return url.split("v=")[1].substring(0, 11);
  };
  // useEffect(() => {
  //   if (selectedOption === "lofi") {
  //     dispatch(setMusicModalOn({ value: true }));
  //   }
  // }, [selectedOption, dispatch]);

  const renderMusicPlayer = () => {
    if (!musicEnabled || !musicUrl) return null;
    if (selectedOption === "custom") {
      const youtubeId = extractYouTubeId(musicUrl);
      if (youtubeId) {
        return <YouTube id={youtubeId} />;
      }
    } else {
      return <SpotifyPlayer />;
    }
  };
  return (
    <Overlay onClick={handleOutsideClick} $hideModal={hideModal}>
      <Modal
        $hideModal={hideModal}
        $bgImage={isBackgroundActive}
        role="dialog"
        aria-labelledby="music-title">
        <ModalHeader>
          <h2 id="music-title">Music Settings</h2>
          <CloseBtn aria-label="Close" onClick={handleModalClose}>
            <X size={32} />
          </CloseBtn>
        </ModalHeader>

        <ModalBody>
          <MusicOptions>
            <h3>Choose Your Focus Music</h3>

            <MusicOption>
              <RadioOption>
                <input
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

            <MusicOption>
              <RadioOption>
                <input
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

            <MusicOption>
              <RadioOption>
                <input
                  type="radio"
                  name="musicOption"
                  checked={selectedOption === "custom"}
                  onChange={() => handleOptionChange("custom")}
                />
                <OptionContent>
                  <Link />
                  <OptionText>
                    <h4>Custom Link</h4>
                    <p>Your own music URL</p>
                  </OptionText>
                </OptionContent>
              </RadioOption>
            </MusicOption>

            {selectedOption === "custom" && (
              <CustomUrlSection>
                <UrlInput
                  type="url"
                  value={customUrl}
                  onChange={handleCustomUrlChange}
                  placeholder="Paste your music URL here..."
                />
                <UrlHelp>
                  <p>Supported platforms:</p>
                  <ul>
                    <li>YouTube (youtube.com/watch?v=...)</li>
                    <li>Spotify (open.spotify.com/...)</li>
                    <li>Direct audio files (.mp3, .wav, etc.)</li>
                  </ul>
                </UrlHelp>
              </CustomUrlSection>
            )}
          </MusicOptions>

          {renderMusicPlayer()}

          <MusicControls>
            <p>
              Music volume can be controlled using your browser or system
              controls.
            </p>
            <p>
              For best focus, keep the volume at a comfortable background level.
            </p>
          </MusicControls>
        </ModalBody>
      </Modal>
    </Overlay>
  );
};

export default MusicModal;
