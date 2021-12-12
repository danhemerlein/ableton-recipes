import { Toaster } from 'react-hot-toast';
import NavBar from 'components/NavBar';
import { UserContext } from 'lib/context';
import { useUserData } from 'lib/hooks';
import GlobalReset from 'styles/global';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeContextProvider } from 'lib/context';
import { remHelper } from 'lib/utilities/remHelper';
import theme from 'styles/theme';

const AppContainer = styled.div`
  padding: ${remHelper[16]};
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
`;

function App({ Component, pageProps }) {
  const userData = useUserData();
  const mode = 'light';

  return (
    <AppContainer>
      <GlobalReset />

      <ThemeProvider theme={theme[mode]}>
        <ThemeContextProvider data={mode}>
          <UserContext.Provider value={userData}>
            <NavBar />
            <Component {...pageProps} />
            <Toaster />
          </UserContext.Provider>
        </ThemeContextProvider>
      </ThemeProvider>
    </AppContainer>
  );
}

export default App;
