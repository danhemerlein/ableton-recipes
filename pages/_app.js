import { Toaster } from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import '../styles/globals.css';
useUserData;

function App({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <>
      <UserContext.Provider value={userData}>
        <NavBar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default App;
