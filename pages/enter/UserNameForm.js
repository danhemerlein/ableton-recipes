import { doc, getDoc, writeBatch } from 'firebase/firestore';
import _ from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../lib/context';
import { firestore } from '../../lib/firebase';

export function UserNameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const USERNAME_LENGTH = 3;

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    _.debounce(async (username) => {
      if (username.length >= USERNAME_LENGTH) {
        const usernameRef = doc(firestore, 'usernames', username);

        const docSnap = await getDoc(usernameRef);

        const exists = await docSnap.exists();

        setIsValid(!exists);
        setLoading(false);
      }
    }, 250),
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const userDoc = doc(firestore, 'users', user.uid);
    const usernameDoc = doc(firestore, 'usernames', formValue);

    const batch = writeBatch(firestore);

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });

    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < USERNAME_LENGTH) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

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
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <button type="submit" className="btn-green" disabled={!isValid}>
            submit
          </button>
          <h3>debug state</h3>
          <pre>form value: {JSON.stringify(formValue, null, 2)}</pre>
          <pre>loading: {JSON.stringify(loading, null, 2)}</pre>
          <pre>username is valid: {JSON.stringify(isValid, null, 2)}</pre>
        </form>
      </section>
    )
  );
}
