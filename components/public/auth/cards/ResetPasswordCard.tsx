'use client'
import { Button, Card } from '@mantine/core'
import Link from 'next/link'

import { useTranslation } from 'react-i18next'
import { useFormMutation } from '@/hooks/useFormMutation'
import { notifications } from '@mantine/notifications'

import { InputText } from '@/components/common/form/InputText'
import { FormProvider } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  resetPassword,
  ResetPasswordFormFields,
  resetPasswordSchema,
} from '@/api/public/auth/resetPassword'

export const ResetPasswordCard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token')
  const userId = params.get('userId')
  const { methods, handleSubmit, isPending, isError } = useFormMutation<
    ResetPasswordFormFields,
    null
  >(
    resetPasswordSchema,
    resetPassword,
    {
      onSuccess() {
        notifications.show({
          message: t('common:passwordResetSuccessfully'),
          color: 'green',
        })
        router.push('/auth/sign-in')
      },
    },
    {
      token,
      userId,
    },
  )

  return (
    <Card
      shadow="xs"
      radius="md"
      padding="xl"
      className="w-[30rem] max-w-[90%]"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Link href="/" className="mx-auto text-3xl font-medium">
            Next 14
          </Link>
          {token && userId && !isError ? (
            <>
              <p className="text-center text-xl">
                {t('common:setNewPassword')}
              </p>
              <InputText
                name="password"
                label={t('common:password')}
                placeholder={t('common:password')}
                size="md"
                type="password"
                required
              />
              <InputText
                name="confirmPassword"
                label={t('common:confirmPassword')}
                placeholder={t('common:confirmPassword')}
                size="md"
                type="password"
                required
              />
              <Button
                size="md"
                radius="xl"
                fullWidth
                type="submit"
                loading={isPending}
              >
                {t('common:resetPassword')}
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl font-medium">
                {t('common:resetPassword')}
              </h1>
              <p className="text-center">
                {t('common:invalidResetPasswordToken')}
              </p>
            </>
          )}
        </form>
      </FormProvider>
    </Card>
  )
}
