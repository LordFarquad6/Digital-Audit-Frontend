import { ApiErrorData } from '@/types/api/apiTypes'
import { AxiosError } from 'axios'

export const getErrorMessage = (
  error: AxiosError<ApiErrorData, any>,
): string => {
  const extractMessage = (errorMessage: any): string | null => {
    if (typeof errorMessage === 'string') {
      return errorMessage
    } else if (Array.isArray(errorMessage)) {
      return extractMessage(errorMessage[0])
    } else if (typeof errorMessage === 'object' && errorMessage !== null) {
      if ('message' in errorMessage) {
        return extractMessage(errorMessage.message)
      } else {
        const firstKey = Object.keys(errorMessage)[0]
        return extractMessage(errorMessage[firstKey])
      }
    } else if (errorMessage !== undefined && errorMessage !== null) {
      return String(errorMessage)
    } else {
      return null
    }
  }

  let errorMessage: any = error?.response?.data?.message ?? error.message
  if (error?.response?.data?.subErrors?.length) {
    errorMessage = error?.response?.data?.subErrors[0]
  }
  if (error?.response?.data?.errors?.length) {
    errorMessage = error?.response?.data?.errors[0]
  }

  return extractMessage(errorMessage) ?? error.message
}
