import { SignOutButton } from '@pages/enter/SignOutButton';
import { useState } from 'react';
import { FlexContainer } from 'styles/elements/containers';
import { H2 } from 'styles/elements/typography';
import PostFeed from '../../components/PostFeed';

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
