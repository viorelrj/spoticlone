import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propEq } from 'ramda';
import { getAvailableDevices, transferPlayback } from 'api';
import { DeviceType } from 'api/entities';

type ResponseContext = {
  cachedDevices: DeviceType[]
}

const useDevicesQuery = () => useQuery({
  queryKey: ['devices'],
  queryFn: getAvailableDevices,
  placeholderData: [],
  initialData: [],
  staleTime: 3000,
});

const useDevicesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferPlayback,
    onMutate: async ({ id }): Promise<ResponseContext> => {
      const cachedDevices = queryClient.getQueryData(['devices']) as DeviceType[];
      const newDevice = cachedDevices.find(propEq(id, 'id'));

      if (!newDevice) return { cachedDevices };

      await queryClient.cancelQueries({ queryKey: ['devices'] });

      const newDevices = cachedDevices.map((device) => ({
        ...device,
        isActive: device.id === id,
      }));

      queryClient.setQueryData(['devices'], () => newDevices);

      return { cachedDevices };
    },
    onError: (err, req, context) => {
      queryClient.setQueryData(['devices'], (context as ResponseContext).cachedDevices);
    },
  });
};

export { useDevicesQuery, useDevicesMutation };
