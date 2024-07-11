import { requiredString } from '@/utils/formValidationFormulas'
import axios from 'axios'
import { z } from 'zod'

export const resetPasswordSchema = z.object({
  token: requiredString,
  userId: requiredString,
  password: requiredString,
  confirmPassword: requiredString,
})

export type ResetPasswordFormFields = z.infer<typeof resetPasswordSchema>

export const resetPassword = (data: ResetPasswordFormFields) => {
  return axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/reset-password`,
    data,
    withCredentials: true,
  }).then(({ data }) => data)
}
