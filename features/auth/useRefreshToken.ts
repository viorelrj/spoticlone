import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRefreshToken = () => {
  const router = useRouter();

  useEffect(() => {
    if (window.token) return;
    fetch('/api/refresh-token').then(res => res.json()).then(res => {
      window.token = res.accessToken as string;
    })
  }, [router]);
}

export { useRefreshToken }