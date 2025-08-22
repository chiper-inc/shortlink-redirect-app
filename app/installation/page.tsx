import ShortlinkPage from "@/components/ShortlinkPage";
import Image from "next/image";
import { headers } from "next/headers";

export default async function InstallationPage() {
  const userAgent = (await headers()).get("user-agent") || "";

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center">
      <section className="mx-auto w-full max-w-6xl px-6 py-16 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="pl-6">
              <div className="flex flex-col items-start gap-6">
                <img
                  src="/logo.png"
                  alt="App logo"
                  className="h-12 md:h-14 w-auto"
                  style={{ maxWidth: '160px' }}
                  draggable={false}
                />
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                  <span className="text-[#2F2E4F]">El marketplace que tu negocio necesita</span>
                </h1>
              </div>
            <p className="mt-3 text-[#475569] text-lg">
              Accede al portafolio más completo de productos para tu negocio. Haz tus pedidos en cualquier momento, recibe en 24-48 horas y aprovecha promociones diarias. Escanea el código QR para descargar nuestra app.<br />
            </p>
          </div>

          {/* Oculta cualquier <ul> interno (checklist) dentro del card */}
          <div className="mt-8 rounded-2xl border border-[#E5EAF2] bg-white shadow-lg p-5 flex flex-row items-center gap-4 [&_ul]:hidden">
            <div className="shrink-0 flex items-center justify-center h-full">
              <ShortlinkPage userAgent={userAgent} />
            </div>
            <div className="flex flex-col justify-center w-full">
              <p className="text-lg md:text-xl font-extrabold text-[#2F2E4F] mb-1 leading-tight">Escanea para descargar</p>
              <p className="text-base text-[#475569] font-medium leading-snug">
                Pedidos fáciles, entregas rápidas y descuentos todos los días.
              </p>
            </div>
          </div>

          {/* Checklist solo fuera del contenedor */}
          <ul className="mt-4 text-xs text-[#94A3B8] pl-6 flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <li className="before:mr-2 before:content-['✓']">Entregas diarias</li>
            <li className="before:mr-2 before:content-['✓']">Descuentos exclusivos</li>
            <li className="before:mr-2 before:content-['✓']">Portafolio completo</li>
          </ul>
        </div>

        <div className="hidden md:block md:col-span-5 order-1 md:order-2 flex items-center">
          <div className="w-full max-w-[360px] md:w-[360px] md:h-[720px] mx-auto flex items-center justify-center">
            <Image
              src="/cellphone_image.png"
              alt="Cellphone mockup"
              width={360}
              height={720}
              className="drop-shadow-2xl object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}