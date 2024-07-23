'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/modules/public/Hero';
import { TopNavigation } from '@/modules/public/TopNavigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function Home() {
  const router = useRouter();
  const { accessToken } = useAuthStore(state => ({
    accessToken: state.accessToken,
  }));

  useEffect(() => {
    if (accessToken) {
      router.push('/');
    }
  }, [accessToken, router]);

  return (
    <main className="">
      <Hero />
    </main>
  );
}
