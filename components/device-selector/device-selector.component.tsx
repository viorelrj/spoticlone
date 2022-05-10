import {
  IconButton,
  Menu, MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import { ImLaptop } from 'react-icons/im';
import { IoVolumeHighOutline } from 'react-icons/io5';
import { IDeviceSelectorProps } from './device-selector.type';

export const DeviceSelector = ({
  devices, onChange, value,
}: IDeviceSelectorProps) => (
  <Menu>
    <MenuButton
      aria-label="Available devices"
      as={IconButton}
      icon={<ImLaptop />}
      isRound
      variant="ghost"
    />
    <MenuList>
      {devices.map((device) => (
        <MenuItem
          key={device.id}
          onClick={() => onChange?.(device.id)}
          icon={value === device.id ? <IoVolumeHighOutline /> : undefined}
        >
          {device.name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
