import React from 'react';
import { SimpleGrid, Card, Text, Button, Group, Select, Stack, Title } from '@mantine/core';
import {GetOrganizationDevicesResponse} from '@/api/public/get/getOrganizationDevices'

type Props = {
  devices: GetOrganizationDevicesResponse[];
  action: string;
  setAction: (action: string) => void;
  setSelectedDevice: (device: GetOrganizationDevicesResponse) => void;
  setDeviceModalOpened: (opened: boolean) => void;
};

const DeviceList: React.FC<Props> = ({ devices, action, setAction, setSelectedDevice, setDeviceModalOpened }) => {
  return (
    <div>
      <Group mb="md">
        <Title order={3}>Urządzenia</Title>
        <Button onClick={() => setDeviceModalOpened(true)}>Dodaj urządzenie</Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 'lg', sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
        {devices.map(device => (
          <Card key={device.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              <Text size="lg">{device.name}</Text>
              <Text>Lokalizacja: {device.location}</Text>
              <Text>Opiekun: {device.caretaker}</Text>
              <Group>
                <Select
                  placeholder="Wybierz akcję"
                  data={[
                    { value: 'withdraw', label: 'Wycofaj' },
                    { value: 'move', label: 'Przenieś' },
                    { value: 'assign', label: 'Przypisz opiekuna' },
                  ]}
                  value={action}
                  onChange={(value: any) => {
                    setAction(value);
                    setSelectedDevice(device);
                  }}
                />
                <Button>Wykonaj</Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default DeviceList;
