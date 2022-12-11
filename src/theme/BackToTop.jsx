import React from 'react';
import { BiUpArrow } from 'react-icons/bi';
import { useColorModeValue, IconButton } from '@chakra-ui/react';

export const BackToTop = props => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      size="lg"
      color={useColorModeValue('yellow.600', 'yellow.300')}
      variant="ghost"
      onClick={backToTop}
      icon={<BiUpArrow size="25px" />}
      {...props}
    />
  );
};
