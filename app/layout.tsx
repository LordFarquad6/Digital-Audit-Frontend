"use client"

import { Poppins } from 'next/font/google'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Global } from '@emotion/react';
import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/notifications/styles.css'
import { RouterTransition } from '@/components/public/RouterTransition'
import React from 'react'
import { ReactQueryClientProvider } from '@/components/config/ReactQueryClientProvider'
import { Notifications } from '@mantine/notifications'
import { GoogleAnalytics } from '@next/third-parties/google'
import { lightTheme, darkTheme } from '@/utils/themes';
import { useThemeStore } from '@/store/useThemeStore'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] })

const GlobalStyles = ({ colorScheme }: { colorScheme: 'light' | 'dark' }) => (
  <Global
    styles={{
      body: {
        backgroundColor: colorScheme === 'dark' ? '#0d1117' : '#f5f5f5',
        color: colorScheme === 'dark' ? '#ffffff' : '#000000',
      },
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { colorScheme } = useThemeStore();
  console.log(colorScheme)
  
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <MantineProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyles colorScheme={colorScheme} />
            <RouterTransition />
            <Notifications />
            
            {children}
          </MantineProvider>
        </ReactQueryClientProvider>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string}
        />
      </body>
    </html>
  )
}
