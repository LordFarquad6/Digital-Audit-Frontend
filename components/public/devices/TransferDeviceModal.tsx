import React from 'react';
import { Modal, List, ListItem, Text, Button, Title, useMantineTheme } from '@mantine/core';
import { TransferDeviceModalProps } from '@/types/deviceTypes';



const TransferDeviceModal: React.FC<TransferDeviceModalProps> = ({ modalOpened, setModalOpened, availableLocations }) => {
  const theme = useMantineTheme();

  return (
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Przenieś urządzenie">
      <Title order={4} style={{ marginBottom: '1rem' }}>Dostępne lokalizacje:</Title>
      <List spacing="sm" size="sm" center>
        {availableLocations.length > 0 ? (
          availableLocations.map((location, index) => (
            <ListItem 
              key={index} 
              style={{
                padding: '0.5rem 1rem', 
                borderRadius: '8px', 
                backgroundColor: theme.colors.primary[2], 
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text>{location}</Text>
              <Button size="xs" variant="outline" color="blue" onClick={() => console.log(`Przeniesiono do ${location}`)}>
                Przenieś tutaj
              </Button>
            </ListItem>
          ))
        ) : (
          <Text>Brak dostępnych lokalizacji</Text>
        )}
      </List>
    </Modal>
  );
};

export default TransferDeviceModal;
