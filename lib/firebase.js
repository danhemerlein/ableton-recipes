import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

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

  return querySnapshot.docs[0]?.ref;
}

export async function getAllDocumentsInACollection(collectionName) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  return querySnapshot.docs.map(docToJSON);
}

export async function getPostsByTags(tags, genres) {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('tags', 'array-contains-any', tags),
    where('genres', 'array-contains-any', genres),
    orderBy('createdAt', 'desc'),
    limit(2)
  );

  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map(docToJSON);
}

export async function getPostsByUser(userRef) {
  const postsQuery = query(
    collection(userRef, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  const querySnapshot = await getDocs(postsQuery);
  return querySnapshot.docs.map(docToJSON);
}

export async function getPostBySlug(slug) {
  const postQuery = query(
    collection(firestore, 'posts'),
    where('slug', '==', slug)
  );

  const querySnapshot = await getDocs(postQuery);

  console.log(querySnapshot.docs[0]?.ref);

  return {
    postData: querySnapshot.docs.map(docToJSON),
    ref: querySnapshot.docs[0]?.ref,
    path: querySnapshot.docs[0]?.ref.path,
  };
}

export async function getLikedPostsByUser(userID) {
  const heartsCollectionQuery = query(
    collection(firestore, 'hearts'),
    where('userID', '==', userID)
  );

  const heartsQuerySnapshot = await getDocs(heartsCollectionQuery);

  let heartDocs = heartsQuerySnapshot.docs.map(docToJSON);

  let likedPostIDs = [];

  heartDocs.map((post) => likedPostIDs.push(post.postID));

  if (likedPostIDs.length) {
    const postCollectionQuery = query(
      collection(firestore, 'posts'),
      where('id', 'in', likedPostIDs)
    );

    const postQuerySnapshot = await getDocs(postCollectionQuery);

    let postDocs = postQuerySnapshot.docs.map(docToJSON);

    // onSnapshot(collection(firestore, 'hearts'), async () => {
    //   getLikedPostsByUser(userID);
    // });

    return postDocs;
  } else {
    return null;
  }
}

/**
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function docToJSON(doc) {
  const data = doc.data();
  const id = doc.id;
  if (data.createdAt && data.updatedAt) {
    return {
      ...data,
      id,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  } else {
    return {
      id,
      ...data,
    };
  }
}

export { firestore, auth, provider };
