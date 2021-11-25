import UserSettingsForm from 'components/UserSettingsForm';
import { useState } from 'react';

const UserProfile = ({ user }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };
  return (
    <div className="box-center">
      <img src={user.photoURL || '/hacker.png'} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
      <button onClick={toggleUpdateForm}>user settings</button>

      {showUpdateForm && <UserSettingsForm username={user.username} />}
    </div>
  );
};
export default UserProfile;
