import { SignInCard } from '@/components/public/auth/cards/SignInCard'
import { Metadata } from 'next'
import initTranslations from '@/app/i18n'
import { MetadataProps } from '@/types/config/metadata'

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
    title: `${t('common:signIn')} | Next 14`,
  }
}

export default function SignIn() {
  return <SignInCard />
}
