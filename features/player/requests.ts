import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailableDevices, transferPlayback } from 'api';
import { DeviceType } from 'api/entities';

type IContext = {
  previousDevices: DeviceType[]
}

const useDevicesQuery = () => useQuery({
  queryKey: ['devices'],
  queryFn: getAvailableDevices,
  placeholderData: [],
  initialData: [],
  staleTime: 0,
});

const useDevicesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transferPlayback,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['devices'] });

      const previousDevices = queryClient.getQueryData(['devices']) as DeviceType[];

      const newDevices = previousDevices.map((device) => {
        if (device.id !== id) return device;

        return {
          ...device,
          isActive: true,
        };
      });

      queryClient.setQueryData(['devices'], () => newDevices);

      return { previousDevices };
    },
    onError: (err, req, context) => {
      queryClient.setQueryData(['devices'], (context as IContext)?.previousDevices);
    },
  });
};

export { useDevicesQuery, useDevicesMutation };
