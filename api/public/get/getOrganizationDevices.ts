import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

export type GetOrganizationDevicesResponse = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  name: string
  organizationId: string
  categroyId: string
  serialNumber: string
  dateOfPurchase: string
  localization: string
  status: string
}

const accessToken = useAuthStore.getState().accessToken;

export const getData = () =>
  axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_URL}/organizations/{organizationId}/devices`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      
    },
  }).then(({ data }) => data)

export const useGetOrganizationsDevices = () =>
  useQuery<GetOrganizationDevicesResponse[]>({
    queryKey: ['OrganizationsDevices'],
    queryFn: getData,
  })