import AuthCheck from '@components/AuthCheck';
import UserProfile from '@pages/[username]/UserProfile';
import Metatags from 'components/Metatags';
import { getDoc } from 'firebase/firestore';
import { getLikedPostsByUser, getUserWithUsername } from 'lib/firebase';

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
  let likedPosts = null;

  if (userDocRef) {
    user = userDocSnap.data();
    likedPosts = await getLikedPostsByUser(userDocSnap.id);
  }

  return {
    // will be pased to the page componet as props
    props: { user, likedPosts },
  };
}

const UserProfilePage = ({ user, likedPosts }) => {
  return (
    <main>
      <Metatags title="user profile page" />

      <AuthCheck>
        <UserProfile user={user} likedPosts={likedPosts} />
      </AuthCheck>
    </main>
  );
};
export default UserProfilePage;
