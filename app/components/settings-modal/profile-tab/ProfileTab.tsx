"use client";
import { useEffect } from "react";
import { AccountContent, EditButton, TabSwitcher, TabButton } from "./Profile.styled";
import { useAuth } from "../../../hooks/useAuth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setIsProfileEditing, setUser } from "../../../redux/slices/profileSlice";
import { setActiveTab } from "../../../redux/slices/loginSlice";

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
    dispatch(setActiveTab(tab));
  };

  return (
    <AccountContent>
      <div>
        <h2>{user ? user?.fullname : activeTab === "login" ? "Login" : "Register"}</h2>{" "}
        {user && (
          <div>
            <EditButton onClick={() => handleEditToggle(!editProfile)}>
              {editProfile ? "Save changes" : "Edit profile"}
            </EditButton>
            {editProfile && <EditButton onClick={() => handleEditToggle(false)}>Cancel</EditButton>}
          </div>
        )}
      </div>

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
    </AccountContent>
  );
}
