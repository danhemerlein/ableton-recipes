import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import PostFeed from '../../components/PostFeed';
import { auth, getAdminPostsList } from '../../lib/firebase';

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
      <h1>
        <Link href="/admin/create">Create New Post</Link>
      </h1>
      <h1>or</h1>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
