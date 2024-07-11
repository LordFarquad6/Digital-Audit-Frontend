import initTranslations from '@/app/i18n'
import { SignUpCard } from '@/components/public/auth/cards/SignUpCard'
import { MetadataProps } from '@/types/config/metadata'
import { Metadata } from 'next'

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
    title: `${t('common:signUp')} | Next 14`,
  }
}

export default function SignUp() {
  return <SignUpCard />
}
