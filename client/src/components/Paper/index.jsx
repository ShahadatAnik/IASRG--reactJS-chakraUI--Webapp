import Axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Textarea,
  Flex,
  Center,
} from '@chakra-ui/react';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsCalendarFill, BsPencilSquare } from 'react-icons/bs';
import { MdEditLocation } from 'react-icons/md';

export default function Index() {
  const [paper, setPaper] = useState({
    id: localStorage.getItem('user'),
    name: '',
    publication_date: '',
    publication_place: '',
    full_text: '',
  });
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [isInvalidPlace, setIsInvalidPlace] = useState(false);
  const [isInvalidFullText, setIsInvalidFullText] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedin') !== 'true') {
      window.location.href = '/login';
    }
  }, []);

  const handleInput = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (value.length < 3) {
        setIsInvalidName(true);
      } else {
        setIsInvalidName(false);
      }
    }
    if (name === 'publication_date') {
      if (value.length < 6) {
        setIsInvalidDate(true);
      } else {
        setIsInvalidDate(false);
      }
    }
    if (name === 'publication_place') {
      if (value.length < 3) {
        setIsInvalidPlace(true);
      } else {
        setIsInvalidPlace(false);
      }
    }
    if (name === 'full_text') {
      if (value.length < 20) {
        setIsInvalidFullText(true);
      } else {
        setIsInvalidFullText(false);
      }
    }
    setPaper(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    if (isInvalidName || isInvalidDate || isInvalidPlace || isInvalidFullText) {
      e.preventDefault();
    } else {
      Axios.post('http://localhost:3001/paper/publish/', {
        publisher_id: paper.id,
        paper_name: paper.name,
        publication_date: paper.publication_date,
        publication_place: paper.publication_place,
        paper_full_text: paper.full_text,
      }).then(response => {
        if (response.data == 'Paper published') {
          alert('Paper published');
          window.location.href = '/..';
        } else {
          alert('Error');
        }
      });
    }
  };

  return (
    <Container maxW="container.xl" boxShadow="2xl" rounded="md" centerContent>
      <Stack
        rounded={'md'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        w={'100%'}
      >
        <Stack spacing={4} align="center">
          <Heading
            color={'yellow.700'}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          >
            Paper Information
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
                children={<HiOutlineNewspaper color="gray.300" />}
              />
              <Input
                name="name"
                isInvalid={isInvalidName}
                onChange={handleInput}
                focusBorderColor="lime"
                errorBorderColor="red.300"
                type="text"
                placeholder="Paper name"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsCalendarFill color="gray.300" />}
              />
              <Input
                name="publication_date"
                isInvalid={isInvalidDate}
                onChange={handleInput}
                focusBorderColor="lime"
                errorBorderColor="red.300"
                size="md"
                type="date"
                placeholder="Date must be in the format YYYY-MM-DD"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdEditLocation color="gray.300" />}
              />
              <Input
                name="publication_place"
                isInvalid={isInvalidPlace}
                onChange={handleInput}
                focusBorderColor="lime"
                errorBorderColor="red.300"
                type="text"
                placeholder="Where did you publish the paper?"
                required
              />
            </InputGroup>
            <InputGroup>
              <Textarea
                name="full_text"
                rows={10}
                height="auto"
                isInvalid={isInvalidFullText}
                onChange={handleInput}
                focusBorderColor="lime"
                errorBorderColor="red.300"
                type="text"
                placeholder="Write the full text of the paper here"
                required
              />
            </InputGroup>
          </Stack>
          <Button
            w={'full'}
            mt={8}
            colorScheme={
              isInvalidName ||
              isInvalidDate ||
              isInvalidPlace ||
              isInvalidFullText
                ? 'red'
                : 'green'
            }
            type="submit"
            style={
              isInvalidName ||
              isInvalidDate ||
              isInvalidPlace ||
              isInvalidFullText
                ? { cursor: 'not-allowed' }
                : { cursor: 'pointer' }
            }
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
