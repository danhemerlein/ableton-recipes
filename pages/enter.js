import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, provider } from '../lib/firebase';

function SignInButton() {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider);
  };
  return (
    <button className="btn-green" onClick={signInWithGoogle}>
      sign in with google
    </button>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>sign out</button>;
}

function UserNameForm() {
  return null;
}

const Enter = ({}) => {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};
export default Enter;
