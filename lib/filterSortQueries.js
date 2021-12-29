import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import { DEFAULT_POST_LIMIT } from './constants/variables';
import { firestore } from './firestore';

export const noFiltersNewestFirst = () => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const noFiltersNewestFirstMostLiked = () => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('heartCount', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const noFiltersOldestFirst = () => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const noFiltersOldestFirstMostLiked = () => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('heartCount', 'desc'),
    orderBy('createdAt', 'desc'),
    limit(DEFAULT_POST_LIMIT)
  );
};

// TODO:

export const withFiltersOldestFirst = (filters) => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    where('tagsGenresPlugins', 'array-contains-any', filters),
    orderBy('createdAt', 'desc'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const withFiltersOldestFirstMostLiked = (filters) => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    where('tagsGenresPlugins', 'array-contains-any', filters),
    orderBy('createdAt', 'desc'),
    orderBy('heartCount'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const withFiltersAscending = (filters) => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    where('tagsGenresPlugins', 'array-contains-any', filters),
    orderBy('createdAt'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const withFiltersAscendingLeastLiked = (filters) => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    where('tagsGenresPlugins', 'array-contains-any', filters),
    orderBy('createdAt'),
    orderBy('heartCount'),
    limit(DEFAULT_POST_LIMIT)
  );
};
