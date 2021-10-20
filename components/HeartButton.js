import { collection, doc, increment, writeBatch } from '@firebase/firestore';
import { auth, firestore } from '../lib/firebase';

const HeartButton = async ({ postRef }) => {
  const uid = auth.currentUser.uid;

  const heartRef = collection(postRef, 'hearts');

  const heartDoc = doc(postRef, 'hearts', auth.currentUser.uid);

  const addHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(1) });

    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    console.log('remove heart');
  };

  return heartDoc?.exists ? (
    <button onClick={removeHeart}>
      <span>💔 unheart</span>
    </button>
  ) : (
    <button onClick={addHeart}>
      <span>💗 heart</span>
    </button>
  );
};
export default HeartButton;
