import FilterSort from '@components/FilterSort/';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from '@firebase/firestore';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Metatags from 'components/Metatags';
import PostFeed from 'components/PostFeed';
import {
  docToJSON,
  filterPosts,
  firestore,
  getAllDocumentsInACollection,
} from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import { useState } from 'react';
import styled from 'styled-components';
import { P } from 'styles/elements/typography';

const LIMIT = 2;

const StyledButton = styled(Button)`
  margin-top: ${remHelper[8]};
`;

export async function getServerSideProps() {
  let posts;
  // gets all sub collecitions since posts are attached to users
  const collectionQuery = query(
    collection(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );

  const querySnapshot = await getDocs(collectionQuery);

  posts = querySnapshot.docs.map(docToJSON);

  const tags = await getAllDocumentsInACollection('tags');
  const genres = await getAllDocumentsInACollection('genres');
  const plugins = await getAllDocumentsInACollection('plugins');
  const authors = await getAllDocumentsInACollection('authors');

  return {
    props: { posts, tags, genres, plugins, authors },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    console.log('running get more posts');
    setLoading(true);

    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const collectionQuery = query(
      collection(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    const querySnapshot = await getDocs(collectionQuery);

    const newPosts = querySnapshot.docs.map(docToJSON);

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  const handleSubmit = async (filters) => {
    setPosts(await filterPosts(filters));
  };

  return (
    <main>
      <Metatags title="fireship next" />

      {props.tags && props.plugins && props.genres && (
        <FilterSort
          submitHandler={handleSubmit}
          tags={props.tags}
          plugins={props.plugins}
          genres={props.genres}
        />
      )}

      {props.authors && <PostFeed posts={posts} authors={props.authors} />}

      {!loading && !postsEnd && (
        <StyledButton
          CTA="load more posts"
          clickHandler={getMorePosts}
          mode="primary"
        ></StyledButton>
      )}

      <Loader show={loading} />

      {postsEnd && <P textAlign="center">there no more posts to show</P>}
    </main>
  );
}
