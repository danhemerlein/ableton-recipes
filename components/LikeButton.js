import {
  doc,
  getDoc,
  collectionGroup,
  getDocs,
  update,
  set,
  query,
  where,
  increment,
  writeBatch,
} from '@firebase/firestore';

import { firestore } from 'lib/firebase';
import { useContext } from 'react';
import { UserContext } from 'lib/context';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import AuthCheck from './AuthCheck';
import toast from 'react-hot-toast';

const StyledButton = styled.button`
  margin-left: ${remHelper[8]};
`;

function LikeButton({ postSlug }) {
  const [UIPostRef, setUIPostRef] = useState(null);
  const [UIHeartRef, setUIHeartRef] = useState(null);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(async () => {
    const collectionGroupQuery = query(
      collectionGroup(firestore, 'posts'),
      where('slug', '==', postSlug)
    );

    const querySnapshot = await getDocs(collectionGroupQuery);

    const postRef = querySnapshot.docs[0].ref;
    setUIPostRef(postRef);

    const heartDocumentRef = doc(postRef, 'hearts', user.uid);

    setUIHeartRef(heartDocumentRef);

    const heartDocumentSnap = await getDoc(heartDocumentRef);
    const exists = heartDocumentSnap.exists();

    setLiked(exists);

    console.log(exists);
  }, [liked]);

  const addLike = async () => {
    const batch = writeBatch(firestore);
    batch.update(UIPostRef, { heartCount: increment(1) });
    batch.set(UIHeartRef, { uid: user.uid });
    await batch.commit();
    toast.success('post liked sucessfuly nice!');
  };

  const removeLike = async () => {
    const batch = writeBatch(firestore);
    batch.update(UIPostRef, { heartCount: increment(-1) });
    batch.delete(UIHeartRef);
    await batch.commit();
    toast.success('post un-liked nice!');
  };

  return !liked ? (
    <StyledButton onClick={addLike}>add like!</StyledButton>
  ) : (
    <StyledButton onClick={removeLike}>remove like!</StyledButton>
  );
}

export default LikeButton;
