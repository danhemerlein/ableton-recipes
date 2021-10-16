import { Toaster } from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { UserContext } from '../lib/context';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <UserContext.Provider value={{ user: {}, username: 'dan' }}>
        <NavBar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default App;
