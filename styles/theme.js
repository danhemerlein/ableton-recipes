import generalScheme from './general';

const theme = {
  light: {
    background: generalScheme.white,
    foreground: generalScheme.black,
    anchor: generalScheme.black,
    border: `1px solid ${generalScheme.black}`,
    tagBackground: '#000000',
    tagForeground: '#FFFFFF',
    general: generalScheme,
    button: {
      primary: {
        background: generalScheme.white,
        border: `1px solid ${generalScheme.black}`,
        color: generalScheme.black,
        backgroundHover: generalScheme.black,
        colorHover: generalScheme.white,
      },
      secondary: {
        background: generalScheme.black,
        color: generalScheme.white,
        border: `1px solid ${generalScheme.black}`,
        backgroundHover: generalScheme.white,
        colorHover: generalScheme.black,
      },
    },
  },
};

export default theme;
