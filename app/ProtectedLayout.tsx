'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken } = useAuthStore(state => ({
    accessToken: state.accessToken,
  }));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!accessToken) {
      router.replace('/auth/sign-in');
    }
  }, [accessToken, router]);

  if (!isMounted) {
    return null; 
  }

  if (!accessToken) {
    return null; 
  }

  return <>{children}</>;
}
