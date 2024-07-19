import { Card, Text, Button, TextInput, Select, FileInput } from '@mantine/core';
import { useFormContext, Controller } from 'react-hook-form';
import { AddDeviceFormProps, Device, brands } from '@/types/deviceTypes';

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue, control } = useFormContext<Device>();

  return (
    <Card shadow="sm" padding="lg">
      <Text size="lg" weight={500} style={{ marginBottom: '1rem' }}>
        Dodaj nowe urządzenie do organizacji
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nazwa"
          {...register('name')}
          error={errors.name?.message}
        />
        <Controller
          name="brand"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label="Marka"
              data={brands.map(brand => ({ value: brand, label: brand }))}
              {...field}
              onChange={(value) => {
                if (value !== field.value) {
                  field.onChange(value || '');
                }
              }}
              error={errors.brand?.message}
              searchable
            />
          )}
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
        <Controller
          name="status"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label="Status"
              data={[
                { value: 'active', label: 'Aktywne' },
                { value: 'inactive', label: 'Nieaktywne' },
              ]}
              {...field}
              onChange={(value) => {
                if (value !== field.value) {
                  field.onChange(value || '');
                }
              }}
              error={errors.status?.message}
            />
          )}
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
