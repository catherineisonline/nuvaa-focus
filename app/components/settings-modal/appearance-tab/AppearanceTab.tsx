"use client";
import { useDispatch, useSelector } from "react-redux";
import { themeMeta } from "../../../styles/themes/themesMeta";
import {
  removeBackground,
  removeCustomBackground,
  setBackgroundBlur,
  setBackgroundDim,
  setCurrentBackground,
  setCurrentCustomBackground,
  setCurrentTheme,
} from "../../../redux/slices/appearanceSlice";
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
  Slider,
  SliderContainer,
  SliderDim,
  SliderValue,
  ThemeGrid,
  ThemeLabel,
  ThemeOption,
} from "./Appearance.styled";
import Image, { StaticImageData } from "next/image";

import X from "lucide-react/dist/esm/icons/x";
import Upload from "lucide-react/dist/esm/icons/upload";

import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from "../../../lib/constants";
import { appearanceSelectors } from "../../../redux/selectors/appearanceSelectors";
export const AppearanceTab = () => {
  const dispatch = useDispatch();

  const { currentTheme, currentBackground, backgroundBlur, backgroundDim, customBackgrounds, backgrounds } =
    useSelector(appearanceSelectors);

  const handleThemeChange = (name: string) => {
    localStorage.setItem("theme", name);
    dispatch(setCurrentTheme(name));
  };
  const handleImageChange = (image: string | StaticImageData, action: string) => {
    if (action === "predefined") {
      dispatch(setCurrentBackground(image));
    } else if (action === "custom") {
      dispatch(setCurrentCustomBackground(image));
    }
  };
  const handleBackgroundRemoval = () => {
    dispatch(removeBackground());
  };
  const handleCustomBackground = (src: string | StaticImageData) => {
    dispatch(removeCustomBackground(src));
  };
  const handleBackgroundBlur = (value: number) => {
    dispatch(setBackgroundBlur(value));
  };
  const handleBackgroundDim = (value: number) => {
    dispatch(setBackgroundDim(value));
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
        const result = event.target?.result;
        if (typeof result === "string") {
          dispatch(setCurrentCustomBackground(result));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <SettingsContent>
      <SettingGroup>
        <SectionHeading>Solid Themes</SectionHeading>
        <ThemeGrid>
          {themeMeta.map((theme) => (
            <ThemeOption
              type="button"
              key={theme.name}
              aria-label={`Select theme ${theme.name}`}
              $active={currentTheme === theme.name}
              $colorBorder={theme.highlight}
              onClick={() => handleThemeChange(theme.name)}>
              <ThemeLabel $colorBackground={theme.backgroundGradientTimer}>{theme.name}</ThemeLabel>
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
              key={`${bg}-${index}`}
              onClick={() => handleImageChange(bg, "predefined")}>
              <Image src={bg} alt={`Background ${index + 1}`} width={300} height={300} />
            </BackgroundOption>
          ))}
        </BackgroundGrid>
      </SettingGroup>
      {customBackgrounds.length > 0 && (
        <SettingGroup>
          <SectionHeading>Custom Backgrounds</SectionHeading>
          <BackgroundGrid>
            {customBackgrounds.map((bg, index) => (
              <SingleBackground key={`${bg}-${index}`}>
                <BackgroundOption
                  $isActive={currentBackground === bg}
                  type="button"
                  aria-label="Select background"
                  onClick={() => handleImageChange(bg, "custom")}>
                  <Image src={bg} alt={`Background ${index + 1}`} width={300} height={300} />
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
          <RemoveCurrentBackground onClick={handleBackgroundRemoval} aria-label="Remove current background">
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
          <FileUploadInput type="file" accept="image/*" onChange={handleBackgroundUpload} id="background-upload" />
        </FileUploadSection>
      </SettingGroup>
      <SettingGroup>
        <SectionHeading>Background Blur</SectionHeading>
        <SliderContainer>
          <Slider
            $value={backgroundBlur}
            type="range"
            min="0"
            max="10"
            value={backgroundBlur}
            onChange={(e) => handleBackgroundBlur(parseInt(e.target.value))}
          />
          <SliderValue>{backgroundBlur}px</SliderValue>
        </SliderContainer>
      </SettingGroup>

      <SettingGroup>
        <SectionHeading>Background Dim</SectionHeading>
        <SliderContainer>
          <SliderDim
            $dim={backgroundDim}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={backgroundDim}
            onChange={(e) => handleBackgroundDim(parseFloat(e.target.value))}
          />
          <SliderValue>{backgroundDim}%</SliderValue>
        </SliderContainer>
      </SettingGroup>
    </SettingsContent>
  );
};
