import { requiredEmail, requiredString } from '@/utils/formValidationFormulas'
import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

export const signUpSchema = z.object({
  username: requiredString,
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
): Promise<AxiosResponse<SignUpResponse>['data']> => {
  console.log('Sign up data:', data)  // Log data before sending
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)  // Log API URL
  return axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`,
    data,
    withCredentials: true,
  }).then(({ data }) => {
    console.log('Sign up response:', data)  
    return data
  }).catch(err => {
    return Promise.reject(err)
  })
}
