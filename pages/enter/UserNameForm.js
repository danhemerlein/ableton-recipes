import { doc, getDoc, writeBatch } from 'firebase/firestore';
import _ from 'lodash';
import { above } from 'styles/utilities';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FlexContainer } from 'styles/elements/containers';
import { UserContext } from 'lib/context';
import { firestore } from 'lib/firebase';
import { P, H2 } from 'styles/elements/typography';
import { remHelper } from 'lib/utilities/remHelper';
import styled from 'styled-components';
import { profanities } from 'profanities';

const Container = styled(FlexContainer)`
  width: 100%;
  margin: 0 auto;

  ${above.tablet`
    width: 50%;
  `};
`;

const Label = styled(H2)`
  margin-bottom: ${remHelper[8]};
`;

const StyledP = styled(P)`
  margin: ${remHelper[8]} 0;
`;

const StyledButton = styled.button`
  margin: ${remHelper[8]} 0;
`;

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

        const exists = docSnap.exists();

        console.log(profanities.includes('username')); // true

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
      admin: false,
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
      return <StyledP>Checking...</StyledP>;
    } else if (isValid) {
      return <StyledP>{username} is available!</StyledP>;
    } else if (username && !isValid) {
      return <StyledP>That username is taken or invalid</StyledP>;
    } else {
      return null;
    }
  }

  return (
    !username && (
      <form onSubmit={onSubmit}>
        <Container direction="column">
          <Label as="label" htmlFor="username">
            choose username
          </Label>
          <input
            name="username"
            type="text"
            id="username"
            value={formValue}
            onChange={onChange}
          />

          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <StyledButton type="submit" disabled={!isValid}>
            submit
          </StyledButton>

          {/* <h3>debug state</h3> */}
          {/* <pre>form value: {JSON.stringify(formValue, null, 2)}</pre> */}
          {/* <pre>loading: {JSON.stringify(loading, null, 2)}</pre> */}
          {/* <pre>username is valid: {JSON.stringify(isValid, null, 2)}</pre> */}
        </Container>
      </form>
    )
  );
}
