import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const LoginCallback = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/search');
  }, [router]);

  return (
    <div>
      Logging you in...
    </div>
  );
};

export default LoginCallback;
