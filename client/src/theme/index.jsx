import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// mode('light', 'dark')(props)

const styles = {
  global: props => ({
    body: {
      color: mode('green.600', 'green.200')(props),
      bg: mode('gray.100', '#141214')(props),
    },
  }),
};

const components = {
  Drawer: {
    baseStyle: props => ({
      dialog: {
        bg: mode('white', '#141214')(props),
      },
    }),
  },
};

const theme = extendTheme({
  config,
  components,
  styles,
  fonts: {
    heading: ['Roboto', 'Hind Siliguri'], // <-- this is the font family
    
  },
});

export default theme;
