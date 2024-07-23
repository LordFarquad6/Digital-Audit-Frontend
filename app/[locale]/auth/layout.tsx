'use client'

import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { accessToken } = useAuthStore(state => ({
    accessToken: state.accessToken,
  }));

  useEffect(() => {
    if (accessToken) {
      router.replace('/');
    }
  }, [accessToken, router]);

  if (typeof window === 'undefined') {
    return null; 
  }

  if (accessToken) {
    return null; 
  }

  return (
    <main className="bg-slate-200 h-full flex justify-center items-center relative">
      {children}
    </main>
  );
}
