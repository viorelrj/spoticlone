import {
  applySpec, prop, pipe,
} from 'ramda';

const Device = applySpec({
  id: pipe(prop('id'), String),
  isActive: pipe(prop('is_active'), Boolean),
  name: pipe(prop('name'), String),
});

export type DeviceType = ReturnType<typeof Device>;

export { Device };
