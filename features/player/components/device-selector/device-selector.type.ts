import { IBaseProps } from '@spc/types/base-props';
import { DeviceType } from 'api/entities';

export interface IDeviceSelectorProps extends IBaseProps {
  devices: DeviceType;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (device: string) => void;
}
