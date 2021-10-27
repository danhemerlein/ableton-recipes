import { doc, increment, writeBatch } from '@firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { firestore } from '../lib/firebase';

const HeartButton = async ({ heartsCollection, postDocumentRef }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);

  const heartRef = doc(postDocumentRef, 'hearts', user.uid);

  // const checkHeart = async () => {
  //   const heartDocumentRef = doc(postDocumentRef, 'hearts', user.uid);

  //   const heartDocumentSnap = await getDoc(heartDocumentRef);

  //   const exists = heartDocumentSnap.exists();

  //   console.log(exists);

  //   setLiked(exists);
  // };

  useEffect(async () => {
    console.log(heartSnap.exists());

    const heartQuery = query(postDocumentRef, where('uid', '==', user.uid));

    const querySnapshot = await getDocs(heartQuery);

    setLiked(querySnapshot.empty);

    checkHeart();
  }, []);

  const addHeart = async () => {
    const batch = writeBatch(firestore);
    batch.update(postDocumentRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid: user.uid });
    await batch.commit();
    toast.success('post hearted nice!');
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);
    batch.update(postDocumentRef, { heartCount: increment(-1) });
    batch.delete(heartRef);
    await batch.commit();
    toast.success('post un-liked nice!');
  };

  return !liked ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
};
export default HeartButton;
