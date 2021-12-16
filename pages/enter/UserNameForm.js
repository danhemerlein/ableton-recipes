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
import Button from 'components/Button';

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

const StyledButton = styled(Button)`
  margin: ${remHelper[8]} 0;
`;

const StyledField = styled.input`
  width: 100%;
  border: ${({ theme }) => theme.textInput.border};
  color: ${({ theme }) => theme.textInput.color};
  padding: ${remHelper[4]};
`;

export function UserNameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isProfane, setIsProfane] = useState(false);
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

        setIsProfane(profanities.includes(username));

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

  function UsernameMessage({ username, isValid, loading, isProfane }) {
    console.log('username message is profane', isProfane);
    if (loading) {
      return <StyledP>Checking...</StyledP>;
    } else if (username && isValid && isProfane) {
      return <StyledP>please select another username</StyledP>;
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
          <Label textAlign="center" as="label" htmlFor="username">
            choose username
          </Label>
          <StyledField
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
            isProfane={isProfane}
          />

          <StyledButton
            CTA="submit"
            mode="primary"
            type="submit"
            // disabled={!isValid && !isProfane}
            disabled={true}
          />
        </Container>
      </form>
    )
  );
}
