import {
  Flex,
  Box,
  FormControl,
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { BiHide, BiShow } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';

export default function SimpleCard() {
  const [isInvalidEmail, setIsInvalidEmail] = React.useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [show, setShow] = React.useState('password');

  const handleInput = e => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!value.includes('@')) {
        setIsInvalidEmail(true);
      } else {
        setIsInvalidEmail(false);
      }
    }
    if (name === 'password') {
      if (value.length < 6) {
        setIsInvalidPassword(true);
      } else {
        setIsInvalidPassword(false);
      }
    }
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    if (isInvalidEmail || isInvalidPassword) {
      e.preventDefault();
    }else{
      console.log(user);
    }
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}
      // minH={'95vh'}
      // sx={{
      //   backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80')`,
      // }}
    >
      <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Text align={'center'} fontSize={'4xl'}>
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={onSubmit}
        >
          <Stack spacing={4} align={'center'}>
            <Text align={'center'} fontSize={'4xl'}>
              IASRG
            </Text>
            <FormControl isRequired>
              <Stack
                spacing={4}
                direction={'column'}
                maxW={'lg'}
                m="0 auto"
                mb={2}
                p={3}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="gray.300" />}
                  />
                  <Input
                    name="email"
                    isInvalid={isInvalidEmail}
                    onChange={handleInput}
                    focusBorderColor="lime"
                    errorBorderColor="red.300"
                    type="email"
                    placeholder="Email"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<RiLockPasswordFill color="gray.300" />}
                  />
                  <Input
                    name="password"
                    isInvalid={isInvalidPassword}
                    onChange={handleInput}
                    focusBorderColor="lime"
                    errorBorderColor="red.300"
                    type={show}
                    placeholder="Password must be at least 6 characters"
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShow(show === 'password' ? 'text' : 'password')
                      }
                    >
                      {show === 'password' ? <BiShow /> : <BiHide />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack alignItems={['center', 'center', 'center']}>
                <Button
                  w={'90%'}
                  m={4}
                  colorScheme={
                    isInvalidEmail || isInvalidPassword ? 'red' : 'green'
                  }
                  type="submit"
                  style={
                    isInvalidEmail || isInvalidPassword
                      ? { cursor: 'not-allowed' }
                      : { cursor: 'pointer' }
                  }
                >
                  Submit
                </Button>
              </Stack>
              <Text align={'center'} fontSize={'sm'} mt={8}>
                Don't have an account?
                <Link href="/signup" color="teal.500" ml={2}>
                  Sign Up
                </Link>
              </Text>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
