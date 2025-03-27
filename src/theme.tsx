import { extendTheme, ChakraProvider, ThemeConfig } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode('gray.100', 'gray.900')(props),
      },
    }),
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ChakraProvider theme={customTheme}>
      {children}
    </ChakraProvider>
  );
};

export default ThemeProvider;