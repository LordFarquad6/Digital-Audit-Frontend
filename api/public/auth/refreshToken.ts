import axios, { AxiosResponse } from 'axios'

type RefreshTokenResponse = {
  accessToken: string
}

export const refreshToken = (): Promise<AxiosResponse<RefreshTokenResponse>> =>
  axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/refresh-cookie`,
    withCredentials: true,
  })
