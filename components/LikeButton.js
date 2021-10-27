import { doc, getDoc, increment, writeBatch } from '@firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { firestore } from '../lib/firebase';

const HeartButton = ({ postDocumentRef }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const heartDocumentRef = doc(postDocumentRef, 'hearts', user.uid);

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
    batch.update(postDocumentRef, { heartCount: increment(1) });
    batch.set(heartDocumentRef, { uid: user.uid });
    await batch.commit();
    toast.success('post liked sucessfuly nice!');
  };

  const removeLike = async () => {
    const batch = writeBatch(firestore);
    batch.update(postDocumentRef, { heartCount: increment(-1) });
    batch.delete(heartDocumentRef);
    await batch.commit();
    toast.success('post un-liked nice!');
  };

  return liked ? (
    <button onClick={removeLike}>💔 unlike</button>
  ) : (
    <button onClick={addLike}>💗 like</button>
  );
};
export default HeartButton;
