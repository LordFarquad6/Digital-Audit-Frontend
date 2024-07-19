import React from 'react';
import { Modal, List, Text, Button, Avatar, Group, useMantineTheme } from '@mantine/core';
import { AssignOwnerModalProps } from '@/types/deviceTypes';

const AssignOwnerModal: React.FC<AssignOwnerModalProps> = ({ modalOpened, setModalOpened, members }) => {
  const theme = useMantineTheme();

  return (
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Przypisz opiekuna do urządzenia">
      <List spacing="sm" size="sm" center>
        {members.length > 0 ? (
          members.map((member, index) => (
            <List.Item key={index} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: theme.colors.primary[2], borderRadius: theme.radius.md, color: theme.black }}>
              <Group>
                <Avatar src={member.profileImageUrl} size={50} radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text weight={500}>{member.name}</Text>
                  <Text size="sm" color="gray">{member.position}</Text>
                </div>
                <Button size="xs" variant="outline" color="blue" onClick={() => console.log(`Przypisano do ${member.name}`)}>
                  Przypisz
                </Button>
              </Group>
            </List.Item>
          ))
        ) : (
          <Text>Brak dostępnych członków</Text>
        )}
      </List>
    </Modal>
  );
};

export default AssignOwnerModal;
