import { auth } from '../../lib/firebase';

export function SignOutButton() {
  return <button onClick={() => auth.signOut()}>sign out</button>;
}
