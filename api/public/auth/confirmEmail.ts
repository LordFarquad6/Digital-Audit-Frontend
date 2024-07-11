import { requiredString } from '@/utils/formValidationFormulas'
import axios from 'axios'
import { z } from 'zod'

export const confirmEmailSchema = z.object({
  userId: requiredString,
  token: requiredString,
})

export type ConfirmEmailFormFields = z.infer<typeof confirmEmailSchema>

export const confirmEmail = (data: ConfirmEmailFormFields) => {
  return axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/confirm-email`,
    data,
    withCredentials: true,
  }).then(({ data }) => data)
}
