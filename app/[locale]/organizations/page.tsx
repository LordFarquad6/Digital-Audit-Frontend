"use client";

import React, { useState } from 'react';
import { Container, SimpleGrid, Title, Button, Group, Card, Text, Stack, Modal, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '@/app/ProtectedLayout';
import { useGetOrganizationsList } from '@/api/public/get/getOrganizations';
import { createOrganization, CreateOrganizationResponse, NewOrganization } from '@/api/public/post/createOrganization';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const OrganizationPage: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: organizations, error, isLoading } = useGetOrganizationsList();

  const [modalOpened, setModalOpened] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');
  const [newOrgFounder, setNewOrgFounder] = useState('');

  const mutation = useMutation<CreateOrganizationResponse, unknown, NewOrganization>({
    mutationFn: createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['Organizations']});
      setModalOpened(false);
      notifications.show({ message: 'Organization created successfully', color: 'green' });
    },
    onError: () => {
      notifications.show({ message: 'Error creating organization', color: 'red' });
    }
  });

  const handleAddOrganization = () => {
    const newOrg: NewOrganization = {
      name: newOrgName,
    };
    mutation.mutate(newOrg);
  };

  return (
    <ProtectedLayout>
      {error && <>{notifications.show({ message: 'Error occurred', color: 'red' })}</>}
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Container>
          <Title align="center" mb="lg">
            Moje organizacje
          </Title>
          <Group position="center" mb="lg">
            <Button onClick={() => setModalOpened(true)}>Dodaj Nową Organizację</Button>
          </Group>
          {organizations?.length === 0 ? (
            <Text align="center">Nie masz żadnych organizacji</Text>
          ) : (
            <SimpleGrid cols={1} spacing="lg">
              {organizations?.map((org) => (
                <Card key={org.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack>
                    <Text size="lg">{org.name}</Text>
                    <Text size="sm">{"opis organizacji"}</Text>
                    <Text size="sm">{`Założyciel: "jan kowalski"`}</Text>
                    <Text size="sm">{`Data utworzenia: ${format(new Date(org.createdAt), 'yyyy-MM-dd HH:mm:ss')}`}</Text>
                    <Group mt="md">
                      <Button variant="light" color="blue" onClick={() => router.push(`/organizations/${org.id}`)}>
                        Szczegóły
                      </Button>
                      <Button variant="light" color="red">Usuń</Button>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          )}

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
              <TextInput
                label="Założyciel organizacji"
                placeholder="Wprowadź założyciela organizacji"
                value={newOrgFounder}
                onChange={(event) => setNewOrgFounder(event.currentTarget.value)}
              />
              <Button onClick={handleAddOrganization}>Dodaj</Button>
            </Stack>
          </Modal>
        </Container>
      )}
    </ProtectedLayout>
  );
};

export default OrganizationPage;
