import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import { DEFAULT_POST_LIMIT } from './constants/variables';
import { firestore } from './firestore';

export const noFiltersDecending = () => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const noFiltersAscending = () => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt'),
    limit(DEFAULT_POST_LIMIT)
  );
};

export const withFiltersDecending = (filters) => {
  return query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    where('tagsGenresPlugins', 'array-contains-any', filters),
    orderBy('createdAt', 'desc'),
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
