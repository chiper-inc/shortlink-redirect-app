'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function RedirectPage() {
  const sessionId = uuid();
  // const navigate = useNavigate();
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // Attempt to open the app
    window.location.href = `myapp://open?session=${sessionId}`;
    console.log(`Opening app with session ID: ${sessionId}`);

    const interval = setInterval(async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      const data = await res.json();

      console.log(data);

      if (data.status === 'confirmed') {
        clearInterval(interval);
        redirect('/success');
        // navigate('/success');
      }
    }, 2000);

    // Timeout fallback to store
    const timeout = setTimeout(() => {
      clearInterval(interval);
      redirect('/fallback');
      // navigate('/fallback');
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [sessionId /*, navigate */]);

  return <div>Opening App... Status: {status}</div>;
}
