"use client"

import { useState, useEffect } from 'react';
import { Container, SimpleGrid, Box, Flex } from '@mantine/core';
import AddDeviceForm from '@/components/public/devices/AddDeviceForm';
import DeviceCard from '@/components/public/devices/DevicesCard';
import RetireDeviceModal from '@/components/public/devices/RetireDeviceModal';
import { Device, devicesData, deviceSchema, DeviceSchema } from '@/types/deviceTypes';
import { useFormMutation } from '@/hooks/useFormMutation';
import { FormProvider } from 'react-hook-form';
import ProtectedLayout from '@/app/ProtectedLayout'; // Zaktualizowana ścieżka

const addDevice = async (data: DeviceSchema) => {
  return new Promise<DeviceSchema>((resolve) => {
    const deviceWithDefaults = {
      ...data,
      brand: data.brand || '',
      status: data.status || ''
    };
    return deviceWithDefaults;
  });
};

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [deviceToRetire, setDeviceToRetire] = useState<Device | null>(null);

  useEffect(() => {
    // api call here 
    setDevices(devicesData);
  }, []);

  const { methods, handleSubmit } = useFormMutation(
    deviceSchema,
    addDevice,
    {
      onSuccess: (data) => {
        const newDevice: Device = {
          ...data,
          id: String(devices.length + 1),
        };
        setDevices((prev) => [...prev, newDevice]);
      },
    }
  );

  const handleRetireDevice = (device: Device) => {
    setDeviceToRetire(device);
    // delete device api call
    setModalOpened(true);
  };

  const confirmRetireDevice = () => {
    if (deviceToRetire) {
      setDevices((prev) => prev.filter(device => device.id !== deviceToRetire.id));
      // delete device api call 
      setModalOpened(false);
      setDeviceToRetire(null);
    }
  };

  return (
    <ProtectedLayout>
      <Container>
        <RetireDeviceModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onConfirm={confirmRetireDevice}
          deviceName={deviceToRetire?.name || 'urządzenie'}
        />
        <Flex direction={{ base: 'column', md: 'row' }} gap="md">
          <Box flex={2}>
            <SimpleGrid cols={1} spacing="md">
              {devices.map((device) => (
                <DeviceCard key={device.id} device={device} onRetire={() => handleRetireDevice(device)} />
              ))}
            </SimpleGrid>
          </Box>
          <Box flex={1}>
            <FormProvider {...methods}>
              <AddDeviceForm onSubmit={handleSubmit} />
            </FormProvider>
          </Box>
        </Flex>
      </Container>
    </ProtectedLayout>
  );
};

export default DevicesPage;
