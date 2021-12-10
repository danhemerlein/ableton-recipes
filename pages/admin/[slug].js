import { doc } from '@firebase/firestore';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import { P } from 'styles/elements/typography';
import { useEffect, useState } from 'react';
import { CenterContainer } from 'styles/elements/containers';
import AuthCheck from 'components/AuthCheck';
import { auth, firestore, getPostByUserAndSlug } from 'lib/firebase';
import UpdatePostForm from './UpdatePostForm';
import styled from 'styled-components';
import { remHelper } from 'lib/utilities/remHelper';

const MarginHelper = styled.div`
  margin: ${remHelper[8]} 0;
`;

const AdminSlug = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

export default AdminSlug;

function PostManager() {
  const [preview, setPreview] = useState(true);
  const [post, setPost] = useState([]);
  const [postRef, setPostRef] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(async () => {
    // turn off realtime subscription
    // let unsubscribe;

    const userRef = doc(firestore, 'users', auth.currentUser.uid);

    const { postData, refData } = await getPostByUserAndSlug(userRef, slug);

    setPost(postData);
    setPostRef(refData);

    // unsubscribe = onSnapshot(refData, (doc) => {
    //   setPost(doc.data());
    // });

    // return unsubscribe;
  }, []);

  return (
    <main>
      {post.length && (
        <>
          <section>
            <UpdatePostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <CenterContainer direction="column">
            <MarginHelper>
              <button onClick={() => setPreview(!preview)}>
                {preview ? 'Edit' : 'Preview'}
              </button>
            </MarginHelper>

            <MarginHelper>
              <P>
                <Link href={`/${post.username}/${post.slug}`}>Live view</Link>
              </P>
            </MarginHelper>
          </CenterContainer>
        </>
      )}
    </main>
  );
}
