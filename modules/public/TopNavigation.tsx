'use client'

import { nprogress } from '@mantine/nprogress'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Switch } from '@mantine/core'
import { useThemeStore } from '@/store/useThemeStore'

export const TopNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation()
  const { colorScheme, toggleColorScheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

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
            } flex-col md:flex-row absolute md:static right-0 top-full items-center gap-8 shadow-xl md:shadow-none p-3 md:p-0 dark:bg-gray-800 rounded-lg w-max z-20`}
          >
            <Link href="/devices" className="hover:text-primary">
              {t('common:Devices')}
            </Link>
            <Link
              href="/auth/sign-in"
              className="bg-primary rounded-full px-4 py-2 text-white text-sm hover:bg-primary-hover transition-colors"
              onClick={() => nprogress.start()}
            >
              {t('common:signIn')}
            </Link>
            <div className="mt-4 md:mt-0">
              <Switch
                checked={colorScheme === 'dark'}
                onChange={toggleColorScheme}
                size="lg"
                onLabel="Dark"
                offLabel="Light"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
