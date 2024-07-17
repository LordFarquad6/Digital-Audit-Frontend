import { Card, Text, Button, TextInput, Select, FileInput } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { Device, brands } from '@/types/deviceTypes';

interface AddDeviceFormProps {
  onSubmit: () => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useFormContext<Device>();

  return (
    <Card shadow="sm" padding="lg">
      <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
        Dodaj Nowe Urządzenie
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nazwa"
          {...register('name')}
          error={errors.name?.message}
        />
        <Select
          label="Marka"
          data={brands.map(brand => ({ value: brand, label: brand }))}
          {...register('brand')}
          error={errors.brand?.message}
          searchable
        />
        <TextInput
          label="Model"
          {...register('model')}
          error={errors.model?.message}
        />
        <TextInput
          label="Typ urządzenia"
          {...register('deviceType')}
          error={errors.deviceType?.message}
        />
        <TextInput
          label="Numer Seryjny"
          {...register('serialNumber')}
          error={errors.serialNumber?.message}
        />
        <Select
          label="Status"
          data={[
            { value: 'active', label: 'Aktywne' },
            { value: 'inactive', label: 'Nieaktywne' },
          ]}
          {...register('status')}
          error={errors.status?.message}
        />
        <FileInput
          label="Zdjęcie"
          placeholder="Wybierz zdjęcie"
          onChange={(file) => {
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setValue('imageUrl', reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <Button variant="filled" color="green" fullWidth style={{ marginTop: 14 }} type="submit">
          Dodaj Urządzenie
        </Button>
      </form>
    </Card>
  );
};

export default AddDeviceForm;
