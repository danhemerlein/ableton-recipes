import {
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  query,
} from '@firebase/firestore';
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
    const { postData, pathData, refData } = await getPostByUserAndSlug(
      userDocRef,
      slug
    );

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

  // fix this to get the post in another way
  const postDocumentRef = doc(firestore, path);

  onSnapshot(postDocumentRef, (doc) => {
    setUIpost(doc.data());
  });

  return (
    <main>
      <section>
        <PostContent post={UIpost} postDocumentRef={postDocumentRef} />
      </section>
    </main>
  );
};
export default Post;
