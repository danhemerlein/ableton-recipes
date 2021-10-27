import {
  doc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
} from '@firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { firestore } from '../lib/firebase';

const HeartButton = ({ heartsCollection, postDocumentRef }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);

  const heartRef = doc(postDocumentRef, 'hearts', user.uid);

  useEffect(async () => {
    const heartQuery = query(heartsCollection, where('uid', '==', user.uid));

    const querySnapshot = await getDocs(heartQuery);
    querySnapshot.docs.map((doc) => console.log(doc));

    setLiked(querySnapshot.empty);
  }, []);

  const addHeart = async () => {
    console.log(user.uid);

    const batch = writeBatch(firestore);

    batch.update(postDocumentRef, { heartCount: increment(1) });

    batch.set(heartRef, { uid: user.uid });

    await batch.commit();

    toast.success('post hearted nice!');
  };

  const removeHeart = async () => {
    console.log('this is the remove heart funtion');
  };

  return !liked ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
};
export default HeartButton;
