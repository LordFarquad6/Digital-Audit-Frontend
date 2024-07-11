'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { Button } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { notifications } from '@mantine/notifications'
import { usePathname } from 'next/navigation'
import ErrorPageImage from '@/public/images/error.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useTranslation()
  const pathname = usePathname()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${pathname}: ${error?.toString()}`)
    notifications.show({
      message: t('common:copied'),
      color: 'blue',
    })
  }

  return (
    <div className="flex justify-center items-center flex-1 min-h-full bg-gray-100 dark:bg-gray-700 dark:text-white p-4 md:p-14 text-center">
      <div className="text-center flex flex-col justify-center items-center gap-4 max-w-screen-lg">
        <Image src={ErrorPageImage} alt="Error occured" height={350} />
        <h1 className="text-4xl font-medium">{t('common:applicationError')}</h1>
        <p className="text-lg font-medium">
          {t('common:applicationErrorDesc')}
        </p>
        <Link href="/">
          <Button type="button" color="#eb644c" radius={8}>
            {t('common:returnToApp')}
          </Button>
        </Link>
        <p
          className="mt-8 "
          onClick={copyToClipboard}
          onSelect={copyToClipboard}
        >
          {t('common:applicationErrorDeveloperInfo')}
          <div className="text-sm">
            {pathname}: {error.message}
          </div>
        </p>
      </div>
    </div>
  )
}
