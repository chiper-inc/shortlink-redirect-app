import { headers } from 'next/headers';
import { detectUserAgent } from '@/lib/detect-user-agent';
import { generateUrlForUserAgent } from '@/lib/redirection-url';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { to } = await searchParams;
  const uaHeaders = headers();
  const ua =
    typeof (await uaHeaders).get === 'function'
      ? (await uaHeaders).get('user-agent') || ''
      : '';
  const sessionId = 'success-session';
  const platform = detectUserAgent(ua);
  const urlUserAgent = generateUrlForUserAgent(platform, sessionId);
  const href =
    typeof urlUserAgent.href === 'string' && urlUserAgent.href
      ? urlUserAgent.href
      : typeof to === 'string'
      ? to
      : Array.isArray(to)
      ? to[0] ?? '#'
      : '#';
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FB] p-4">
      <div className="w-full max-w-md rounded-3xl border border-[#E5EAF2] bg-white p-6 text-center shadow-[0_8px_32px_rgba(47,46,79,0.10)] flex flex-col items-center justify-center">
        {/* Logo Chiper rojo */}
        <div className="mb-4 flex items-center justify-center">
          <img
            src="/CHIPER_LOGO.png"
            alt="Chiper Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        {/* Icono de éxito */}
        <div className="mb-5 flex items-center justify-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#FF0136] animate-check"
          >
            <circle cx="12" cy="12" r="10" fill="#FF0136" opacity="0.15" />
            <path
              d="M8 12l2.5 2.5L16 9"
              stroke="#FF0136"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Título */}
        <h2 className="mb-1 text-2xl font-extrabold tracking-tight text-[#2F2E4F] max-w-[36ch] mx-auto">
          Abre la app y haz tu pedido ahora
        </h2>
        {/* Subtítulo */}
        <p className="text-[#475569] text-base leading-relaxed mb-6 max-w-[52ch] mx-auto">
          Tu negocio surtido en minutos, con entregas rápidas y descuentos
          diarios.
        </p>
        {/* Botón principal */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-xl bg-[#FF0136] text-white font-bold text-lg shadow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF0136]/30"
          aria-label="Inicia aquí"
        >
          Inicia aquí
        </a>
      </div>
    </div>
  );
}
