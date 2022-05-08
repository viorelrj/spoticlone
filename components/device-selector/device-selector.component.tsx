import { Select } from '@chakra-ui/react';
import { IDeviceSelectorProps } from './device-selector.type';

export function DeviceSelector({ devices, onChange }: IDeviceSelectorProps) {
  const handleChange = (id) => {
    const item = devices.find((it) => it.id === id);
    if (!item) return;
    onChange?.(item);
  };

  return (
    <Select isFullWidth={false} onChange={(ev) => handleChange(ev.target.value)}>
      {devices.map((device) => <option key={device.id} value={device.id}>{device.name}</option>)}
    </Select>
  );
}
