import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import React from 'react'
import initTranslations from '../i18n'
import { TranslationsProvider } from '@/components/common/i18n/TranslationsProvider'
import { Metadata } from 'next'
import { MetadataLayoutProps } from '@/types/config/metadata'

export async function generateMetadata({
  params: { locale },
}: MetadataLayoutProps): Promise<Metadata> {
  const { t } = await initTranslations(locale, ['metadata'])

  return {
    title: t('metadata:title'),
    description: t('metadata:description'),
    keywords: t('metadata:keywords').split(','),
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://yourdomain.com',
      title: t('metadata:title'),
      description: t('metadata:description'),
      images: [
        {
          url: 'https://yourdomain.com/ogimage.png',
          width: 1200,
          height: 630,
          alt: 'next 14',
        },
      ],
    },
    twitter: {
      site: 'https://yourdomain.com',
      title: t('metadata:title'),
      description: t('metadata:description'),
      card: 'summary_large_image',
      images: [
        {
          url: 'https://yourdomain.com/ogimage.png',
          width: 1200,
          height: 630,
          alt: 'next 14',
        },
      ],
    },
    alternates: {
      canonical: 'https://yourdomain.com',
      languages: {
        en: 'https://yourdomain.com/en',
        pl: 'https://yourdomain.com/',
      },
    },
  }
}

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
