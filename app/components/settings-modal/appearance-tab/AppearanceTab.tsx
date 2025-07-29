"use client";
import { useDispatch, useSelector } from "react-redux";
import { themes } from "../../../styles/themes";
import {
  removeBackground,
  removeCustomBackground,
  setCurrentBackground,
  setCurrentCustomBackground,
  setCurrentTheme,
} from "../../../redux/slices/appearanceSlice";
import { RootState } from "../../../redux/store";
import {
  BackgroundGrid,
  BackgroundOption,
  FileUploadInput,
  FileUploadSection,
  RemoveBackgroundButton,
  RemoveCurrentBackground,
  SectionHeading,
  SettingGroup,
  SettingsContent,
  SingleBackground,
  ThemeGrid,
  ThemeLabel,
  ThemeOption,
} from "./Appearance.styled";
import Image, { StaticImageData } from "next/image";
import { Upload, X } from "lucide-react";

import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from "../../../lib/constants";
export const AppearanceTab = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(
    (state: RootState) => state.appearance.currentTheme
  );
  const currentBackground = useSelector(
    (state: RootState) => state.appearance.currentBackground
  );
  const backgrounds = useSelector(
    (state: RootState) => state.appearance.backgrounds
  );
  const customBackgrounds = useSelector(
    (state: RootState) => state.appearance.customBackgrounds
  );
  const handleThemeChange = (name: string) => {
    dispatch(setCurrentTheme({ name: name }));
  };
  const handleImageChange = (
    image: string | StaticImageData,
    action: string
  ) => {
    if (action === "predefined") {
      dispatch(setCurrentBackground({ image: image }));
    } else if (action === "custom") {
      dispatch(setCurrentCustomBackground({ image: image }));
    }
  };
  const handleBackgroundRemoval = () => {
    dispatch(removeBackground());
  };
  const handleCustomBackground = (src: string) => {
    dispatch(removeCustomBackground({ src: src }));
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE_BYTES) {
      // ! note: add custom modals
      alert(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    if (customBackgrounds.length === 6) {
      alert(`Too many uploads. Max allowed is 6 custom images.`);
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const fileReader = event.target.result;
        dispatch(setCurrentCustomBackground({ image: fileReader }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <SettingsContent>
      <SettingGroup>
        <SectionHeading>Color Themes</SectionHeading>
        <ThemeGrid>
          {Object.values(themes).map((theme) => (
            <ThemeOption
              type="button"
              key={theme.name}
              aria-label={`Select theme ${theme.name}`}
              $active={currentTheme === theme.name}
              $colorBackground={theme.backgroundGradientTimer}
              $colorBorder={theme.highlight}
              onClick={() => handleThemeChange(theme.name)}>
              <ThemeLabel>{theme.name.toUpperCase()}</ThemeLabel>
            </ThemeOption>
          ))}
        </ThemeGrid>
      </SettingGroup>
      <SettingGroup>
        <SectionHeading>Background Images</SectionHeading>
        <BackgroundGrid>
          {backgrounds.map((bg, index) => (
            <BackgroundOption
              $isActive={currentBackground === bg}
              type="button"
              aria-label="Select background"
              key={bg}
              onClick={() => handleImageChange(bg, "predefined")}>
              <Image
                src={bg}
                alt={`Background ${index + 1}`}
                width={300}
                height={300}
              />
            </BackgroundOption>
          ))}
        </BackgroundGrid>
      </SettingGroup>
      {customBackgrounds.length > 0 && (
        <SettingGroup>
          <SectionHeading>Custom Backgrounds</SectionHeading>
          <BackgroundGrid>
            {customBackgrounds.map((bg, index) => (
              <SingleBackground key={bg}>
                <BackgroundOption
                  $isActive={currentBackground === bg}
                  type="button"
                  aria-label="Select background"
                  onClick={() => handleImageChange(bg, "custom")}>
                  <Image
                    src={bg}
                    alt={`Background ${index + 1}`}
                    width={300}
                    height={300}
                  />
                </BackgroundOption>
                <RemoveBackgroundButton aria-label="Remove this background">
                  <X onClick={() => handleCustomBackground(bg)} />
                </RemoveBackgroundButton>
              </SingleBackground>
            ))}
          </BackgroundGrid>
        </SettingGroup>
      )}
      <SettingGroup>
        {currentBackground && (
          <RemoveCurrentBackground
            onClick={handleBackgroundRemoval}
            aria-label="Remove current background">
            Remove current background <X />
          </RemoveCurrentBackground>
        )}
      </SettingGroup>
      <SettingGroup>
        <SectionHeading>Set custom background</SectionHeading>
        <FileUploadSection>
          <label htmlFor="background-upload">
            <span>
              Browse files to upload <Upload size={15} />
            </span>
            <br />
            <small>
              JPG, PNG, WEBP, HEIC
              <br />
              (max 2MB, max 1024px)
            </small>
          </label>
          <FileUploadInput
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            id="background-upload"
          />
        </FileUploadSection>
      </SettingGroup>
    </SettingsContent>
  );
};
