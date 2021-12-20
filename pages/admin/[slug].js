import AuthCheck from 'components/AuthCheck';
import { getPostBySlug } from 'lib/firebase';
import { remHelper } from 'lib/utilities/remHelper';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CenterContainer } from 'styles/elements/containers';
import { P } from 'styles/elements/typography';
import UpdatePostForm from './UpdatePostForm';

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
    const { postData, ref } = await getPostBySlug(slug);

    setPost(postData);
    setPostRef(ref);
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
