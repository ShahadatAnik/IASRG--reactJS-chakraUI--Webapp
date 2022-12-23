import React from 'react';
import Axios from 'axios';
import { sha256, sha224 } from 'js-sha256';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputRightAddon,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Link,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BiHide, BiShow } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { RiProfileLine } from 'react-icons/ri';

import { redirect } from 'react-router-dom';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function Signup() {
  const navigate = useNavigate();
  const bpv = useBreakpointValue({ base: 'md', md: 'lg' });
  const [isInvalidName, setIsInvalidName] = React.useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = React.useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
  const [isInvalidPhone, setIsInvalidPhone] = React.useState(false);
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profession: '',
  });

  const [show, setShow] = React.useState('password');

  const handleInput = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (value.length < 3) {
        setIsInvalidName(true);
      } else {
        setIsInvalidName(false);
      }
    }
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
    if (name === 'phone') {
      if (value.length < 11 || value.length > 11) {
        setIsInvalidPhone(true);
      } else {
        setIsInvalidPhone(false);
      }
    }
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    if (
      isInvalidName ||
      isInvalidEmail ||
      isInvalidPassword ||
      isInvalidPhone
    ) {
      e.preventDefault();
    } else {
      if (user.profession === '') {
        user.profession = '1';
      }
      Axios.post(
        'http://localhost:3001/user/create_user/',
        {
          name: user.name,
          email: user.email,
          password: sha256(user.password),
          phone: user.phone,
          profession: user.profession,
        },
        navigate('/Login')
      );
    }
  };
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 20 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Join the{' '}
            <Text as={'span'} color={'green.400'}>
              community
            </Text>
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map(avatar => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={bpv}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Join our team
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              something will be written here
            </Text>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={onSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserCircle color="gray.300" />}
                />
                <Input
                  name="name"
                  isInvalid={isInvalidName}
                  onChange={handleInput}
                  focusBorderColor="lime"
                  errorBorderColor="red.300"
                  type="text"
                  placeholder="Name must be at least 3 characters"
                  required
                />
              </InputGroup>

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
                <InputLeftAddon children="+88" />
                <Input
                  name="phone"
                  isInvalid={isInvalidPhone}
                  onChange={handleInput}
                  focusBorderColor="lime"
                  errorBorderColor="red.300"
                  type="number"
                  placeholder="Phone Number must be 11 digits"
                  required
                />
              </InputGroup>
              <InputGroup border={'1px solid #e2e8f0'} rounded={'md'} p={2}>
                <RadioGroup ml={1} defaultValue="1" required name="profession">
                  <Stack
                    spacing={5}
                    align="center"
                    direction="row"
                    justify={'center'}
                  >
                    <RiProfileLine color="gray.300" />
                    <Radio
                      colorScheme="red"
                      onChange={e => {
                        setUser({ ...user, profession: '1' });
                      }}
                      value="1"
                    >
                      Professor
                    </Radio>
                    <Radio
                      colorScheme="green"
                      onChange={e => {
                        setUser({ ...user, profession: '2' });
                      }}
                      value="2"
                    >
                      Student
                    </Radio>
                  </Stack>
                </RadioGroup>
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
            <Button
              w={'full'}
              mt={8}
              colorScheme={
                isInvalidName ||
                isInvalidEmail ||
                isInvalidPassword ||
                isInvalidPhone
                  ? 'red'
                  : 'green'
              }
              type="submit"
              style={
                isInvalidName ||
                isInvalidEmail ||
                isInvalidPassword ||
                isInvalidPhone
                  ? { cursor: 'not-allowed' }
                  : { cursor: 'pointer' }
              }
            >
              Submit
            </Button>
          </Box>
          <Text align={'center'} fontSize={'sm'} mt={8}>
            Already have an account?
            <Link href="/login" color="teal.500" ml={2}>
              Login
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
