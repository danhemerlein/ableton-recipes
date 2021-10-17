import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from '@firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import PostFeed from '../components/PostFeed';
import { docToJSON, firestore } from '../lib/firebase';

const LIMIT = 1;

export async function getServerSideProps(context) {
  let posts;
  // gets all sub collecitions since posts are attached to users
  const collectionGroupQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );

  const querySnapshot = await getDocs(collectionGroupQuery);

  posts = querySnapshot.docs.map(docToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const collectionGroupQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>load more posts</button>
      )}

      <Loader show={loading} />

      {postsEnd && 'you have seen it all'}

      <button onClick={() => toast.success('hello toast!')}>toast me</button>
    </main>
  );
}
