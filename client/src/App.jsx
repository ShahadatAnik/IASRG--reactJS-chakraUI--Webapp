import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import theme from './theme/index';

import NavBar from './components/utils/Navbar';
import Home from './components/Home';
import Paper from './components/Paper';
// import AuthUser from './components/Auth/AuthUser';

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
const Signup = lazy(() => import('./components/LoginAndSignup/Signup'));
const Login = lazy(() => import('./components/LoginAndSignup/Login'));
const PublishPaper = lazy(() => import('./components/Paper'));
const AllPapers = lazy(() => import('./components/Paper/AllPapers'));
const IndividualPaper = lazy(() =>
  import('./components/Paper/IndividualPaper')
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          {/* <AuthUser> */}
          <Route path="/" element={<Home />} />
          <Route
            path="/*"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <NotFoundPage />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/paper-publish"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <PublishPaper />
              </Suspense>
            }
          />
          <Route
            path="/papers"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <AllPapers />
              </Suspense>
            }
          />
          <Route
            path="/papers/:id"
            element={
              <Suspense fallback={<LoadingIcon />}>
                <IndividualPaper />
              </Suspense>
            }
          />
          {/* </AuthUser> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
