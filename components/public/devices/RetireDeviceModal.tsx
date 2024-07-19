import { RetireDeviceModalProps } from '@/types/deviceTypes';
import { Modal, Text, Button, Group } from '@mantine/core';


const RetireDeviceModal: React.FC<RetireDeviceModalProps> = ({ opened, onClose, onConfirm, deviceName }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Potwierdzenie"
    >
      <Text>Czy na pewno chcesz wycofać urządzenie {deviceName} z użytku?</Text>
      <Group position="apart" mt="md">
        <Button variant="outline" onClick={onClose}>Anuluj</Button>
        <Button color="red" onClick={onConfirm}>Wycofaj</Button>
      </Group>
    </Modal>
  );
};

export default RetireDeviceModal;
