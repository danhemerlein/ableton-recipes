import UserSettingsForm from 'components/UserSettingsForm';
import { P } from 'styles/elements/typography';
import { useEffect, useState, useContext } from 'react';

import { FlexContainer } from 'styles/elements/containers';
import { UserContext } from 'lib/context';
import { SignOutButton } from '@pages/enter/SignOutButton';
import { auth, firestore, docToJSON } from 'lib/firebase';
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from '@firebase/firestore';

const UserProfile = ({ user, posts }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const uid = auth.currentUser.uid;

  useEffect(async () => {
    let posts;

    console.log(uid);

    const collectionGroupQuery = query(
      collectionGroup(firestore, 'hearts'),
      where('uid', '==', uid)
    );

    const querySnapshot = await getDocs(collectionGroupQuery);

    posts = querySnapshot.docs.map(docToJSON);

    console.log(posts);
  }, []);

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
    </FlexContainer>
  );
};
export default UserProfile;
