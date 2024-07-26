"use client";

import React, { useState, useEffect } from 'react';
import { Container, useMantineTheme, Tabs, Badge, Title, Loader } from '@mantine/core';
import ProtectedLayout from '@/app/ProtectedLayout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import EmployeeList from '@/components/public/organizations/EmployeeList';
import DeviceList from '@/components/public/organizations/DeviceList';
import OrganizationDetails from '@/components/public/organizations/OrganizationDetails';
import { EmployeeModal, DeviceModal, EditOrgModal } from '@/components/public/organizations/Modals';
import { useGetOrganizationsList } from '@/api/public/get/getOrganizationEmployees';
import { OrganizationPageProps } from '@/types/organizationTypes';
import { useGetOrganizationsDevices } from '@/api/public/get/getOrganizationDevices';

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

const OrganizationPage: React.FC<any> = ({ params }) => {
  const { organizationId: orgId } = params;

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

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [action, setAction] = useState<string>('');

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
    setDevices(devices.filter(device => device.employeeId !== id)); 
  };
  
  const { data, error, isLoading } = useGetOrganizationsList(orgId as string);
  const { data: deviceData, error: deviceError, isLoading: isDevicesLoading } = useGetOrganizationsDevices();

  return (
    <ProtectedLayout>
      <Container>
        <Title mb="lg">Zarządzanie Organizacją</Title>
        
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
            <Tabs.Tab value="main_panel" style={{ color: activeTab === 'main_panel' ? 'blue' : theme.colors.black }}>
              Panel główny
            </Tabs.Tab>
            <Tabs.Tab value="employees" style={{ color: activeTab === 'employees' ? 'blue' : theme.colors.black }}>
              Pracownicy
              <Badge size="sm" ml="xs">{data?.length}</Badge>
            </Tabs.Tab>
            <Tabs.Tab value="devices" style={{ color: activeTab === 'devices' ? 'blue' : theme.colors.black }}>
              Urządzenia
              <Badge size="sm" ml="xs">{deviceData?.length}</Badge>
            </Tabs.Tab>
            <Tabs.Tab value="organization" style={{ color: activeTab === 'organization' ? 'blue' : theme.colors.black }}>
              Edycja Organizacji
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="main_panel" pt="xs">
            <OrganizationDetails organization={organization} setEditOrgModalOpened={setEditOrgModalOpened} />
          </Tabs.Panel>

          <Tabs.Panel value="employees" pt="xs">
            {error && <div>Błąd: {error.message}</div>} 
  
            {isLoading && <Loader />}
            <EmployeeList
              employees={data || []}
              devices={devices}
              handleDeleteEmployee={handleDeleteEmployee}
              setEmployeeModalOpened={setEmployeeModalOpened}
            />
          </Tabs.Panel>

          <Tabs.Panel value="devices" pt="xs">
            <DeviceList
              devices={deviceData || []}
              action={action}
              setAction={setAction}
              setSelectedDevice={setSelectedDevice}
              setDeviceModalOpened={setDeviceModalOpened}
            />
          </Tabs.Panel>
        </Tabs>

        <EmployeeModal
          opened={employeeModalOpened}
          onClose={() => setEmployeeModalOpened(false)}
          newEmployeeFirstName={newEmployeeFirstName}
          setNewEmployeeFirstName={setNewEmployeeFirstName}
          newEmployeeLastName={newEmployeeLastName}
          setNewEmployeeLastName={setNewEmployeeLastName}
          newEmployeeEmail={newEmployeeEmail}
          setNewEmployeeEmail={setNewEmployeeEmail}
          newEmployeePhone={newEmployeePhone}
          setNewEmployeePhone={setNewEmployeePhone}
          newEmployeeImage={newEmployeeImage}
          setNewEmployeeImage={setNewEmployeeImage}
          handleAddEmployee={handleAddEmployee}
        />

        <DeviceModal
          opened={deviceModalOpened}
          onClose={() => setDeviceModalOpened(false)}
          newDeviceName={newDeviceName}
          setNewDeviceName={setNewDeviceName}
          newDeviceLocation={newDeviceLocation}
          setNewDeviceLocation={setNewDeviceLocation}
          newDeviceCaretaker={newDeviceCaretaker}
          setNewDeviceCaretaker={setNewDeviceCaretaker}
          newDeviceEmployeeId={newDeviceEmployeeId}
          setNewDeviceEmployeeId={setNewDeviceEmployeeId}
          handleAddDevice={handleAddDevice}
        />

        <EditOrgModal
          opened={editOrgModalOpened}
          onClose={() => setEditOrgModalOpened(false)}
          editOrgName={editOrgName}
          setEditOrgName={setEditOrgName}
          editOrgDescription={editOrgDescription}
          setEditOrgDescription={setEditOrgDescription}
          handleEditOrganization={handleEditOrganization}
        />
      </Container>
    </ProtectedLayout>
  );
};

export default OrganizationPage;
