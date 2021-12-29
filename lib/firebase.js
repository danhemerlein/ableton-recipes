import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { DEFAULT_POST_LIMIT } from './constants/variables';
import {
  noFiltersNewestFirst,
  noFiltersNewestFirstMostLiked,
  noFiltersOldestFirst,
  noFiltersOldestFirstMostLiked,
  withFiltersAscending,
  withFiltersOldestFirst,
} from './filterSortQueries';
import { firestore } from './firestore';

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

export async function getDefaultPostsList() {
  const postsQuery = noFiltersNewestFirst();
  const snapshot = await getDocs(postsQuery);
  return snapshot.docs.map(docToJSON);
}

export async function filterPosts(tagsGenresPlugins) {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('tagsGenresPlugins', 'array-contains-any', tagsGenresPlugins),
    orderBy('createdAt', 'desc'),
    limit(DEFAULT_POST_LIMIT)
  );

  const snapshot = await getDocs(postsQuery);
  return snapshot.docs.map(docToJSON);
}

export async function filterSortPosts(
  tagsGenresPlugins,
  direction,
  heartCount
) {
  let query;

  console.log(tagsGenresPlugins.length);
  console.log(direction.length);
  console.log(heartCount);

  if (tagsGenresPlugins.length) {
    if (direction.length) {
      if (heartCount) {
        // with filters, newest first, most liked first
        query = withFiltersNewestFirstMostListed();
      } else {
        // with filters, oldest first, most liked not accounted for
        query = withFiltersOldestFirst();
      }
    } else {
      query = withFiltersAscending();
    }
  } else {
    // no filters
    if (direction.length) {
      if (heartCount) {
        // THIS WORKS: no filters, newest first, most liked
        query = noFiltersNewestFirstMostLiked();
      } else {
        // THIS WORKS: no filters, new first, most liked not acounted for
        // THIS IS THE DEFAULT QUERY
        query = noFiltersNewestFirst();
      }
    } else {
      if (heartCount) {
        // no filters, oldest first, most liked
        console.log('hitting');
        query = noFiltersOldestFirstMostLiked();
      } else {
        // THIS WORKS: no filters, oldest first, most liked not accounted for
        query = noFiltersOldestFirst();
      }
    }
  }

  const snapshot = await getDocs(query);

  console.log(snapshot.docs.map(docToJSON));
  return snapshot.docs.map(docToJSON);
}

export async function getPostBySlug(slug) {
  const postQuery = query(
    collection(firestore, 'posts'),
    where('slug', '==', slug)
  );

  const querySnapshot = await getDocs(postQuery);

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
