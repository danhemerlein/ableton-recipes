import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import CreateUserWithEmailAndPassword from './CreateUserWithEmailAndPassword';
import { SignInWithGoogleButton } from './SignInWithGoogleButton';
import { SignOutButton } from './SignOutButton';
import { UserNameForm } from './UserNameForm';

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
        <>
          <SignInWithGoogleButton />
          <CreateUserWithEmailAndPassword />
        </>
      )}
    </main>
  );
};
export default Enter;
