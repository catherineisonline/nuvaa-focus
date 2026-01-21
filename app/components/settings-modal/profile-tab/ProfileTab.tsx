"use client";
import { useEffect } from "react";
import { ModalBody, SecondaryButton, TabSwitcher, TabButton, ModalHeading, EditProfileActions } from "./Profile.styled";
import { useAuth } from "../../../hooks/useAuth";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setIsProfileEditing, setUser } from "../../../redux/slices/profileSlice";
import { setActiveTab, setErrors as setErrorsL } from "../../../redux/slices/loginSlice";
import { setErrors as setErrorsR } from "../../../redux/slices/registerSlice";
import { setErrors as setErrorsProfile } from "../../../redux/slices/profileSlice";
import { validate } from "./helpers/validate";
import { edit } from "./helpers/edit";
import { profileSelectors } from "../../../redux/selectors/profileSelectors";
import { loginSelectors } from "../../../redux/selectors/loginSelectors";

export default function ProfileTab() {
  const { user, isProfileEditing, form } = useSelector(profileSelectors);
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
    dispatch(resetForm());
    if (!val) {
      dispatch(setErrorsProfile(null));
    }
  };
  const handleActiveTab = (tab: string) => {
    if (tab === "login") dispatch(setErrorsR(null));
    else dispatch(setErrorsL(null));

    dispatch(setActiveTab(tab));
  };

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
      dispatch(resetForm());
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
            {!isProfileEditing && (
              <SecondaryButton type="button" onClick={() => handleEditToggle(true)}>
                Edit profile
              </SecondaryButton>
            )}
            {isProfileEditing && (
              <SecondaryButton type="button" onClick={submitForm}>
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
