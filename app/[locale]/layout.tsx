import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import React from 'react'
import initTranslations from '../i18n'
import { TranslationsProvider } from '@/components/common/i18n/TranslationsProvider'

export default async function InternalizationLayout({
  params: { locale },
  children,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const { resources } = await initTranslations(locale, ['common', 'forms'])
  return (
    <TranslationsProvider
      namespaces={['common', 'forms']}
      locale={locale}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  )
}
