import { useDispatch, useSelector } from "react-redux";
import {
  EditButton,
  ProfileField,
  AuthInput,
  ActionButton,
  AuthForm,
  InputLabel,
  AuthInputGroup,
  ProfileActions,
  ProfileActionsGroup,
} from "../../Profile.styled";
import { RootState } from "../../../../../redux/store";
import { setForm, setUser } from "../../../../../redux/slices/profileSlice";
import { logout } from "../../helpers/logout";
import { useRouter } from "next/router";
import { setActiveTab } from "../../../../../redux/slices/loginSlice";

export const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.profile.user);
  const form = useSelector((state: RootState) => state.profile.form);
  const editProfile = useSelector((state: RootState) => state.profile.isProfileEditing);

  const handleChange = (e: HTMLInputElement) => {
    const { name, value } = e;
    dispatch(setForm({ key: name, value: value }));
  };
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response) {
        dispatch(setUser(null));
        dispatch(setActiveTab("login"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {editProfile ? (
        <AuthForm>
          <InputLabel htmlFor="id">
            <strong>ID</strong>
            <AuthInput id="id" readOnly value={user.id} />
          </InputLabel>
          <InputLabel htmlFor="fullname">
            <strong>Full Name</strong>
            <AuthInput
              id="fullname"
              placeholder={user.fullname}
              value={form?.fullname}
              onChange={(e) => handleChange(e.target)}
            />
          </InputLabel>
          <InputLabel htmlFor="email">
            <strong>Email</strong>
            <AuthInput
              id="email"
              placeholder={user.email}
              value={form?.email}
              onChange={(e) => handleChange(e.target)}
            />
          </InputLabel>
          <InputLabel htmlFor="password">
            <strong>Password</strong>
            <AuthInputGroup>
              <AuthInput
                id="password"
                name="oldPassword"
                placeholder="Old password"
                type="password"
                value={form?.oldPassword}
                onChange={(e) => handleChange(e.target)}
              />
              <AuthInput
                id="password"
                name="newPassword"
                placeholder="New password"
                type="password"
                value={form?.newPassword}
                onChange={(e) => handleChange(e.target)}
              />
            </AuthInputGroup>
          </InputLabel>
        </AuthForm>
      ) : (
        <>
          <AuthForm>
            <ProfileField>
              <strong>ID:</strong> {user.id}
            </ProfileField>
            <ProfileField>
              <strong>Full Name:</strong>
              {user.fullname}
            </ProfileField>
            <ProfileField>
              <strong>Email:</strong>
              {user.email}
            </ProfileField>
            <ProfileField>
              <strong>Password:</strong>
              ********
            </ProfileField>
          </AuthForm>
          <ProfileActions>
            <ActionButton type="button" onClick={handleLogout}>
              Log out
            </ActionButton>
            <ProfileActions>
              <h3>Danger Zone</h3>
              <ProfileActionsGroup>
                <EditButton>Delete account</EditButton>
                <EditButton>Reset analytics</EditButton>
              </ProfileActionsGroup>
            </ProfileActions>
          </ProfileActions>
        </>
      )}
    </>
  );
};
