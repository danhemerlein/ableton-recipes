import { doc, onSnapshot } from '@firebase/firestore';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthCheck from '../../components/AuthCheck';
import { auth, firestore, getPostByUserAndSlug } from '../../lib/firebase';

const AdminSlug = ({}) => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

export default AdminSlug;

function PostManager() {
  const [preview, setPreview] = useState(false);
  const [post, setPost] = useState([]);
  const [postRef, setPostRef] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(async () => {
    // turn off realtime subscription
    let unsubscribe;

    const userRef = doc(firestore, 'users', auth.currentUser.uid);

    const { postData, refData } = await getPostByUserAndSlug(userRef, slug);

    setPost(postData);
    setPostRef(refData);

    unsubscribe = onSnapshot(refData, (doc) => {
      setPost(doc.data());
    });

    return unsubscribe;
  }, []);

  return (
    <main>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            {/* <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            /> */}
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}
