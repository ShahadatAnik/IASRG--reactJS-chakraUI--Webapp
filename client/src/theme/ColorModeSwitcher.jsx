import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
    size="lg"
    color={useColorModeValue('yellow.600', 'yellow.300')}
    variant="ghost"
    onClick={toggleColorMode}
    icon={<SwitchIcon size="25px" />}
      {...props}
    />
  );
};
