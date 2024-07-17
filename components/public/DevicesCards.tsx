"use client"

import { Card, Text, Badge, Button, Group, Grid, Container, TextInput, Select, SimpleGrid, Box, Flex, FileInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMantineTheme } from '@mantine/core';

interface Device {
  id: string;
  name: string;
  organizationId: string;
  categoryId: string;
  serialNumber: string;
  dateOfPurchase: string;
  localization: string;
  status: string;
  imageUrl: string;
}

const devicesData: Device[] = [
  {
    id: '1',
    name: 'Dell XPS 15',
    organizationId: 'org-1',
    categoryId: 'cat-1',
    serialNumber: '12345',
    dateOfPurchase: '2023-01-15T00:00:00Z',
    localization: 'Biuro 1',
    status: 'active',
    imageUrl: 'https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/32/3225322/APPLE_iPhone_13__front_rozowy.jpg',
  },
  {
    id: '2',
    name: 'LG UltraWide',
    organizationId: 'org-2',
    categoryId: 'cat-2',
    serialNumber: '67890',
    dateOfPurchase: '2022-07-10T00:00:00Z',
    localization: 'Biuro 2',
    status: 'inactive',
    imageUrl: 'https://swiat-laptopow.pl/4931-large_default/laptop-do-gier-hp-omen-17-ck0171nw-5a5l6ea-intel-i9-32gb-ssd-2tb-rtx-3080-qhd-165hz-win-11-czarny.jpg',
  },
];

const DevicesPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDevice, setNewDevice] = useState<Omit<Device, 'id'>>({
    name: '',
    organizationId: '',
    categoryId: '',
    serialNumber: '',
    dateOfPurchase: '',
    localization: '',
    status: '',
    imageUrl: '',
  });

  const theme = useMantineTheme();
  console.log(theme)
  useEffect(() => {
    // Simulacja pobierania danych
    setDevices(devicesData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setNewDevice((prev) => ({ ...prev, dateOfPurchase: date?.toISOString() || '' }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewDevice((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewDevice((prev) => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleAddDevice = () => {
    const newDeviceWithId = { ...newDevice, id: String(devices.length + 1) };
    setDevices((prev) => [...prev, newDeviceWithId]);
    setNewDevice({
      name: '',
      organizationId: '',
      categoryId: '',
      serialNumber: '',
      dateOfPurchase: '',
      localization: '',
      status: '',
      imageUrl: '',
    });
  };

  return (
    <Container>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap="md"
      >
        <Box flex={2}>
          <SimpleGrid cols={1} spacing="md">
            {devices.map(device => (
              <Card key={device.id} shadow="sm" padding="lg" style={{ 
                  backgroundColor: theme.white,
                }}>
                <Card.Section>
                  <Image src={device.imageUrl || '/placeholder.png'} height={160} width={300} alt={device.name} />
                </Card.Section>
                <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
                  <Text weight={500}>{device.name}</Text>
                  <Badge color={device.status === 'active' ? 'green' : 'red'}>{device.status}</Badge>
                </Group>
                <Text size="sm">Numer Seryjny: {device.serialNumber}</Text>
                <Text size="sm">Lokalizacja: {device.localization}</Text>
                <Text size="sm">Data Zakupu: {new Date(device.dateOfPurchase).toLocaleDateString()}</Text>
                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                  Zobacz więcej
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
        <Box flex={1}>
          <Card shadow="sm" padding="lg" style={{ 
        
            }}>
            <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
              Dodaj Nowe Urządzenie
            </Text>
            <TextInput
              label="Nazwa"
              name="name"
              value={newDevice.name}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="ID Organizacji"
              name="organizationId"
              value={newDevice.organizationId}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="ID Kategorii"
              name="categoryId"
              value={newDevice.categoryId}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Numer Seryjny"
              name="serialNumber"
              value={newDevice.serialNumber}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Lokalizacja"
              name="localization"
              value={newDevice.localization}
              onChange={handleInputChange}
              required
            />
            <Select
              label="Status"
              name="status"
              data={[
                { value: 'active', label: 'Aktywne' },
                { value: 'inactive', label: 'Nieaktywne' },
              ]}
              value={newDevice.status}
              onChange={(value) => handleSelectChange('status', value!)}
              required
            />
            <FileInput
              label="Zdjęcie"
              placeholder="Wybierz zdjęcie"
              onChange={handleImageChange}
            />
            <Button variant="filled" color="green" fullWidth style={{ marginTop: 14 }} onClick={handleAddDevice}>
              Dodaj Urządzenie
            </Button>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
};

export default DevicesPage;
