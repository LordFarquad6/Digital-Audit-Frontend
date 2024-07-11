import { requiredString } from '@/utils/formValidationFormulas'
import axios from 'axios'
import { z } from 'zod'

export const sendResetPasswordEmailSchema = z.object({
  email: requiredString,
})

export type SendResetPasswordEmailFormFields = z.infer<
  typeof sendResetPasswordEmailSchema
>

export const sendResetPasswordEmail = (
  data: SendResetPasswordEmailFormFields,
) => {
  return axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/forgot-password`,
    data,
    withCredentials: true,
  }).then(({ data }) => data)
}
