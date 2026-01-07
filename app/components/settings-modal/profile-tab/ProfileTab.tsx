"use client";
import { useEffect } from "react";
import { ModalBody, EditButton, TabSwitcher, TabButton, ModalHeading, EditProfileActions } from "./Profile.styled";
import { useAuth } from "../../../hooks/useAuth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setIsProfileEditing, setUser } from "../../../redux/slices/profileSlice";
import { setActiveTab, setErrors as setErrorsL } from "../../../redux/slices/loginSlice";
import { setErrors as setErrorsR } from "../../../redux/slices/registerSlice";

export default function ProfileTab() {
  const editProfile = useSelector((state: RootState) => state.profile.isProfileEditing);
  const user = useSelector((state: RootState) => state.profile.user);
  const activeTab = useSelector((state: RootState) => state.login.activeTab);
  const loggedUser = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      dispatch(setUser(loggedUser));
    }
  }, [loggedUser, dispatch]);

  const handleEditToggle = (val: boolean) => {
    dispatch(setIsProfileEditing(val));
  };
  const handleActiveTab = (tab: string) => {
    if (tab === "login") dispatch(setErrorsR(null));
    else dispatch(setErrorsL(null));

    dispatch(setActiveTab(tab));
  };

  return (
    <ModalBody>
      <ModalHeading>
        <h2>{user ? user?.fullname : activeTab === "login" ? "Login" : "Register"}</h2>{" "}
        {user && (
          <EditProfileActions>
            <EditButton onClick={() => handleEditToggle(!editProfile)}>
              {editProfile ? "Save changes" : "Edit profile"}
            </EditButton>
            {editProfile && <EditButton onClick={() => handleEditToggle(false)}>Cancel</EditButton>}
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
