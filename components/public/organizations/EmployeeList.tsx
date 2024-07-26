import React from 'react';
import { SimpleGrid, Card, Text, Button, Group, Avatar, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
};

type Device = {
  employeeId: string;
};

type Props = {
  employees: Employee[];
  devices: Device[];
  handleDeleteEmployee: (id: string) => void;
  setEmployeeModalOpened: (opened: boolean) => void;
};

const EmployeeList: React.FC<Props> = ({ employees, devices, handleDeleteEmployee, setEmployeeModalOpened }) => {
  const router = useRouter();
  console.log(employees)
  return (
    <div>
      <Group mb="md">
        <Title order={3}>Pracownicy</Title>
        <Button onClick={() => setEmployeeModalOpened(true)}>Dodaj pracownika</Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 'lg', sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
        {employees.map(employee => (
          <Card key={employee.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              <Group>
                <Avatar src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} radius="xl" size="lg" />
                <Stack>
                  <Text size="lg">{`${employee.firstName} ${employee.lastName}`}</Text>
                  <Text size="sm">{employee.email}</Text>
                  <Text size="sm">{employee.phone}</Text>
                  <Text size="sm">{`Liczba urządzeń: ${devices.filter(device => device.employeeId === employee.id).length}`}</Text>
                </Stack>
              </Group>
              <Button color="red" onClick={() => handleDeleteEmployee(employee.id)}>Usuń</Button>
              <Button variant="outline" color="blue" onClick={() => router.push(`/employees/${employee.id}`)}>Szczegóły</Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default EmployeeList;
