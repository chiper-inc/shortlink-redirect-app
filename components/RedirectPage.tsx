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
  const [status, setStatus] = useState('pending');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!redirectTo.href) {
      redirect('/non-mobile');
    }
    // Attempt to open the app
    window.location.href = redirectTo.href;

    // Barra de progreso real
    const totalTime = timeout * 4;
    const intervalMs = 100;
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += intervalMs;
      setProgress(Math.min((elapsed / totalTime) * 100, 100));
    }, intervalMs);

    const intervalObj = setInterval(async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      const data = await res.json();

      if (data.status === 'confirmed') {
        clearInterval(intervalObj);
        clearInterval(progressInterval);
        redirect(`/redirect/success?to=${redirectTo.href}`);
      }
    }, timeout);

    // Timeout fallback to store
    const timeoutObj = setTimeout(() => {
      clearInterval(intervalObj);
      clearInterval(progressInterval);
      redirect(`/redirect/fallback?to=${redirectTo.fallback}`);
    }, totalTime);

    return () => {
      clearInterval(intervalObj);
      clearInterval(timeoutObj);
      clearInterval(progressInterval);
    };
  }, [sessionId, redirectTo, timeout]);

  // Visual loading card
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB] p-6">
      <div className="w-full max-w-md rounded-3xl border border-[#E5EAF2] bg-white p-8 text-center shadow-[0_20px_60px_rgba(47,46,79,0.08)]">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <img src="/logo.png" alt="Chiper Logo" width={84} height={84} className="object-contain" style={{ filter: 'grayscale(0) brightness(1) saturate(2)' }} />
        </div>
        {/* Loader spinner rojo, separado y accesible */}
        <div className="mx-auto mb-4 flex items-center justify-center">
          <svg
            aria-hidden="true"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="motion-safe:animate-spin motion-reduce:animate-none text-[#FF0136]"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#FF0136"
              strokeWidth="4"
              opacity="0.2"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="#FF0136"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {/* Título */}
        <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-[#2F2E4F]">
          Cargando tu experiencia
        </h2>
        {/* Subtítulo */}
        <p className="text-[#475569] text-base leading-relaxed mb-6">
          En unos segundos estarás listo para continuar.
        </p>
        {/* Barra de carga con accesibilidad y colores de marca */}
        <div className="w-full bg-[#FFE5EC] rounded-full h-3 mb-4" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="bg-gradient-to-r from-[#FF0136] to-[#FF5A8A] h-3 rounded-full transition-all duration-100 motion-safe:animate-pulse motion-reduce:animate-none"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
