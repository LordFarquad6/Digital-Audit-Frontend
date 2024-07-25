import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

export type GetOrganizationsResponse = {
  id: string
  ownerId: string
  name: string
  createdAt: string
}

const accessToken = useAuthStore.getState().accessToken;

export const getData = () =>
  axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_API_URL}/orgnizations`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      
    },
  }).then(({ data }) => data)

export const useGetOrganizationsList = () =>
  useQuery<GetOrganizationsResponse[]>({
    queryKey: ['Organizations'],
    queryFn: getData,
  })