import { useRouter } from 'next/dist/client/router';
import { auth } from 'lib/firebase';

export function SignOutButton() {
  const router = useRouter();
  const handleClick = () => {
    auth.signOut();
    router.push('/');
  };
  return <button onClick={handleClick}>sign out</button>;
}
