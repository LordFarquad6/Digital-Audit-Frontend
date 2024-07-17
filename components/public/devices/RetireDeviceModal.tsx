import { Modal, Text, Group, Button } from '@mantine/core';

interface RetireDeviceModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RetireDeviceModal: React.FC<RetireDeviceModalProps> = ({ opened, onClose, onConfirm }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Potwierdzenie">
      <Text>Czy na pewno chcesz wycofać te urządzenie z użytku?</Text>
      <Group position="apart" mt="md">
        <Button variant="outline" onClick={onClose}>Anuluj</Button>
        <Button color="red" onClick={onConfirm}>Wycofaj</Button>
      </Group>
    </Modal>
  );
};

export default RetireDeviceModal;
