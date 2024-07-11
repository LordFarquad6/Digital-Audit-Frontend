'use client'
import { Card, Divider, Loader } from '@mantine/core'
import Image from 'next/image'

import { useTranslation } from 'react-i18next'
import confirmEmailImage from '@/public/images/mail-send.svg'
import { useRouter, useSearchParams } from 'next/navigation'
import { resendConfirmationEmail } from '@/api/public/auth/resendConfirmationEmail'
import { useMutation } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { confirmEmail } from '@/api/public/auth/confirmEmail'

export default function ConfirmAccountCard() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  const router = useRouter()

  const resendConfirmationEmailMutation = useMutation({
    mutationFn: resendConfirmationEmail,
    onSuccess() {
      notifications.show({
        message: t('common:confirmationEmailResent'),
        color: 'green',
      })
    },
    onError() {
      notifications.show({
        message: t('common:errorOccured'),
        color: 'red',
      })
    },
  })

  const confirmEmailMutation = useMutation({
    mutationFn: confirmEmail,
    onSuccess() {
      notifications.show({
        message: t('common:emailConfirmedSuccessfully'),
        color: 'green',
      })
      router.push('/auth/sign-in')
    },
    onError() {
      notifications.show({
        message: t('common:errorOccured'),
        color: 'red',
      })
    },
  })

  useEffect(() => {
    if (token && userId) {
      confirmEmailMutation.mutate({
        userId: userId as string,
        token: token as string,
      })
    }
  }, [token, userId])

  return (
    <Card
      shadow="xs"
      radius="md"
      padding="xl"
      className="w-[40rem] max-w-[90%] flex flex-col gap-5 justify-center items-center text-center text-sm"
    >
      <Image src={confirmEmailImage} alt="Email confirmation" height={150} />

      {(token && userId && !confirmEmailMutation.isError) ||
      (userId && email && !confirmEmailMutation.isError) ? (
        <>
          {!!email && (
            <>
              <h1 className="font-bold text-2xl">
                {t('common:emailConfirmation')}
              </h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('common:emailConfirmationDesc').replace(
                    '[email]',
                    `<span style="color:#1b84ff;font-weight: 500">${email}</span>`,
                  ),
                }}
              ></p>
              <Divider w="100%" />
              <div className="text-xs">
                <span>{t('common:resendConfirmationEmailQuestion')}</span>{' '}
                <button
                  className="text-primary font-medium hover:text-primary-hover"
                  onClick={() => {
                    if (!userId) {
                      notifications.show({
                        message: t('common:errorOccured'),
                        color: 'red',
                      })
                      return
                    }
                    resendConfirmationEmailMutation.mutate({
                      userId: userId as string,
                    })
                  }}
                >
                  {t('common:resendConfirmationEmailButton')}
                </button>
              </div>
            </>
          )}
          {confirmEmailMutation.isPending && <Loader color="blue" />}
          {confirmEmailMutation.isSuccess && (
            <h1 className="font-bold text-2xl text-green-500">
              {t('common:emailConfirmedSuccessfully')}
            </h1>
          )}
        </>
      ) : (
        <>
          <h1 className="font-bold text-2xl">{t('common:incorrectLink')}</h1>
          <p>{t('common:incorrectLinkDesc')}</p>
          {userId && (
            <>
              <Divider w="100%" />
              <div>
                <button
                  className="text-primary font-medium hover:text-primary-hover"
                  onClick={() => {
                    if (!userId) {
                      notifications.show({
                        message: t('common:errorOccured'),
                        color: 'red',
                      })
                      return
                    }
                    resendConfirmationEmailMutation.mutate({
                      userId: userId as string,
                    })
                  }}
                >
                  {t('common:resendConfirmationEmailButton')}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Card>
  )
}
