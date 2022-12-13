import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaYoutube, FaFacebook, FaGithub, FaLink } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue('gray.100', '#141214')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {new Date().getFullYear()} ILMIYAH</Text>
        <Text>
          Developed by{' '}
          <Link href="https://shahadatanik.github.io/" isExternal>
            Shahadat Anik
          </Link>
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Website'}
            href={'https://shahadatanik.github.io/'}
          >
            <FaLink />
          </SocialButton>
          <SocialButton
            label={'Facebook'}
            href={'https://www.facebook.com/md.shahadat.anik/'}
          >
            <FaFacebook />
          </SocialButton>
          <SocialButton
            label={'Github'}
            href={'https://github.com/ShahadatAnik'}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton
            label={'YouTube'}
            href={'https://www.youtube.com/@ShahadatAnik'}
          >
            <FaYoutube />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
