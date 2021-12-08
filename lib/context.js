import { createContext, useContext } from 'react';

export const UserContext = createContext({ user: null, username: null });

const ThemeContext = createContext({});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeContextProvider = ({ children, data }) => {
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};
