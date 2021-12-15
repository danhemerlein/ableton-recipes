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
    textInput: {
      border: `1px solid ${generalScheme.black}`,
      color: generalScheme.black,
    },
    link: {
      primary: { color: generalScheme.black },
      secondary: { color: generalScheme.white },
    },
    button: {
      primary: {
        background: generalScheme.white,
        border: `1px solid ${generalScheme.black}`,
        color: generalScheme.black,
        disabled: '#6b6b6b',
        backgroundHover: generalScheme.black,
        colorHover: generalScheme.white,
      },
      secondary: {
        disabled: '#6b6b6b',
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
