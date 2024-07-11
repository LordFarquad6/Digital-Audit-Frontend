import initTranslations from '@/app/i18n'
import ConfirmAccountCard from '@/components/public/auth/cards/ConfirmAccountCard'
import { MetadataProps } from '@/types/config/metadata'
import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateStaticParams() {
  const locales = ['en', 'pl']
  const paths = locales.map(locale => ({
    locale,
  }))
  return paths
}

export async function generateMetadata({
  params: { locale },
}: MetadataProps): Promise<Metadata> {
  const { t } = await initTranslations(locale, ['common'])
  return {
    title: `${t('common:confirmAccount')} | Next 14`,
  }
}

export default function ConfirmAccount() {
  return (
    <Suspense>
      <ConfirmAccountCard />
    </Suspense>
  )
}
