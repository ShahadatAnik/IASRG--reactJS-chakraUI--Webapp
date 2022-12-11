import { Box, Heading, Text, Button } from '@chakra-ui/react';

export default function NotFoundPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, green.400, green.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2} color="red.500">
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        colorScheme="green"
        bgGradient="linear(to-l, green.400, green.500, green.600)"
        color="white"
        variant="solid"
        as={'a'}
        href="/"
      >
        Go to Home
      </Button>
    </Box>
  );
}
