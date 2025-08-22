import ShortlinkPage from '@/components/ShortlinkPage';
import { userAgent } from 'next/server';

export default async function Fallback({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { to, os } = await searchParams;
  const href =
    typeof to === 'string' ? to : Array.isArray(to) ? to[0] ?? '#' : '#';

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
        {/* Título */}
        <h2 className="mb-1 text-2xl font-extrabold tracking-tight text-[#2F2E4F] max-w-[36ch] mx-auto">
          Descarga nuestra app y empieza a pedir
        </h2>
        {/* Subtítulo */}
        <p className="mt-2 text-base leading-relaxed mb-4 text-[#1e293b] max-w-[52ch] mx-auto">
          Tu negocio surtido en minutos, con entregas rápidas y descuentos
          diarios.
          <br />
          Haz clic en el botón para instalar la app.
        </p>
        {/* Botones de tienda solo como imágenes */}
        {/* Badges de tienda: grid responsivo, logos grandes y centrados */}
        <div className="mb-4 flex flex-row gap-3 items-center justify-center">
          {os === 'android' && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar en Google Play"
              className="transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF0136]/30"
            >
              <img
                src="/GP_LOGO.png"
                alt="Google Play"
                className="block"
                style={{ width: '160px', height: '48px' }}
              />
            </a>
          )}
          {os === 'ios' && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar en App Store"
              className="transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF0136]/30"
            >
              <img
                src="/AS_LOGO.png"
                alt="App Store"
                className="block"
                style={{ width: '160px', height: '48px' }}
              />
            </a>
          )}
        </div>
        {/* Checklist horizontal responsivo, visto rojo sin fondo circular */}
        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#475569] font-normal">
          <li className="flex items-center gap-1">
            <span
              aria-label="check"
              className="inline-flex items-center justify-center"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#94A3B8] animate-check"
              >
                <path
                  d="M4 7.5L6 9.5L10 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Entregas diarias
          </li>
          <li className="flex items-center gap-1">
            <span
              aria-label="check"
              className="inline-flex items-center justify-center"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#94A3B8] animate-check"
              >
                <path
                  d="M4 7.5L6 9.5L10 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Descuentos exclusivos
          </li>
          <li className="flex items-center gap-1">
            <span
              aria-label="check"
              className="inline-flex items-center justify-center"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#94A3B8] animate-check"
              >
                <path
                  d="M4 7.5L6 9.5L10 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Portafolio completo
          </li>
        </ul>
      </div>
    </div>
  );
}
