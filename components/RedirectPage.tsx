'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IUrlUserAgent } from '../lib/redirection-url';

export default function RedirectPage({
  sessionId,
  redirectTo,
  timeout,
}: {
  sessionId: string;
  redirectTo: IUrlUserAgent;
  timeout: number;
}) {
  // const navigate = useNavigate();
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (!redirectTo.href) {
      redirect('/non-mobile');
    }
    // Attempt to open the app
    window.location.href = redirectTo.href;
    console.log(`Opening app with session ID: ${sessionId}`);

    const intervalObj = setInterval(async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      const data = await res.json();

      if (data.status === 'confirmed') {
        clearInterval(intervalObj);
        redirect(`/redirect/success?to=${redirectTo.href}`);
      }
    }, timeout);

    // Timeout fallback to store
    const timeoutObj = setTimeout(() => {
      clearInterval(intervalObj);
      redirect(`/redirect/fallback?to=${redirectTo.fallback}`);
    }, timeout * 8);

    return () => {
      clearInterval(intervalObj);
      clearTimeout(timeoutObj);
    };
  }, [sessionId, redirectTo]);

  return (
    <div>
      Opening App... Status: {status}
      <p>{redirectTo.href}</p>
      <p>{redirectTo.fallback}</p>
    </div>
  );
}
