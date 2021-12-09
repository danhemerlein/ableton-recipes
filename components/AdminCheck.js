import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Component's children only shown to logged-in users
export default function AuthCheck({ children, fallback }) {
  const { admin } = useContext(UserContext);

  return admin
    ? children
    : fallback || (
        <Link href="/enter">You must be an admin to access this feature</Link>
      );
}
