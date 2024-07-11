import { requiredString } from '@/utils/formValidationFormulas'
import axios from 'axios'
import { z } from 'zod'

export const resendConfirmationEmailSchema = z.object({
  userId: requiredString,
})

export type ResendConfirmationEmailFormFields = z.infer<
  typeof resendConfirmationEmailSchema
>

export const resendConfirmationEmail = (
  data: ResendConfirmationEmailFormFields,
) => {
  return axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/accounts/confirmation-email`,
    data,
    withCredentials: true,
  }).then(({ data }) => data)
}
