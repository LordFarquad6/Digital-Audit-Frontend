"use client";

import React, { useState, useEffect } from 'react';
import { Container, useMantineTheme, SimpleGrid, Card, Text, Button, Group, Modal, TextInput, Stack, Title, Tabs, Badge, Avatar } from '@mantine/core';
import ProtectedLayout from '@/app/ProtectedLayout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string; 
};

type Device = {
  id: string;
  name: string;
  location: string;
  caretaker: string;
  employeeId: string;
};

type Organization = {
  id: string;
  name: string;
  description: string;
};

const OrganizationPage: React.FC = () => {
  const router = useRouter();
  const { accessToken } = useAuthStore(state => ({
    accessToken: state.accessToken,
  }));

  const theme = useMantineTheme();

  const [activeTab, setActiveTab] = useState<string>('employees');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [organization, setOrganization] = useState<Organization>({ id: '1', name: 'Moja Organizacja', description: 'Opis organizacji' });
  const [employeeModalOpened, setEmployeeModalOpened] = useState(false);
  const [deviceModalOpened, setDeviceModalOpened] = useState(false);
  const [editOrgModalOpened, setEditOrgModalOpened] = useState(false);
  const [newEmployeeFirstName, setNewEmployeeFirstName] = useState('');
  const [newEmployeeLastName, setNewEmployeeLastName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeePhone, setNewEmployeePhone] = useState('');
  const [newEmployeeImage, setNewEmployeeImage] = useState('');
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceLocation, setNewDeviceLocation] = useState('');
  const [newDeviceCaretaker, setNewDeviceCaretaker] = useState('');
  const [newDeviceEmployeeId, setNewDeviceEmployeeId] = useState('');
  const [editOrgName, setEditOrgName] = useState(organization.name);
  const [editOrgDescription, setEditOrgDescription] = useState(organization.description);

  useEffect(() => {
    setEmployees([
      { id: '1', firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@example.com', phone: '123456789', image: 'https://via.placeholder.com/150' },
      { id: '2', firstName: 'Anna', lastName: 'Nowak', email: 'anna.nowak@example.com', phone: '987654321', image: 'https://via.placeholder.com/150' },
    ]);

    setDevices([
      { id: '1', name: 'Laptop', location: 'Biuro 1', caretaker: 'Jan Kowalski', employeeId: '1' },
      { id: '2', name: 'Telefon', location: 'Biuro 2', caretaker: 'Anna Nowak', employeeId: '2' },
    ]);
  }, []);

  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      id: (employees.length + 1).toString(),
      firstName: newEmployeeFirstName,
      lastName: newEmployeeLastName,
      email: newEmployeeEmail,
      phone: newEmployeePhone,
      image: newEmployeeImage,
    };
    setEmployees([...employees, newEmployee]);
    setEmployeeModalOpened(false);
    setNewEmployeeFirstName('');
    setNewEmployeeLastName('');
    setNewEmployeeEmail('');
    setNewEmployeePhone('');
    setNewEmployeeImage('');
  };

  const handleAddDevice = () => {
    const newDevice: Device = {
      id: (devices.length + 1).toString(),
      name: newDeviceName,
      location: newDeviceLocation,
      caretaker: newDeviceCaretaker,
      employeeId: newDeviceEmployeeId,
    };
    setDevices([...devices, newDevice]);
    setDeviceModalOpened(false);
    setNewDeviceName('');
    setNewDeviceLocation('');
    setNewDeviceCaretaker('');
    setNewDeviceEmployeeId('');
  };

  const handleEditOrganization = () => {
    setOrganization({ ...organization, name: editOrgName, description: editOrgDescription });
    setEditOrgModalOpened(false);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    setDevices(devices.filter(device => device.employeeId !== id)); // Usuwanie powiązanych urządzeń
  };

  return (
    <ProtectedLayout>
      <Container>
        <Title align="center" mb="lg">Zarządzanie Organizacją</Title>
        
        <Tabs value={activeTab} onChange={setActiveTab} styles={{
          tabControl: {
            '&[data-active]': {
              borderColor: 'blue', 
              color: 'blue', 
            },
            '&:hover': {
              backgroundColor: 'transparent', 
            },
          },
        }}>
          <Tabs.List>
            <Tabs.Tab value="employees" style={{ color: activeTab === 'employees' ? 'blue' : theme.colors.black }}>
              Pracownicy
              <Badge size="sm" ml="xs">{employees.length}</Badge>
            </Tabs.Tab>
            <Tabs.Tab value="devices" style={{ color: activeTab === 'devices' ? 'blue' : theme.colors.black }}>
              Urządzenia
              <Badge size="sm" ml="xs">{devices.length}</Badge>
            </Tabs.Tab>
            <Tabs.Tab value="organization" style={{ color: activeTab === 'organization' ? 'blue' : theme.colors.black }}>
              Edycja Organizacji
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="employees" pt="xs">
            <Group position="apart" mb="md">
              <Title order={3}>Pracownicy</Title>
              <Button onClick={() => setEmployeeModalOpened(true)}>Dodaj pracownika</Button>
            </Group>
            <SimpleGrid 
              cols={{ base: 1, sm: 2, lg: 3 }} 
              spacing={{ base: 'lg', sm: 'xl' }} 
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              {employees.map(employee => (
                <Card key={employee.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack spacing="xs">
                    <Group>
                      <Avatar src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} radius="xl" size="lg" />
                      <Stack spacing="xs">
                        <Text weight={700} size="lg">{`${employee.firstName} ${employee.lastName}`}</Text>
                        <Text size="sm" color="dimmed">{employee.email}</Text>
                        <Text size="sm" color="dimmed">{employee.phone}</Text>
                        <Text size="sm" color="dimmed">{`Liczba urządzeń: ${devices.filter(device => device.employeeId === employee.id).length}`}</Text>
                      </Stack>
                    </Group>
                    <Button color="red" onClick={() => handleDeleteEmployee(employee.id)}>Usuń</Button>
                    <Button variant="outline" color="blue" onClick={() => router.push(`/employees/${employee.id}`)}>Szczegóły</Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="devices" pt="xs">
            <Group position="apart" mb="md">
              <Title order={3}>Urządzenia</Title>
              <Button onClick={() => setDeviceModalOpened(true)}>Dodaj urządzenie</Button>
            </Group>
            <SimpleGrid 
              cols={{ base: 1, sm: 2, lg: 3 }} 
              spacing={{ base: 'lg', sm: 'xl' }} 
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              {devices.map(device => (
                <Card key={device.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack>
                    <Text weight={700} size="lg">{device.name}</Text>
                    <Text>Lokalizacja: {device.location}</Text>
                    <Text>Opiekun: {device.caretaker}</Text>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="organization" pt="xs">
            <Group position="apart" mb="md">
              <Title order={3}>Edycja Organizacji</Title>
              <Button onClick={() => setEditOrgModalOpened(true)}>Edytuj organizację</Button>
            </Group>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack spacing="xs">
                <Text weight={700} size="lg">{organization.name}</Text>
                <Text size="sm" color="dimmed">{organization.description}</Text>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>

        <Modal
          opened={employeeModalOpened}
          onClose={() => setEmployeeModalOpened(false)}
          title="Dodaj Nowego Pracownika"
        >
          <Stack>
            <TextInput
              label="Imię"
              placeholder="Wprowadź imię"
              value={newEmployeeFirstName}
              onChange={(event) => setNewEmployeeFirstName(event.currentTarget.value)}
            />
            <TextInput
              label="Nazwisko"
              placeholder="Wprowadź nazwisko"
              value={newEmployeeLastName}
              onChange={(event) => setNewEmployeeLastName(event.currentTarget.value)}
            />
            <TextInput
              label="Email"
              placeholder="Wprowadź email"
              value={newEmployeeEmail}
              onChange={(event) => setNewEmployeeEmail(event.currentTarget.value)}
            />
            <TextInput
              label="Telefon"
              placeholder="Wprowadź telefon"
              value={newEmployeePhone}
              onChange={(event) => setNewEmployeePhone(event.currentTarget.value)}
            />
            <TextInput
              label="Obraz URL"
              placeholder="Wprowadź URL obrazu"
              value={newEmployeeImage}
              onChange={(event) => setNewEmployeeImage(event.currentTarget.value)}
            />
            <Button onClick={handleAddEmployee}>Dodaj</Button>
          </Stack>
        </Modal>

        <Modal
          opened={deviceModalOpened}
          onClose={() => setDeviceModalOpened(false)}
          title="Dodaj Nowe Urządzenie"
        >
          <Stack>
            <TextInput
              label="Nazwa"
              placeholder="Wprowadź nazwę"
              value={newDeviceName}
              onChange={(event) => setNewDeviceName(event.currentTarget.value)}
            />
            <TextInput
              label="Lokalizacja"
              placeholder="Wprowadź lokalizację"
              value={newDeviceLocation}
              onChange={(event) => setNewDeviceLocation(event.currentTarget.value)}
            />
            <TextInput
              label="Opiekun"
              placeholder="Wprowadź opiekuna"
              value={newDeviceCaretaker}
              onChange={(event) => setNewDeviceCaretaker(event.currentTarget.value)}
            />
            <TextInput
              label="Przypisany pracownik ID"
              placeholder="Wprowadź ID pracownika"
              value={newDeviceEmployeeId}
              onChange={(event) => setNewDeviceEmployeeId(event.currentTarget.value)}
            />
            <Button onClick={handleAddDevice}>Dodaj</Button>
          </Stack>
        </Modal>

        <Modal
          opened={editOrgModalOpened}
          onClose={() => setEditOrgModalOpened(false)}
          title="Edytuj Organizację"
        >
          <Stack>
            <TextInput
              label="Nazwa"
              placeholder="Wprowadź nazwę organizacji"
              value={editOrgName}
              onChange={(event) => setEditOrgName(event.currentTarget.value)}
            />
            <TextInput
              label="Opis"
              placeholder="Wprowadź opis organizacji"
              value={editOrgDescription}
              onChange={(event) => setEditOrgDescription(event.currentTarget.value)}
            />
            <Button onClick={handleEditOrganization}>Zapisz zmiany</Button>
          </Stack>
        </Modal>
      </Container>
    </ProtectedLayout>
  );
};

export default OrganizationPage;
