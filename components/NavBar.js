import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

const NavBar = ({}) => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">feed</Link>
        </li>

        {/* user is signed in and has a username */}
        {username && (
          <>
            <li>
              <Link href="/admin">view admin panel</Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt="" />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed in OR has not created a user name */}
        {!username && (
          <li>
            <Link href="/enter">log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
