"use client";
import { useEffect } from "react";
import { ModalBody, EditButton, TabSwitcher, TabButton, ModalHeading, EditProfileActions } from "./Profile.styled";
import { useAuth } from "../../../hooks/useAuth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { resetForm, setIsProfileEditing, setUser } from "../../../redux/slices/profileSlice";
import { setActiveTab, setErrors as setErrorsL } from "../../../redux/slices/loginSlice";
import { setErrors as setErrorsR } from "../../../redux/slices/registerSlice";
import { setErrors as setErrorsProfile } from "../../../redux/slices/profileSlice";
import { validate } from "./helpers/validate";
import { edit } from "./helpers/edit";

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
    dispatch(resetForm());
  };
  const handleActiveTab = (tab: string) => {
    if (tab === "login") dispatch(setErrorsR(null));
    else dispatch(setErrorsL(null));

    dispatch(setActiveTab(tab));
  };
  const form = useSelector((state: RootState) => state.profile.form);

  const submitForm = async () => {
    const validation = validate(form, "edit");
    if (Object.keys(validation).length > 0) {
      dispatch(setErrorsProfile(validation));
      return;
    }
    try {
      const user = await edit(form);
      dispatch(setErrorsProfile(null));
      dispatch(resetForm());
      dispatch(setUser(user));
      dispatch(setIsProfileEditing(false));
    } catch (error) {
      dispatch(setErrorsProfile({ general: error.message || "Edit failed!" }));
      console.log(error);
    }
  };

  return (
    <ModalBody>
      <ModalHeading>
        <h2>{user ? user?.fullname : activeTab === "login" ? "Login" : "Register"}</h2>{" "}
        {user && (
          <EditProfileActions>
            {!editProfile && (
              <EditButton type="button" onClick={() => handleEditToggle(true)}>
                Edit profile
              </EditButton>
            )}
            {editProfile && (
              <EditButton type="button" onClick={submitForm}>
                Save changes
              </EditButton>
            )}
            {editProfile && (
              <EditButton type="button" onClick={() => handleEditToggle(false)}>
                Cancel
              </EditButton>
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
