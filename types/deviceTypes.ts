import * as z from 'zod';

export interface AddDeviceFormProps {
  onSubmit: () => void;
}


export interface TransferDeviceModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  availableLocations: string[];
}

export interface RetireDeviceModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deviceName: string | null;
}

export const deviceSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa jest wymagana' }),
  brand: z.string().min(1, { message: 'Marka jest wymagana' }),
  model: z.string().min(1, { message: 'Model jest wymagany' }),
  deviceType: z.string().min(1, { message: 'Typ urządzenia jest wymagany' }),
  serialNumber: z.string().min(1, { message: 'Numer seryjny jest wymagany' }),
  status: z.string().min(1, { message: 'Status jest wymagany' }),
  imageUrl: z.string().optional(),
});

export type DeviceSchema = z.infer<typeof deviceSchema>;

export interface Member {
  name: string;
  position: string;
  profileImageUrl: string;
}

export interface AssignOwnerModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  members: Member[];
}

export interface Device {
  id: string;
  name: string;
  brand: string;
  model: string;
  deviceType: string;
  serialNumber: string;
  status: string;
  imageUrl?: string;
}

export const brands: string[] = [
  'Apple',
  'Samsung',
  'Sony',
  'LG',
  'Dell',
  'HP',
  'Lenovo',
  'Acer',
  'Asus',
  'Microsoft',
  'Google',
  'Huawei',
  'Xiaomi',
  'OnePlus',
  'Motorola',
  'Nokia',
  'Panasonic',
  'Toshiba',
  'Philips',
  'Vizio',
  'Sharp',
  'Roku',
  'Hisense',
  'Amazon',
  'Oppo',
  'Realme',
  'Vivo',
  'ZTE',
  'BlackBerry',
  'HTC',
  'Alcatel',
  'Sony PlayStation',
  'Microsoft Xbox',
  'Nintendo',
];

export const devicesData: Device[] = [
  {
    id: '1',
    name: 'Dell XPS 15',
    brand: 'Dell',
    model: 'XPS 15',
    deviceType: 'Laptop',
    serialNumber: '12345',
    status: 'active',
    imageUrl: 'https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/32/3225322/APPLE_iPhone_13__front_rozowy.jpg',
  },
  {
    id: '2',
    name: 'LG UltraWide',
    brand: 'LG',
    model: 'UltraWide',
    deviceType: 'Monitor',
    serialNumber: '67890',
    status: 'inactive',
    imageUrl: 'https://swiat-laptopow.pl/4931-large_default/laptop-do-gier-hp-omen-17-ck0171nw-5a5l6ea-intel-i9-32gb-ssd-2tb-rtx-3080-qhd-165hz-win-11-czarny.jpg',
  },
];