"use client";
import { useEffect, useState } from "react";
import { ModalBody, SecondaryButton, TabSwitcher, TabButton, ModalHeading, EditProfileActions } from "./Profile.styled";
import { useAuth } from "../../../hooks/useAuth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { resetProfileForm, setUser } from "../../../redux/slices/profileSlice";
import { resetLoginForm, setActiveTab, setErrors as setErrorsL } from "../../../redux/slices/loginSlice";
import { resetRegisterForm, setErrors as setErrorsR } from "../../../redux/slices/registerSlice";
import { setErrors as setErrorsProfile } from "../../../redux/slices/profileSlice";

import { profileSelectors } from "../../../redux/selectors/profileSelectors";
import { loginSelectors } from "../../../redux/selectors/loginSelectors";
import { RootState } from "../../../redux/store";

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useSelector(profileSelectors);
  const { activeTab } = useSelector(loginSelectors);
  const isMusicPlaying = useSelector((state: RootState) => state.settings.isMusicPlaying);

  const loggedUser = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      dispatch(setUser(loggedUser));
    }
  }, [loggedUser, dispatch]);

  const handleEditToggle = (val: boolean) => {
    setIsEditing(val);
    dispatch(resetProfileForm());
    if (!val) {
      dispatch(setErrorsProfile(null));
    }
  };
  const handleActiveTab = (tab: string) => {
    if (tab === "login") {
      dispatch(setErrorsR(null));
      dispatch(resetRegisterForm());
    } else {
      dispatch(setErrorsL(null));
      dispatch(resetLoginForm(null));
    }

    dispatch(setActiveTab(tab));
  };
  useEffect(() => {
    if (isMusicPlaying) {
      handleEditToggle(false);
    }
  }, [isMusicPlaying]);
  return (
    <ModalBody>
      <ModalHeading>
        <h2>{user ? user?.fullname : activeTab === "login" ? "Login" : "Register"}</h2>{" "}
        {user && (
          <EditProfileActions>
            {!isEditing && (
              <SecondaryButton type="button" onClick={() => handleEditToggle(true)}>
                Edit profile
              </SecondaryButton>
            )}
            {isEditing && (
              <SecondaryButton type="submit" form="profile-form">
                Save changes
              </SecondaryButton>
            )}
            {isEditing && (
              <SecondaryButton type="button" onClick={() => handleEditToggle(false)}>
                Cancel
              </SecondaryButton>
            )}
          </EditProfileActions>
        )}
      </ModalHeading>

      {!user && (
        <>
          <TabSwitcher>
            {activeTab === "login" ? (
              <TabButton onClick={() => handleActiveTab("register")}>Don&apos;t have an account?</TabButton>
            ) : (
              <TabButton onClick={() => handleActiveTab("login")}>Existing user?</TabButton>
            )}
          </TabSwitcher>
          {activeTab === "register" ? <Register /> : <Login />}
        </>
      )}
      {user && <Profile isEditing={isEditing} setIsEditing={setIsEditing} />}
    </ModalBody>
  );
}
