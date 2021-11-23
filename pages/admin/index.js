import { addDoc, collection, doc, serverTimestamp } from '@firebase/firestore';
import _ from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { auth, firestore, getAdminPostsList } from '../../lib/firebase';

const AdminPostsPage = () => {
  return (
    <AuthCheck>
      <main>
        <Metatags title="admin page" />
        <PostList />
      </main>
    </AuthCheck>
  );
};

export default AdminPostsPage;

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPosts(await getAdminPostsList(auth.currentUser.uid));
  }, []);

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
      <CreateNewPost />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  // ensure slug is URL safe
  const slug = encodeURI(_.kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;

    const userRef = doc(firestore, 'users', uid);

    // Tip: give all fields a default value here
    const data = {
      title,
      content,
      published,
      slug,
      uid,
      username,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await addDoc(collection(userRef, 'posts'), data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="post title"
      />
      <input
        type="textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="post content"
      />
      <label>publish now?</label>
      <input
        type="checkbox"
        value={published}
        onChange={(e) => setPublished(e.target.value)}
        placeholder="post content"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        create New Post
      </button>
    </form>
  );
}
