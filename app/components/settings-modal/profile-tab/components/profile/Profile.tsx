import { useDispatch, useSelector } from "react-redux";
import { EditButton, ProfileField, TaskInput } from "../../Profile.styled";
import { RootState } from "../../../../../redux/store";
import { setForm } from "../../../../../redux/slices/profileSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.user);
  const form = useSelector((state: RootState) => state.profile.form);
  const editProfile = useSelector((state: RootState) => state.profile.isProfileEditing);

  const handleChange = (e: HTMLInputElement) => {
    const { name, value } = e;
    dispatch(setForm({ key: name, value: value }));
  };

  return (
    <>
      <ProfileField>
        <strong>ID:</strong> {user.id}
      </ProfileField>
      <ProfileField>
        <strong>Full Name:</strong>
        {editProfile ? (
          <TaskInput placeholder={user.fullname} value={form?.fullname} onChange={(e) => handleChange(e.target)} />
        ) : (
          user.fullname
        )}
      </ProfileField>
      <ProfileField>
        <strong>Email:</strong>
        {editProfile ? (
          <TaskInput placeholder={user.email} value={form?.email} onChange={(e) => handleChange(e.target)} />
        ) : (
          user.email
        )}
      </ProfileField>
      <ProfileField>
        <strong>Password:</strong>
        {editProfile ? (
          <div>
            <TaskInput placeholder="Old password" type="password" />
            <TaskInput placeholder="New password" type="password" />
          </div>
        ) : (
          "********"
        )}
      </ProfileField>
      {!editProfile && (
        <section>
          <h3>Danger Zone</h3>
          <EditButton>Delete account</EditButton>
          <EditButton>Reset analytics</EditButton>
        </section>
      )}
    </>
  );
};
