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
  InputError,
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
          {errors?.general && <InputError>{errors.general}</InputError>}
          <InputLabel htmlFor="id">
            <strong>ID</strong>
            <AuthInput id="id" readOnly value={user.id} />
          </InputLabel>
          <InputLabel htmlFor="fullname">
            <strong>Full Name</strong>
            <AuthInput
              id="fullname"
              name="fullname"
              placeholder={user.fullname}
              value={form?.fullname || ""}
              onChange={(e) => handleChange(e.target)}
            />
          </InputLabel>
          {errors?.fullname && <InputError>{errors.fullname}</InputError>}
          <InputLabel htmlFor="email">
            <strong>Email</strong>
            <AuthInput
              id="email"
              name="email"
              placeholder={user.email}
              value={form?.email || ""}
              onChange={(e) => handleChange(e.target)}
            />
          </InputLabel>
          {errors?.email && <InputError>{errors.email}</InputError>}
          <InputLabel htmlFor="password">
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
              {errors?.oldPassword && <InputError>{errors.oldPassword}</InputError>}
              <AuthInput
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                type="password"
                value={form?.newPassword || ""}
                onChange={(e) => handleChange(e.target)}
              />
              {errors?.newPassword && <InputError>{errors.newPassword}</InputError>}
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
                <EditButton onClick={toggleAccountDeletion}>Delete account</EditButton>
              </ProfileActionsGroup>
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
                <ActionButton type="button" onClick={handleAccountDeletion}>
                  Delete
                </ActionButton>
                <ActionButton type="button" onClick={cancelDeletion}>
                  Cancel
                </ActionButton>
              </ModalActions>
            </ConfirmationModal>
          )}
        </>
      )}
    </>
  );
};
