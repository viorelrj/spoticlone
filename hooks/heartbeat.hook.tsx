import { useEffect, useRef, useState } from 'react';

export function useHeartbeat(time: number, shouldContinue: boolean) {
  const [beat, setBeat] = useState({});
  const continueRef = useRef(shouldContinue);

  useEffect(() => {
    continueRef.current = shouldContinue;
  }, [shouldContinue]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!continueRef.current) return;
      setBeat({});
    }, time);

    return () => clearInterval(interval);
  }, [setBeat, time]);

  return beat;
}
