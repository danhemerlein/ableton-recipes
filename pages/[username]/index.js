import { getDoc } from 'firebase/firestore';
import PostFeed from '../../components/PostFeed';
import UserProfile from '../../components/UserProfile';
import { getPostsByUser, getUserWithUsername } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDocRef = await getUserWithUsername(username);

  if (!userDocRef) {
    return {
      notFound: true,
    };
  }

  const userDocSnap = await getDoc(userDocRef);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDocRef) {
    user = userDocSnap.data();
    posts = await getPostsByUser(userDocRef);
  }

  return {
    // will be pased to the page componet as props
    props: { user, posts },
  };
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <main>
      <Metatags title="user profile page" />

      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
};
export default UserProfilePage;
