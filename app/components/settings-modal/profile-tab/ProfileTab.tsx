"use client";
import { useEffect } from "react";
import { ModalBody, SecondaryButton, TabSwitcher, TabButton, ModalHeading, EditProfileActions } from "./Profile.styled";
import { useAuth } from "../../../hooks/useAuth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { resetProfileForm, setIsProfileEditing, setUser } from "../../../redux/slices/profileSlice";
import { resetLoginForm, setActiveTab, setErrors as setErrorsL } from "../../../redux/slices/loginSlice";
import { resetRegisterForm, setErrors as setErrorsR } from "../../../redux/slices/registerSlice";
import { setErrors as setErrorsProfile } from "../../../redux/slices/profileSlice";

import { profileSelectors } from "../../../redux/selectors/profileSelectors";
import { loginSelectors } from "../../../redux/selectors/loginSelectors";

export default function ProfileTab() {
  const { user, isProfileEditing } = useSelector(profileSelectors);
  const { activeTab } = useSelector(loginSelectors);
  const loggedUser = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      dispatch(setUser(loggedUser));
    }
  }, [loggedUser, dispatch]);

  const handleEditToggle = (val: boolean) => {
    dispatch(setIsProfileEditing(val));
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

  return (
    <ModalBody>
      <ModalHeading>
        <h2>{user ? user?.fullname : activeTab === "login" ? "Login" : "Register"}</h2>{" "}
        {user && (
          <EditProfileActions>
            {!isProfileEditing && (
              <SecondaryButton type="button" onClick={() => handleEditToggle(true)}>
                Edit profile
              </SecondaryButton>
            )}
            {isProfileEditing && (
              <SecondaryButton type="submit" form="profile-form">
                Save changes
              </SecondaryButton>
            )}
            {isProfileEditing && (
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
      {user && <Profile />}
    </ModalBody>
  );
}
