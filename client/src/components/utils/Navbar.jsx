import React from 'react';
import {
  Link,
  Box,
  Flex,
  Text,
  keyframes,
  Stack,
  HStack,
  Tag,
  TagRightIcon,
  TagLabel,
} from '@chakra-ui/react';

import { FiLogOut } from 'react-icons/fi';

const wave = keyframes`
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }

  100% {
    transform: rotate(5deg);
  }
`;

function Logo(props) {
  return (
    <Box as="a" {...props}>
      <Link color={'green.500'} href="/">
        <Text
          bg="yellow.300"
          // bgGradient="linear(to-r, yellow.300, green.500)"
          _hover={{
            color: 'yellow.300',
            // wave animation
          }}
          sx={{
            display: 'inline-block',
            // wave animation
            animation: `${wave} 2s ease-in-out infinite`,
          }}
          bgClip="text"
          fontSize={['2xl', '2xl', '3xl']}
          fontWeight="extrabold"
        >
          IASRG
        </Text>
      </Link>
    </Box>
  );
}

const NavBar = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer isOpen={isOpen} {...props}>
      <Logo />
      {localStorage.getItem('loggedin') === 'true' ? (
        <>
          <MenuToggle toggle={toggle} isOpen={isOpen} />
          <MenuLinks isOpen={isOpen} />
        </>
      ) : (
        null
      )}
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg
    width="24px"
    fill="yellow.300"
    viewBox="0 0 18 18"
    xmlns="https://www.w3.org/2000/svg"
  >
    <title>Close</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="yellow.300"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="24px" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg">
    <title>Menu</title>
    <path fill="yellow.300" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const revealUp = keyframes`
from {
  transform: translate3d( -50px , -30px, 0);
  opacity: 0;
}
to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
`;

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Link color={'yellow.300'} href={to}>
      <Text
        display="block"
        bg={to === window.location.pathname ? 'yellow.300' : 'green.500'}
        color={to === window.location.pathname ? 'green.500' : 'yellow.300'}
        _hover={{
          color: 'green.500',
          backgroundColor: 'yellow.300',
        }}
        fontWeight="bold"
        px={3}
        py={1}
        rounded="md"
        border={'.5px solid #F6E05E'}
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  const logout = () => {
    localStorage.setItem('loggedin', 'false');
    localStorage.setItem('user', '');
    console.log('logout');
    window.location.href = '/login';
  };
  return (
    <Box
      rounded={'md'}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      // animation={isOpen ? `${revealUp} 1s ease-in-out` : ''}
    >
      <Stack
        spacing={8}
        align="center"
        color={['white', 'white', 'primary.700', 'primary.700']}
        justify={['center', 'space-between', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/papers">Papers</MenuItem>
        <MenuItem to="/paper-publish">Publish Paper</MenuItem>
        <Link
          color={'yellow.300'}
          href={'/login'}
          _hover={{
            color: 'yellow.300',
            backgroundColor: 'red.500',
            rounded: 'md',
          }}
        >
          <Tag size={'lg'} bg={'red.500'} border={'.5px solid #F6E05E'}>
            <Text
              display="block"
              color={'yellow.300'}
              fontWeight="bold"
              py={1}
              rounded="md"
              onClick={logout}
            >
              Logout
            </Text>
            <TagRightIcon as={FiLogOut} color={'yellow.300'} />
          </Tag>
        </Link>

        {/* <MenuItem to="/signup" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "white", "white"]}
            bg={["white", "white", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
            }}
          >
            Create Account
          </Button>
        </MenuItem> */}
      </Stack>
    </Box>
  );
};

const fromTop = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const toTop = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, -100%, 0);
  }
`;

const NavBarContainer = ({ isOpen, children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={2}
      px={2}
      py={1}
      bg={'green.500'}
      roundedBottom={'lg'}
      animation={isOpen ? `${fromTop} ease 1s forwards` : ``}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
