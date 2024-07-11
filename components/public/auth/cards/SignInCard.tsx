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
import { useRouter } from 'next/navigation'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'

export const SignInCard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { methods, handleSubmit, isPending } = useFormMutation<
    SignInFormFields,
    SignInResponse
  >(signInSchema, signIn, {
    onSuccess(data) {
      if (data?.emailConfirmed === false) {
        router.push(
          `/auth/confirm-account?email=${data.email}&userId=${data.userId}`,
        )
      }
      notifications.show({
        message: t('common:signedInSuccessfully'),
        color: 'green',
      })
    },
  })

  return (
    <Card
      shadow="xs"
      radius="md"
      padding="xl"
      className="w-[30rem] max-w-[90%] flex flex-col gap-5"
    >
      <Link href="/" className="mx-auto text-3xl font-medium">
        Next 14
      </Link>
      <div className="flex gap-5">
        <GoogleLoginButton
          onClick={() => alert('Function not available yet!')}
          text="Google"
          align="center"
          style={{
            boxShadow: 'none',
            border: '1px solid #d3d3d3',
            borderRadius: '.6rem',
            fontSize: '.9rem',
          }}
          size="2.75rem"
          iconSize={20}
        />
        <FacebookLoginButton
          onClick={() => alert('Function not available yet!')}
          text="Facebook"
          align="center"
          style={{
            boxShadow: 'none',
            border: '1px solid #d3d3d3',
            borderRadius: '.6rem',
            fontSize: '.9rem',
            backgroundColor: '#fff',
            color: '#000',
          }}
          activeStyle={{
            backgroundColor: '#eff0ee',
            color: '#000',
          }}
          size="2.75rem"
          iconSize={20}
          iconColor="#1877f2"
        />
      </div>
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
            type="email"
            required
          />
          <InputText
            name="password"
            label={t('common:password')}
            placeholder={t('common:password')}
            size="md"
            type="password"
            required
          />
          <Link
            href={`/auth/forgot-password?email=${methods.watch('email') ?? ''}`}
            className="text-right text-sm text-primary hover:text-primary-hover font-medium"
          >
            {t('common:forgotPasswordLink')}
          </Link>
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
        <Link href="/auth/sign-up" className="text-primary font-bold">
          {t('common:signUp')}
        </Link>
      </span>
    </Card>
  )
}
