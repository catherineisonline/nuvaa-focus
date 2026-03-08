import styled from "styled-components";
import {
  SkeletonBase,
  SkeletonForm,
  SkeletonButton,
  SkeletonLabel,
  SkeletonCaptcha,
  SkeletonInput,
} from "./LoginSkeleton";

export const RegisterSkeleton = () => {
  return (
    <SkeletonForm aria-hidden="true">
      <SkeletonLabel />
      <SkeletonInput />

      <SkeletonLabel />
      <SkeletonInput />

      <SkeletonLabel />
      <SkeletonInput />

      <SkeletonLabel />
      <SkeletonInput />

      <SkeletonButton />

      <SkeletonCaptcha />
    </SkeletonForm>
  );
};
