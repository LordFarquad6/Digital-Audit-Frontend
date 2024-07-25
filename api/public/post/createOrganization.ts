import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export type CreateOrganizationResponse = {
  id: string;
};

export type NewOrganization = {
  name: string;
};

export const createOrganization = async (newOrg: NewOrganization): Promise<CreateOrganizationResponse> => {
  const accessToken = useAuthStore.getState().accessToken;
  const response = await axios({
    method: 'POST',
    data: newOrg,
    url: `${process.env.NEXT_PUBLIC_API_URL}/orgnizations`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
