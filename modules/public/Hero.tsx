'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const Hero = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-76px)]">
      <div className="flex-1 flex justify-center items-center p-2 relative">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-3 z-10 p-6">
          <p className="font-bold">🌟 Discover new possibilities</p>
          <h1 className="text-4xl font-bold">
            Your new <span className="text-primary">Next 14 boilerplate</span>
          </h1>
          <p className="my-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            quisquam, provident officiis minus itaque aspernatur omnis ipsam,
            consequuntur modi voluptates assumenda sed totam voluptatibus
            voluptas nihil facilis libero eum eaque?
          </p>
          <div className="flex gap-4">
            <Link
              href="/public/tab"
              className="bg-primary rounded-full px-4 py-3 text-white text-sm hover:bg-primary-hover transition-colors"
            >
              Read more
            </Link>
            <Link
              href="/auth/sign-up"
              className="border-primary border text-primary rounded-full px-4 py-3 text-sm hover:bg-primary hover:text-white transition-colors"
            >
              {t('common:signUp')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
