'use client'
import { Button, Card } from '@mantine/core'
import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { useFormMutation } from '@/hooks/useFormMutation'

import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { InputText } from '@/components/common/form/InputText'
import {
  sendResetPasswordEmail,
  SendResetPasswordEmailFormFields,
  sendResetPasswordEmailSchema,
} from '@/api/public/auth/forgotPassword'
import { useSearchParams } from 'next/navigation'

export const ForgotPasswordCard = () => {
  const { t } = useTranslation()
  const params = useSearchParams()
  const email = params.get('email')
  const { methods, handleSubmit, isPending } = useFormMutation<
    SendResetPasswordEmailFormFields,
    null
  >(
    sendResetPasswordEmailSchema,
    sendResetPasswordEmail,
    {
      onSuccess() {
        notifications.show({
          message: t('common:sendResetPasswordEmailSuccess'),
          color: 'green',
        })
      },
    },
    {
      email,
    },
  )

  return (
    <Card
      shadow="xs"
      radius="md"
      padding="xl"
      className="w-[40rem] max-w-[90%] flex flex-col gap-5"
    >
      <Link href="/" className="mx-auto text-3xl font-medium">
        Next 14
      </Link>
      <p className="text-base text-center">{t('common:forgotPasswordDesc')}</p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputText
            name="email"
            label={t('common:email')}
            placeholder={t('common:email')}
            size="md"
            type="email"
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
        </form>
      </FormProvider>
    </Card>
  )
}
