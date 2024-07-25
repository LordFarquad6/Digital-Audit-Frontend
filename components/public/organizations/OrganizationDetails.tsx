import React from 'react';
import { Card, Text, Group, Button, Stack, Title } from '@mantine/core';

type Organization = {
  name: string;
  description: string;
};

type Props = {
  organization: Organization;
  setEditOrgModalOpened: (opened: boolean) => void;
};

const OrganizationDetails: React.FC<Props> = ({ organization, setEditOrgModalOpened }) => {
  return (
    <div>
      <Group mb="md">
        <Title order={3}>Edycja Organizacji</Title>
        <Button onClick={() => setEditOrgModalOpened(true)}>Edytuj organizację</Button>
      </Group>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Text size="lg">{organization.name}</Text>
          <Text size="sm" color="dimmed">{organization.description}</Text>
        </Stack>
      </Card>
    </div>
  );
};

export default OrganizationDetails;
