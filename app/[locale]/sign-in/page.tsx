'use client'
import { Button, Card } from '@mantine/core'
import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { useFormMutation } from '@/hooks/useFormMutation'
import {
  signIn,
  SignInFormFields,
  SignInResponse,
  signInSchema,
} from '@/api/public/auth/signIn'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { InputText } from '@/components/common/form/InputText'

const inputStyles = {
  input: {
    borderRadius: '.5rem',
    color: '#6c757d',
    borderColor: '#ebf1f6',
  },
  root: {
    color: '#6c757d',
  },
}

export default function SignIn() {
  const { t } = useTranslation()
  const { methods, handleSubmit, isPending } = useFormMutation<
    SignInFormFields,
    SignInResponse
  >(signInSchema, signIn, {
    onSuccess(data) {
      notifications.show({
        title: t('common:signedInSuccessfully'),
        message: '',
        color: 'green',
      })
    },
  })

  return (
    <main className="bg-slate-200 h-full flex justify-center items-center">
      <Card
        shadow="xs"
        radius="md"
        padding="xl"
        className="w-[30rem] max-w-[90%] flex flex-col gap-5"
      >
        <Link href="/" className="mx-auto">
          <h1 className="text-3xl font-medium">NEXT 14</h1>
        </Link>
        <div className="flex items-center w-full gap-3">
          <div className="h-[1px] bg-slate-200 flex-1"></div>
          <div className="text-gray-500">{t('common:or')}</div>
          <div className="h-[1px] bg-slate-200 flex-1"></div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputText
              name="email"
              label={t('common:email')}
              placeholder={t('common:email')}
              size="md"
              styles={inputStyles}
              type="email"
            />
            <InputText
              name="password"
              label={t('common:password')}
              placeholder={t('common:password')}
              size="md"
              type="password"
              styles={inputStyles}
            />
            <Button
              size="md"
              radius="xl"
              fullWidth
              type="submit"
              loading={isPending}
            >
              {t('common:signIn')}
            </Button>
          </form>
        </FormProvider>
        <span className="text-center">
          {t('common:createAccountDesc')}{' '}
          <Link href="/sign-up" className="text-primary font-bold">
            {t('common:signUp')}
          </Link>
        </span>
      </Card>
    </main>
  )
}
