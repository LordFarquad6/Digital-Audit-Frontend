'use client'
import { Button, Card } from '@mantine/core'
import Link from 'next/link'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'
import { useTranslation } from 'react-i18next'
import { useFormMutation } from '@/hooks/useFormMutation'
import { notifications } from '@mantine/notifications'
import {
  signUp,
  SignUpFormFields,
  SignUpResponse,
  signUpSchema,
} from '@/api/public/auth/signUp'
import { PiStudentFill } from 'react-icons/pi'
import { VscOrganization } from 'react-icons/vsc'
import { InputText } from '@/components/common/form/InputText'
import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export const SignUpCard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { methods, handleSubmit, isPending } = useFormMutation<
    SignUpFormFields,
    SignUpResponse
  >(
    signUpSchema,
    signUp,
    {
      onSuccess() {
        notifications.show({
          message: t('common:accountCreatedSuccessfully'),
          color: 'green',
        })
        router.push('/auth/sign-in')
      },
    },
    {
      asStudent: true,
    },
  )

  const asStudent = methods.watch('asStudent')

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
          <span className="font-medium text-gray-500">
            {t('common:selectAccountType')}
          </span>
          <div className="flex gap-4 justify-evenly">
            <button
              className={`rounded  w-36 h-36 flex flex-col justify-center items-center font-bold gap-2  transition-colors  ${asStudent ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}
              onClick={() => methods.setValue('asStudent', true)}
            >
              <PiStudentFill
                size={40}
                className={`${!asStudent ? 'text-primary' : 'text-white'}`}
              />
              {t('common:student')}
            </button>
            <button
              className={`rounded  w-36 h-36 flex flex-col justify-center items-center font-bold gap-2  transition-colors  ${!asStudent ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}
              onClick={() => methods.setValue('asStudent', false)}
            >
              <VscOrganization
                size={40}
                className={`${asStudent ? 'text-primary' : 'text-white'}`}
              />
              {t('common:company')}
            </button>
          </div>

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
            {t('common:signUp')}
          </Button>
          <div className="flex items-center w-full gap-3">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <div className="text-gray-500">{t('common:or')}</div>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>
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
          <span className="text-center">
            {t('common:accountExistsDesc')}{' '}
            <Link href="/auth/sign-in" className="text-primary font-bold">
              {t('common:signIn')}
            </Link>
          </span>
        </form>
      </FormProvider>
    </Card>
  )
}
