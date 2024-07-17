import { Card, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import { Device } from '@/types/deviceTypes';

interface DeviceCardProps {
  device: Device;
  onRetire: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onRetire }) => {
  const theme = useMantineTheme();

  return (
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
        <Button variant="outline" color="yellow" onClick={() => console.log('Przenieś urządzenie')}>
          Przenieś urządzenie
        </Button>
        <Button variant="outline" color="green" onClick={() => console.log('Przypisz opiekuna do urządzenia')}>
          Przypisz opiekuna do urządzenia
        </Button>
      </Group>
      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Zobacz więcej
      </Button>
    </Card>
  );
};

export default DeviceCard;
