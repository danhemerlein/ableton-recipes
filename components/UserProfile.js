import UserSettingsForm from 'components/UserSettingsForm';
import { P, H2 } from 'styles/elements/typography';
import { useState } from 'react';
import PostFeed from './PostFeed';
import { FlexContainer } from 'styles/elements/containers';
import { SignOutButton } from '@pages/enter/SignOutButton';

const UserProfile = ({ user, likedPosts }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  console.log(likedPosts);

  return (
    <FlexContainer direction="column">
      {/* <button onClick={toggleUpdateForm}>update user settings</button> */}

      {/* {showUpdateForm && <UserSettingsForm username={user.username} />} */}

      <SignOutButton />

      <H2>liked posts</H2>

      <PostFeed posts={likedPosts}></PostFeed>
    </FlexContainer>
  );
};
export default UserProfile;
