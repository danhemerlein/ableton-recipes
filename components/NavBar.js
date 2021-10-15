import Link from 'next/link';

const NavBar = ({}) => {
  const user = null;
  const username = null;

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
              <Link href="/admin">write posts</Link>
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
            <Link href="enter">log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
