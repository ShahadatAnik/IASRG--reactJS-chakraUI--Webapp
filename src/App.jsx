import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import theme from './theme/index';

import { ColorModeSwitcher } from './theme/ColorModeSwitcher';
import { BackToTop } from './theme/BackToTop';
import NavBar from './components/utils/Navbar';
import Home from './components/Home';

function LoadingIcon() {
  return (
    <Center>
      <Spinner
        thickness="6px"
        speed=".65s"
        emptyColor="transparent"
        color="green.500"
        size="xl"
      />
    </Center>
  );
}

const NotFoundPage = lazy(() => import('./components/utils/NotFoundPage'));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <ColorModeSwitcher
        justifySelf="flex-end"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: '9999',
        }}
      />
      <BackToTop
        justifySelf="flex-end"
        sx={{
          position: 'fixed',
          bottom: '5rem',
          right: '1rem',
          zIndex: '9999',
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
