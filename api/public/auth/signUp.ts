import { requiredEmail, requiredString } from '@/utils/formValidationFormulas'
import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

export const signUpSchema = z.object({
  email: requiredEmail,
  password: requiredString,
  confirmPassword: requiredString,
  asStudent: z.boolean().default(true),
})

export type SignUpFormFields = z.infer<typeof signUpSchema>

export type SignUpResponse = {
  accessToken: string
  createdOrganizationId: string
  email: string
  id: string
  roles: string[]
}

export const signUp = (
  data: SignUpFormFields,
): Promise<AxiosResponse<SignUpResponse>['data']> =>
  axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/sign-up`,
    data,
    withCredentials: true,
  }).then(({ data }) => data)
