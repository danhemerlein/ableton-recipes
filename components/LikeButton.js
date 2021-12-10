import { doc, getDoc, increment, writeBatch } from '@firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from 'lib/context';
import { firestore } from 'lib/firebase';
import AuthCheck from './AuthCheck';

const LikeButton = ({ postDocRef }) => {
  return (
    <AuthCheck>
      <Button postDocRef={postDocRef} />
    </AuthCheck>
  );
};

export default LikeButton;

function Button({ postDocRef }) {
  const { user } = useContext(UserContext);

  const [liked, setLiked] = useState(false);

  const heartDocumentRef = doc(postDocRef, 'hearts', user.uid);

  const checkHeart = async () => {
    const heartDocumentSnap = await getDoc(heartDocumentRef);

    const exists = heartDocumentSnap.exists();

    setLiked(exists);
  };

  useEffect(async () => {
    checkHeart();
  }, []);

  const addLike = async () => {
    const batch = writeBatch(firestore);
    batch.update(postDocRef, { heartCount: increment(1) });
    batch.set(heartDocumentRef, { uid: user.uid });
    await batch.commit();
    toast.success('post liked sucessfuly nice!');
  };

  const removeLike = async () => {
    const batch = writeBatch(firestore);
    batch.update(postDocRef, { heartCount: increment(-1) });
    batch.delete(heartDocumentRef);
    await batch.commit();
    toast.success('post un-liked nice!');
  };

  return <button>here you are</button>;
}
