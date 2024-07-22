import { ApiErrorData } from '@/types/api/apiTypes'
import { AxiosError } from 'axios'

export const getErrorMessages = (
  error: AxiosError<ApiErrorData, any>,
): string[] => {
  const extractMessages = (errorMessage: any): string[] => {
    if (typeof errorMessage === 'string') {
      return [errorMessage]
    } else if (Array.isArray(errorMessage)) {
      return errorMessage.flatMap(msg => extractMessages(msg))
    } else if (typeof errorMessage === 'object' && errorMessage !== null) {
      if ('reason' in errorMessage) {
        return extractMessages(errorMessage.reason)
      } else if ('message' in errorMessage) {
        return extractMessages(errorMessage.message)
      } else {
        return Object.values(errorMessage).flatMap(value => extractMessages(value))
      }
    } else if (errorMessage !== undefined && errorMessage !== null) {
      return [String(errorMessage)]
    } else {
      return []
    }
  }

  let errorMessage: any = error?.response?.data?.message ?? error.message
  if (error?.response?.data?.subErrors?.length) {
    errorMessage = error?.response?.data?.subErrors
  }
  if (error?.response?.data?.errors?.length) {
    errorMessage = error?.response?.data?.errors
  }

  return extractMessages(errorMessage)
}
