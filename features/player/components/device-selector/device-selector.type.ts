import { IBaseProps } from '@spc/types/base-props';
import { IDevice } from 'api/api.interface';

export interface IDeviceSelectorProps extends IBaseProps {
  devices: IDevice[];
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (device: string) => void;
}
