"use client";

import { useDispatch, useSelector } from "react-redux";
import { ONBOARDING_STEPS } from "../../lib/constants";
import { setNextStep, toggleOnboarding } from "../../redux/slices/onboardingSlice";
import { RootState } from "../../redux/store";

import X from "lucide-react/dist/esm/icons/x";
import {
  CloseButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalNavigation,
  ModalSteps,
  ModalStepsContent,
  ModalTitle,
  Overlay,
  PrimaryNavigationBtn,
  ProgressDot,
  ProgressDots,
  SecondaryNavigationBtn,
} from "./Onboarding.styled";
import { useBackgroundStatus } from "../../hooks/useBackgroundStatus";
import { useEffect, useMemo, useRef } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useEscapeKey } from "../../hooks/useEscKey";

export const Onboarding = () => {
  const dispatch = useDispatch();
  const isBackgroundActive = useBackgroundStatus();
  const currentStep = useSelector((state: RootState) => state.onboarding.currentStep);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);
  useFocusTrap(modalRef, true);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleOnboarding(false));
    }
  };
  const handleCloseModal = () => {
    dispatch(toggleOnboarding(false));
  };
  useEscapeKey(handleCloseModal, true);
  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      dispatch(setNextStep(currentStep + 1));
    } else {
      handleCloseModal();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      dispatch(setNextStep(currentStep - 1));
    }
  };

  const currentStepData = ONBOARDING_STEPS[currentStep];

  const Icon = useMemo(() => currentStepData.icon, [currentStepData]);

  return (
    <Overlay onClick={handleOutsideClick}>
      <Modal $bgImage={isBackgroundActive} ref={modalRef} tabIndex={-1} role="dialog" aria-modal="true">
        <ModalHeader>
          <ModalTitle>Getting Started</ModalTitle>
          <CloseButton onClick={handleCloseModal} aria-label="Close">
            <X size={32} aria-hidden="true" />
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <ModalSteps>
            <span>
              {currentStep + 1} of {ONBOARDING_STEPS.length}
            </span>
          </ModalSteps>

          <Icon size={32} aria-hidden="true" />

          <ModalStepsContent>
            <h3>{currentStepData.title}</h3>
            <p>{currentStepData.content}</p>
          </ModalStepsContent>

          <ProgressDots>
            {ONBOARDING_STEPS.map((_, index) => (
              <ProgressDot key={index} $active={index === currentStep} $complete={index < currentStep} />
            ))}
          </ProgressDots>
        </ModalContent>

        <ModalNavigation>
          <SecondaryNavigationBtn onClick={prevStep} aria-label="Previous" disabled={currentStep === 0}>
            Previous
          </SecondaryNavigationBtn>
          <PrimaryNavigationBtn
            onClick={nextStep}
            aria-label={currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}>
            {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
          </PrimaryNavigationBtn>
        </ModalNavigation>
      </Modal>
    </Overlay>
  );
};
