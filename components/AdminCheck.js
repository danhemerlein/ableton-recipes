import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from 'lib/context';
import { getDoc, doc } from 'firebase/firestore';
import { getUserDataById, firestore } from 'lib/firebase';

// Component's children only shown to logged-in users
export default function AuthCheck({ children, fallback }) {
  const { user } = useContext(UserContext);

  if (user !== null) {
    // admin = getUserDataById(user.id);
    console.log(user.uid);
  }

  return true
    ? children
    : fallback || (
        <Link href="/enter">You must be an admin to access this feature</Link>
      );
}
