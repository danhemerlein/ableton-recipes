import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
  setDoc,
  increment,
} from '@firebase/firestore';

import { firestore, docToJSON } from 'lib/firebase';
import { useContext } from 'react';
import { UserContext } from 'lib/context';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';
import toast from 'react-hot-toast';
import Button from 'components/Button';

const StyledButton = styled(Button)`
  margin-left: ${remHelper[8]};
`;

function LikeButton({ postID }) {
  const [liked, setLiked] = useState(false);
  const { user } = useContext(UserContext);

  const heartReference = doc(firestore, 'hearts', `${user.uid}-${postID}`);

  useEffect(async () => {
    // see if the user has like this post or not
    const heartCollectionQuery = query(
      collection(firestore, 'hearts'),
      where('userID', '==', user.uid),
      where('postID', '==', postID)
    );

    const querySnapshot = await getDocs(heartCollectionQuery);

    const hearts = querySnapshot.docs.map(docToJSON);

    const unsub = onSnapshot(heartReference, (doc) => {
      if (doc.data() !== undefined) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });

    setLiked(hearts.length);
  }, []);

  const addLike = async () => {
    await setDoc(heartReference, {
      postID,
      userID: user.uid,
    });

    await updateDoc(doc(firestore, 'posts', postID), {
      heartCount: increment(1),
    });

    toast.success('post liked successfully!');
  };

  const removeLike = async () => {
    await deleteDoc(heartReference);

    await updateDoc(doc(firestore, 'posts', postID), {
      heartCount: increment(-1),
    });

    toast.success('post unliked successfully!');
  };

  return !liked ? (
    <StyledButton mode="primary" CTA={''} onClick={addLike}></StyledButton>
  ) : (
    <StyledButton
      mode="primary"
      CTA="dislike"
      onClick={removeLike}
    ></StyledButton>
  );
}

export default LikeButton;
