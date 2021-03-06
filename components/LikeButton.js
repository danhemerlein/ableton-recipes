import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore';
import Button from 'components/Button';
import { UserContext } from 'lib/context';
import { docToJSON } from 'lib/firebase';
import { firestore } from 'lib/firestore';
import { remHelper } from 'lib/utilities/remHelper';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { rainy_hearts } from 'styles/utilities';

const StyledButton = styled(Button)`
  margin-left: ${remHelper[8]};
  ${rainy_hearts};
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
  };

  const removeLike = async () => {
    await deleteDoc(heartReference);

    await updateDoc(doc(firestore, 'posts', postID), {
      heartCount: increment(-1),
    });
  };

  return !liked ? (
    <StyledButton mode="primary" CTA="like" onClick={addLike}></StyledButton>
  ) : (
    <StyledButton
      mode="primary"
      CTA="dislike"
      onClick={removeLike}
    ></StyledButton>
  );
}

export default LikeButton;
