import { collectionGroup, doc, getDocs, query } from '@firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import PostContent from '../../components/PostContent';
import {
  firestore,
  getPostByUserAndSlug,
  getUserWithUsername,
} from '../../lib/firebase';

export async function getStaticProps({ params }) {
  // fetch data at build time
  const { username, slug } = params;

  const userDocRef = await getUserWithUsername(username);

  let post;
  let path;

  if (userDocRef) {
    const { postData, pathData } = await getPostByUserAndSlug(userDocRef, slug);

    post = postData[0];
    path = pathData;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

// which page to render - as they're all being rendered in advnace
export async function getStaticPaths() {
  const collectionGroupQuery = query(collectionGroup(firestore, 'posts'));

  const querySnapshot = await getDocs(collectionGroupQuery);

  const paths = querySnapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return { paths, fallback: 'blocking' };
}

const Post = ({ post, path }) => {
  const [UIpost, setUIpost] = useState(post);
  const postRef = doc(firestore, path);

  onSnapshot(postRef, (doc) => {
    setUIpost(doc.data());
  });

  return (
    <main>
      <section>
        <PostContent post={UIpost} />
      </section>

      <aside className="card">
        <p>
          <strong>{UIpost.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
};
export default Post;
