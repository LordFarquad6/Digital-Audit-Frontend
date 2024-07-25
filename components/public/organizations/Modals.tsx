import React from 'react';
import { Modal, TextInput, Button, Stack } from '@mantine/core';

type EmployeeModalProps = {
  opened: boolean;
  onClose: () => void;
  newEmployeeFirstName: string;
  setNewEmployeeFirstName: (value: string) => void;
  newEmployeeLastName: string;
  setNewEmployeeLastName: (value: string) => void;
  newEmployeeEmail: string;
  setNewEmployeeEmail: (value: string) => void;
  newEmployeePhone: string;
  setNewEmployeePhone: (value: string) => void;
  newEmployeeImage: string;
  setNewEmployeeImage: (value: string) => void;
  handleAddEmployee: () => void;
};

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  opened,
  onClose,
  newEmployeeFirstName,
  setNewEmployeeFirstName,
  newEmployeeLastName,
  setNewEmployeeLastName,
  newEmployeeEmail,
  setNewEmployeeEmail,
  newEmployeePhone,
  setNewEmployeePhone,
  newEmployeeImage,
  setNewEmployeeImage,
  handleAddEmployee
}) => (
  <Modal opened={opened} onClose={onClose} title="Dodaj Nowego Pracownika">
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
);

type AddDeviceModalProps = {
  opened: boolean;
  onClose: () => void;
  newDeviceName: string;
  setNewDeviceName: (value: string) => void;
  newDeviceLocation: string;
  setNewDeviceLocation: (value: string) => void;
  newDeviceCaretaker: string;
  setNewDeviceCaretaker: (value: string) => void;
  newDeviceEmployeeId: string;
  setNewDeviceEmployeeId: (value: string) => void;
  handleAddDevice: () => void;
};

export const DeviceModal: React.FC<AddDeviceModalProps> = ({
  opened,
  onClose,
  newDeviceName,
  setNewDeviceName,
  newDeviceLocation,
  setNewDeviceLocation,
  newDeviceCaretaker,
  setNewDeviceCaretaker,
  newDeviceEmployeeId,
  setNewDeviceEmployeeId,
  handleAddDevice
}) => (
  <Modal opened={opened} onClose={onClose} title="Dodaj Nowe Urządzenie">
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
);

type EditOrgModalProps = {
  opened: boolean;
  onClose: () => void;
  editOrgName: string;
  setEditOrgName: (value: string) => void;
  editOrgDescription: string;
  setEditOrgDescription: (value: string) => void;
  handleEditOrganization: () => void;
};

export const EditOrgModal: React.FC<EditOrgModalProps> = ({
  opened,
  onClose,
  editOrgName,
  setEditOrgName,
  editOrgDescription,
  setEditOrgDescription,
  handleEditOrganization
}) => (
  <Modal opened={opened} onClose={onClose} title="Edytuj Organizację">
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
);
