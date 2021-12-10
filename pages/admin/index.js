import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminCheck from '../../components/AdminCheck';
import Metatags from '../../components/Metatags';
import PostFeed from '../../components/PostFeed';
import { auth, getAdminPostsList } from '../../lib/firebase';
import { H1, H2 } from 'styles/elements/typography';

const AdminPostsPage = () => {
  return (
    <AdminCheck>
      <main>
        <Metatags title="admin page" />
        <PostList />
      </main>
    </AdminCheck>
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
      <H1>Admin Panel</H1>

      <H2>
        <Link href="/admin/create">Create New Post</Link>
        or
      </H2>
      <H2>Manage your Posts</H2>

      {/* <TagsFilter /> */}

      <PostFeed posts={posts} admin />
    </>
  );
}
