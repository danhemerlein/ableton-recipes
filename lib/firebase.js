import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCqe-uODGXmcGXurvs2f1rcUNdvZVOxc2w',
  authDomain: 'fireship-next-72d0f.firebaseapp.com',
  projectId: 'fireship-next-72d0f',
  storageBucket: 'fireship-next-72d0f.appspot.com',
  messagingSenderId: '47921489746',
  appId: '1:47921489746:web:72828a77b0d710ae473c8b',
  measurementId: 'G-QEWZ4P1HW2',
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { firestore, auth, provider };

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const userNameQuery = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );

  const querySnapshot = await getDocs(userNameQuery);

  return querySnapshot.docs[0].ref;
}

export async function getPostsByUser(userRef) {
  const postsQuery = query(
    collection(userRef, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  const querySnapshot = await getDocs(postsQuery);
  console.log(querySnapshot);
  console.log(querySnapshot.docs);
  return querySnapshot.docs.map(docToJSON);
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function docToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
