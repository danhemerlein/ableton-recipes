import { getDoc } from 'firebase/firestore';
import PostFeed from '../../components/PostFeed';
import UserProfile from '../../components/UserProfile';
import { getPostsByUser, getUserWithUsername } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDocRef = await getUserWithUsername(username);
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
  console.log(posts);

  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
};
export default UserProfilePage;
