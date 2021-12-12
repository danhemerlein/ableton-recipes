import UserSettingsForm from 'components/UserSettingsForm';
import { P } from 'styles/elements/typography';
import { useState } from 'react';
import PostFeed from './PostFeed';

import { FlexContainer } from 'styles/elements/containers';

import { SignOutButton } from '@pages/enter/SignOutButton';

const UserProfile = ({ user, likedPosts }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <FlexContainer justify="center" items="center" direction="column">
      <P>username: {user.username}</P>

      <button onClick={toggleUpdateForm}>update user settings</button>

      {showUpdateForm && <UserSettingsForm username={user.username} />}

      <SignOutButton />

      <P>liked posts</P>

      <PostFeed posts={likedPosts}></PostFeed>
    </FlexContainer>
  );
};
export default UserProfile;
