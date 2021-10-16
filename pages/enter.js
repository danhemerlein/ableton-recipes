import { signInWithPopup } from 'firebase/auth';
import { useContext, useState } from 'react';
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
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = (_) => _;
  const onChange = (_) => _;

  return (
    !username && (
      <section>
        <h3>choose username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            type="text"
            value={formValue}
            onChange={onChange}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            submit
          </button>
          <h3>debug state</h3>
          <pre>{JSON.stringify(formValue, null, 2)}</pre>
        </form>
      </section>
    )
  );
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
