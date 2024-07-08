import { requiredEmail, requiredString } from '@/utils/formValidationFormulas'
import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

export const signInSchema = z.object({
  email: requiredEmail,
  password: requiredString,
})

export type SignInFormFields = z.infer<typeof signInSchema>

export type SignInResponse = {
  userId: string
  role: string
  createdAt: string
  state: string
  email: string
  phoneNumberPrefix: string | null
  phoneNumber: string | null
  emailConfirmed: boolean
  phoneNumberConfirmed: boolean
  phoneNumberConfirmedDate: string | null
  emailConfirmedDate: string | null
  registrationProvider: string | null
}

export const signIn = (
  data: SignInFormFields,
): Promise<AxiosResponse<SignInResponse>['data']> => {
  return axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/sign-in`,
    data,
    withCredentials: true,
  }).then(({ data }) => data)
}
