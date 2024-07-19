"use client"

import React, { useState } from 'react';
import { Container, SimpleGrid, Title, Button, Group, Card, Text, Stack, Modal, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Organization } from '@/types/organizationTypes';

const OrganizationPage: React.FC = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: '1', name: 'Organizacja A', description: 'Opis organizacji A' },
    { id: '2', name: 'Organizacja B', description: 'Opis organizacji B' },
  ]);

  const [modalOpened, setModalOpened] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');

  const handleAddOrganization = () => {
    const newOrganization: Organization = {
      id: (organizations.length + 1).toString(),
      name: newOrgName,
      description: newOrgDescription,
    };
    setOrganizations([...organizations, newOrganization]);
    setModalOpened(false);
    setNewOrgName('');
    setNewOrgDescription('');
  };

  return (
    <Container>
      <Title align="center" mb="lg">
        Zarządzanie Organizacjami
      </Title>
      <Group position="center" mb="lg">
        <Button onClick={() => setModalOpened(true)}>Dodaj Nową Organizację</Button>
      </Group>
      <SimpleGrid cols={1} spacing="lg">
        {organizations.map((org) => (
          <Card key={org.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              <Text weight={700} size="lg">{org.name}</Text>
              <Text size="sm" color="dimmed">{org.description}</Text>
              <Group position="apart" mt="md">
                <Button variant="light" color="blue" onClick={() => router.push(`/organizations/${org.id}`)}>Szczegóły</Button>
                <Button variant="light" color="red">Usuń</Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Dodaj Nową Organizację"
      >
        <Stack>
          <TextInput
            label="Nazwa organizacji"
            placeholder="Wprowadź nazwę organizacji"
            value={newOrgName}
            onChange={(event) => setNewOrgName(event.currentTarget.value)}
          />
          <TextInput
            label="Opis organizacji"
            placeholder="Wprowadź opis organizacji"
            value={newOrgDescription}
            onChange={(event) => setNewOrgDescription(event.currentTarget.value)}
          />
          <Button onClick={handleAddOrganization}>Dodaj</Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default OrganizationPage;
