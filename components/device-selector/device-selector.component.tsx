import { Select } from '@chakra-ui/react';
import { IDeviceSelectorProps } from './device-selector.type';

export function DeviceSelector({
  devices, value, onChange, className,
}: IDeviceSelectorProps) {
  return (
    <Select
      className={className}
      isFullWidth={false}
      value={value}
      onChange={(ev) => onChange?.(ev.target.value)}
    >
      {devices.map((device) => <option key={device.id} value={device.id}>{device.name}</option>)}
    </Select>
  );
}
