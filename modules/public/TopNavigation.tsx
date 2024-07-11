'use client'
import { nprogress } from '@mantine/nprogress'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RxHamburgerMenu } from 'react-icons/rx'

export const TopNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center p-5">
        <div className="flex items-center">
          <h1>NEXT14</h1>
        </div>
        <div className="relative">
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(val => !val)}
          >
            <RxHamburgerMenu size={25} />
          </button>
          <div
            className={`${
              menuOpen ? 'flex' : 'hidden md:flex'
            } flex-col md:flex-row absolute md:static right-0 top-full items-center gap-8 shadow-xl md:shadow-none p-3 md:p-0 bg-white rounded-lg w-max z-20`}
          >
            <Link href="/public/tab" className="hover:text-primary">
              Tab
            </Link>
            <Link href="/public/tab" className="hover:text-primary">
              Tab
            </Link>
            <Link href="/public/tab" className="hover:text-primary">
              Tab
            </Link>
            <Link
              href="/auth/sign-in"
              className="bg-primary rounded-full px-4 py-2 text-white text-sm hover:bg-primary-hover transition-colors"
              onClick={() => nprogress.start()}
            >
              {t('common:signIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
