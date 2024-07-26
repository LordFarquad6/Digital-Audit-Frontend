import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

export type GetOrganizationEmployeesResponse = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

const accessToken = useAuthStore.getState().accessToken;

export const getData = (orgId: string) =>
  axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_URL}/organizations/{OrganizationId}/employees`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      
    },
  }).then(({ data }) => data)

export const useGetOrganizationsList = (orgId: string) =>
  useQuery<GetOrganizationEmployeesResponse[]>({
    queryKey: ['OrganizationsEmployees'],
    queryFn: () => getData(orgId),
  })