"use client"

import { useState, useEffect } from 'react';
import { Container, SimpleGrid, Box, Flex } from '@mantine/core';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AddDeviceForm from '@/components/public/devices/addDeviceForm';
import DeviceCard from '@/components/public/devices/DevicesCard';
import RetireDeviceModal from '@/components/public/devices/RetireDeviceModal';
import { Device, devicesData } from '@/types/deviceTypes';

const deviceSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa jest wymagana' }),
  brand: z.string().min(1, { message: 'Marka jest wymagana' }),
  model: z.string().min(1, { message: 'Model jest wymagany' }),
  deviceType: z.string().min(1, { message: 'Typ urządzenia jest wymagany' }),
  serialNumber: z.string().min(1, { message: 'Numer seryjny jest wymagany' }),
  status: z.string().min(1, { message: 'Status jest wymagany' }),
  imageUrl: z.string().optional(),
});

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [deviceToRetire, setDeviceToRetire] = useState<string | null>(null);

  useEffect(() => {
    setDevices(devicesData);
  }, []);

  const methods = useForm<Device>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: '',
      brand: '',
      model: '',
      deviceType: '',
      serialNumber: '',
      status: '',
      imageUrl: '',
    },
  });

  const onSubmit = (data: Device) => {
    const newDevice = { ...data, id: String(devices.length + 1) };
    setDevices((prev) => [...prev, newDevice]);
  };

  const handleRetireDevice = (id: string) => {
    setDeviceToRetire(id);
    setModalOpened(true);
  };

  const confirmRetireDevice = () => {
    if (deviceToRetire) {
      setDevices((prev) => prev.filter(device => device.id !== deviceToRetire));
      setModalOpened(false);
      setDeviceToRetire(null);
    }
  };

  return (
    <Container>
      <RetireDeviceModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onConfirm={confirmRetireDevice}
      />
      <Flex direction={{ base: 'column', md: 'row' }} gap="md">
        <Box flex={2}>
          <SimpleGrid cols={1} spacing="md">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} onRetire={handleRetireDevice} />
            ))}
          </SimpleGrid>
        </Box>
        <Box flex={1}>
          <FormProvider {...methods}>
            <AddDeviceForm onSubmit={methods.handleSubmit(onSubmit)} />
          </FormProvider>
        </Box>
      </Flex>
    </Container>
  );
};

export default DevicesPage;
