import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core'
import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/notifications/styles.css'
import { RouterTransition } from '@/components/public/RouterTransition'
import React from 'react'
import { ReactQueryClientProvider } from '@/components/config/ReactQueryClientProvider'
import { Notifications } from '@mantine/notifications'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: [
      '#ffffff',
      '#e6f1ff',
      '#cce4ff',
      '#9ac8ff',
      '#80bbff',
      '#67adff',
      '#1b84ff',
      '#4e9fff',
      '#3492ff',
      '#1b84ff',
    ],
  },
  fontFamily: inter.className,
  black: '#3a4752',
})

export const metadata: Metadata = {
  title: 'Next 14 Boilerplate',
  description: 'New Next 14 boilerplate with Mantine and TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <MantineProvider theme={theme}>
            <RouterTransition />
            <Notifications />
            {children}
          </MantineProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  )
}
