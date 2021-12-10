import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminCheck from 'components/AdminCheck';
import { UserContext } from 'lib/context';
import { useContext } from 'react';
import Metatags from 'components/Metatags';
import PostFeed from 'components/PostFeed';
import { auth, getAdminPostsList } from 'lib/firebase';

import { H1, H2 } from 'styles/elements/typography';

const AdminPage = () => {
  return (
    <AdminCheck>
      <main>
        <Metatags title="admin page" />

        <H1>Admin Panel</H1>

        <H2>
          <Link href="/admin/create">Create New Post</Link>
          or
        </H2>
        <H2>Manage your Posts</H2>

        <PostList />
      </main>
    </AdminCheck>
  );
};

export default AdminPage;

function PostList() {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(async () => {
    setPosts(await getAdminPostsList(user.uid));
  }, []);

  return <PostFeed posts={posts} admin />;
}
