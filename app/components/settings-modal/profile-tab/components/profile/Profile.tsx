import { useDispatch, useSelector } from "react-redux";
import {
  SecondaryButton,
  ProfileField,
  AuthInput,
  PrimaryButton,
  AuthForm,
  AuthLabel,
  AuthInputGroup,
  ProfileActions,
  AuthError,
  ConfirmationModal,
  ModalActions,
} from "../../Profile.styled";
import { setForm, setIsConfirmationActive, setUser } from "../../../../../redux/slices/profileSlice";
import { logout } from "../../helpers/logout";
import { setActiveTab } from "../../../../../redux/slices/loginSlice";
import { setErrors } from "../../../../../redux/slices/profileSlice";
import { deleteAccount } from "../../helpers/delete-account";
import { profileSelectors } from "../../../../../redux/selectors/profileSelectors";
export const Profile = () => {
  const dispatch = useDispatch();
  const { user, form, errors, isProfileEditing, isConfirmationActive } = useSelector(profileSelectors);

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
      dispatch(setErrors({ general: error.message || "Editing failed!" }));
      console.log(error);
    }
  };

  const cancelDeletion = () => {
    dispatch(setIsConfirmationActive(false));
  };
  const handleAccountDeletion = async () => {
    try {
      const response = await deleteAccount();
      if (response) {
        dispatch(setUser(null));
        dispatch(setIsConfirmationActive(false));
        dispatch(setActiveTab("login"));
      }
    } catch (error) {
      dispatch(setErrors({ general: error.message || "Deletion failed!" }));
      console.log(error);
    }
  };
  const toggleAccountDeletion = () => {
    dispatch(setIsConfirmationActive(true));
  };
  return (
    <>
      {isProfileEditing ? (
        <AuthForm>
          {errors?.general && <AuthError>{errors.general}</AuthError>}
          <AuthLabel htmlFor="id">
            <strong>ID</strong>
            <AuthInput id="id" readOnly value={user.id} />
          </AuthLabel>
          <AuthLabel htmlFor="fullname">
            <strong>Full Name</strong>
            <AuthInput
              id="fullname"
              name="fullname"
              placeholder={user.fullname}
              value={form?.fullname || ""}
              onChange={(e) => handleChange(e.target)}
            />
          </AuthLabel>
          {errors?.fullname && <AuthError>{errors.fullname}</AuthError>}
          <AuthLabel htmlFor="email">
            <strong>Email</strong>
            <AuthInput
              id="email"
              name="email"
              placeholder={user.email}
              value={form?.email || ""}
              onChange={(e) => handleChange(e.target)}
            />
          </AuthLabel>
          {errors?.email && <AuthError>{errors.email}</AuthError>}
          <AuthLabel htmlFor="password">
            <strong>Password</strong>
            <AuthInputGroup>
              <AuthInput
                id="password"
                name="oldPassword"
                placeholder="Old password"
                type="password"
                value={form?.oldPassword || ""}
                onChange={(e) => handleChange(e.target)}
              />
              {errors?.oldPassword && <AuthError>{errors.oldPassword}</AuthError>}
              <AuthInput
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                type="password"
                value={form?.newPassword || ""}
                onChange={(e) => handleChange(e.target)}
              />
              {errors?.newPassword && <AuthError>{errors.newPassword}</AuthError>}
            </AuthInputGroup>
          </AuthLabel>
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
            <PrimaryButton type="button" onClick={handleLogout}>
              Log out
            </PrimaryButton>
            <ProfileActions>
              <h3>Danger Zone</h3>
              <SecondaryButton onClick={toggleAccountDeletion}>Delete account</SecondaryButton>
            </ProfileActions>
          </ProfileActions>
          {isConfirmationActive && (
            <ConfirmationModal>
              <p>
                You are about to delete your account. <br />
                All data associated with this account will be removed and you will no longer be able to access your
                account and analytics.
              </p>
              <ModalActions>
                <PrimaryButton type="button" onClick={handleAccountDeletion}>
                  Delete
                </PrimaryButton>
                <PrimaryButton type="button" onClick={cancelDeletion}>
                  Cancel
                </PrimaryButton>
              </ModalActions>
            </ConfirmationModal>
          )}
        </>
      )}
    </>
  );
};
