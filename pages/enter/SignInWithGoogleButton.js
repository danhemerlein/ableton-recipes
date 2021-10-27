import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../lib/firebase';

export function SignInWithGoogleButton() {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider);
  };

  return (
    <button className="btn-green" onClick={signInWithGoogle}>
      sign in with google
    </button>
  );
}