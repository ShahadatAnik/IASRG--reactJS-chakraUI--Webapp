import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {
  Stack,
  Text,
  Input,
  Grid,
  GridItem,
  Box,
  Flex,
  Spacer,
  Center,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsCalendarFill, BsPencilSquare } from 'react-icons/bs';
import { MdEditLocation } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

export default function Index() {
  const [papers, setPapers] = useState([]);
  const [username, setUsername] = useState('');


  useEffect(() => {
    if (localStorage.getItem('loggedin') !== 'true') {
      window.location.href = '/login';
    }
    fetch('http://localhost:3001/paper/getPaper/')
      .then(resp => resp.json())
      .then(resp => setPapers(resp))
      .catch(error => console.log(error));
  },);

  return (
    <Box p={2} mx={2}>
      <Center mb={4}>
        <Input
          type="text"
          placeholder="Papers Name"
          autoFocus
          focusBorderColor={'green.500'}
          size={'lg'}
          maxW={'lg'}
          alignSelf={'center'}
          onChange={e =>
            setPapers(
              papers.filter(paper => {
                return paper.paper_name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase());
              })
            )
          }
        />
      </Center>
      <Grid templateColumns={['repeat(1, 1fr)']} gap={[2, 2, 4]}>
        {papers.map((paper, index) => (
          <Link to={`/papers/${paper.id}`}>
            <GridItem
              key={index}
              boxShadow={['md', 'md', 'lg']}
              p={4}
              m={2}
              borderRadius="md"
              bg={'green.500'}
              color="yellow.300"
              _hover={{ bg: 'green.600' }}
              textAlign="center"
            >
              <Stack>
                <Heading
                  as={'h1'}
                  align={'center'}
                  fontSize={['4xl', '4xl', '6xl']}
                  color={'yellow.300'}
                >
                  {paper.paper_name}
                </Heading>

                <Flex
                  gap={1}
                  align={['flex-start', 'flex-start', 'center']}
                  direction={['column', 'column', 'row']}
                >
                  <FaUserCircle size={'20px'} color="gray.300" />
                  <Text
                    align={'center'}
                    color={'yellow.300'}
                    fontSize={['md', 'md', 'lg']}
                  >
                    {paper.name}
                  </Text>
                  <Spacer />

                  <MdEditLocation mt={2} size={'20px'} color="gray.300" />
                  <Text
                    align={'left'}
                    color={'yellow.300'}
                    fontSize={['md', 'md', 'lg']}
                  >
                    {paper.publication_place}
                  </Text>

                  <Spacer />

                  <BsCalendarFill mt={2} size={'20px'} color="gray.300" />
                  <Text
                    align={'left'}
                    color={'yellow.300'}
                    fontSize={['md', 'md', 'lg']}
                  >
                    {paper.publication_date.split('T')[0]}
                  </Text>
                </Flex>
              </Stack>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}
