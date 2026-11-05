import {
  IconButton, Menu, Portal,
} from '@chakra-ui/react';
import { ImLaptop } from 'react-icons/im';
import { IoVolumeHighOutline } from 'react-icons/io5';
import { IDeviceSelectorProps } from './device-selector.type';

export const DeviceSelector = ({
  devices, onChange, value,
}: IDeviceSelectorProps) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <IconButton
        aria-label="Available devices"
        borderRadius="full"
        variant="ghost"
      >
        <ImLaptop />
      </IconButton>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          {Object.values(devices).map((device) => (
            <Menu.Item
              key={device.id}
              value={device.id}
              onClick={() => onChange(device.id)}
            >
              {value === device.id ? <IoVolumeHighOutline /> : null}
              {device.name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);
