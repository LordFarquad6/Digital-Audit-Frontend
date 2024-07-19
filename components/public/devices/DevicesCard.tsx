import React, { useState } from 'react';
import { Card, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import { Device } from '@/types/deviceTypes';
import TransferDeviceModal from '@/components/public/devices/TransferDeviceModal';
import AssignOwnerModal from '@/components/public/devices/AssignOwnerModal';

interface DeviceCardProps {
  device: Device;
  onRetire: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onRetire }) => {
  const theme = useMantineTheme();
  const [transferModalOpened, setTransferModalOpened] = useState(false);
  const [assignOwnerModalOpened, setAssignOwnerModalOpened] = useState(false);

  const availableLocations = [
    'Biuro w Warszawie',
    'Magazyn w Krakowie',
    'Oddział w Gdańsku',
    'Serwis w Wrocławiu',
    'Centrum logistyczne w Poznaniu',
  ];

  const members = [
    { name: 'Jan Kowalski', position: 'Manager', profileImageUrl: '/profile1.jpg' },
    { name: 'Anna Nowak', position: 'Developer', profileImageUrl: '/profile2.jpg' },
    { name: 'Piotr Wiśniewski', position: 'Designer', profileImageUrl: '/profile3.jpg' },
    { name: 'Katarzyna Wójcik', position: 'HR', profileImageUrl: '/profile4.jpg' },
    { name: 'Tomasz Kowalczyk', position: 'Marketing', profileImageUrl: '/profile5.jpg' },
  ];

  return (
    <>
      <Card shadow="sm" padding="lg" style={{ backgroundColor: theme.white }}>
        <Card.Section>
          <Image src={device.imageUrl || '/placeholder.png'} height={160} width={300} alt={device.name} />
        </Card.Section>
        <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
          <Text weight={500}>{device.name}</Text>
          <Badge color={device.status === 'active' ? 'green' : 'red'}>{device.status}</Badge>
        </Group>
        <Text size="sm">Marka: {device.brand}</Text>
        <Text size="sm">Model: {device.model}</Text>
        <Text size="sm">Typ urządzenia: {device.deviceType}</Text>
        <Text size="sm">Numer Seryjny: {device.serialNumber}</Text>
        <Group position="apart" style={{ marginTop: 14 }}>
          <Button variant="outline" color="red" onClick={() => onRetire(device.id)}>
            Wycofaj urządzenie
          </Button>
          <Button variant="outline" color="yellow" onClick={() => setTransferModalOpened(true)}>
            Przenieś urządzenie
          </Button>
          <Button variant="outline" color="green" onClick={() => setAssignOwnerModalOpened(true)}>
            Przypisz opiekuna do urządzenia
          </Button>
        </Group>
        <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
          Zobacz więcej
        </Button>
      </Card>

      <TransferDeviceModal 
        modalOpened={transferModalOpened} 
        setModalOpened={setTransferModalOpened} 
        availableLocations={availableLocations} 
      />
      <AssignOwnerModal 
        modalOpened={assignOwnerModalOpened} 
        setModalOpened={setAssignOwnerModalOpened} 
        members={members} 
      />
    </>
  );
};

export default DeviceCard;
