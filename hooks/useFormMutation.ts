import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError, AxiosResponse } from 'axios'
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AnyZodObject, ZodEffects } from 'zod'
import { ApiErrorData } from '@/types/api/apiTypes'
import { notifications } from '@mantine/notifications'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { useTranslation } from 'react-i18next'

export const useFormMutation = <FormFields extends FieldValues, ServerResponse>(
  schema: AnyZodObject | ZodEffects<AnyZodObject>,
  mutationFn: (
    _data: FormFields,
  ) => Promise<AxiosResponse<ServerResponse>['data']>,
  options: Omit<
    UseMutationOptions<
      ServerResponse,
      AxiosError<ApiErrorData>,
      FormFields,
      unknown
    >,
    'mutationFn'
  >,
  initial?: object,
) => {
  const { t } = useTranslation()
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...schema.default,
      ...initial,
    } as unknown as DefaultValues<FormFields>,
  })

  const handleError = (error: AxiosError<ApiErrorData>) => {
    if (error.response?.status === 401) {
      methods.setError('status' as never, {
        type: 'API',
        message: 'Brak uprawnień (401)',
      })
    } else if (error.response?.status === 403) {
      methods.setError('status' as never, {
        type: 'API',
        message: 'Brak uprawnień (403)',
      })
    } else if (error.response?.status === 404) {
      methods.setError('status' as never, {
        type: 'API',
        message: 'Nie znaleziono zasobu (404)',
      })
    } else if (error.response?.status === 405) {
      methods.setError('status' as never, {
        type: 'API',
        message: 'Nieprawidłowa metoda (405)',
      })
    } else if (error.response?.status === 500) {
      methods.setError('status' as never, {
        type: 'API',
        message: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później (500)',
      })
    } else if (error?.response?.data?.errors) {
      const errors = Object.entries(
        error.response?.data.errors as
          | { [s: string]: string[] }
          | ArrayLike<string[]>,
      )

      errors.forEach(([key, value]) => {
        methods.setError(key.toLowerCase() as never, {
          type: 'API',
          message: value[0],
        })
      })
    } else if (error?.response?.data?.title) {
      methods.setError('status' as never, {
        type: 'API',
        message: error?.response?.data?.title,
      })
    }
  }

  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn,
    ...options,
    onError: (error: AxiosError<ApiErrorData>, variables, context) => {
      handleError(error)
      if (options.onError) {
        options.onError(error, variables, context)
      } else {
        notifications.show({
          title: t('common:errorOccured'),
          message: getErrorMessage(error),
          color: 'red',
        })
      }
    },
  })

  const handleSubmit = methods.handleSubmit(((data: FormFields) =>
    mutate(data)) as SubmitHandler<FieldValues>)

  return { methods, handleSubmit, isPending, isError, isSuccess }
}
