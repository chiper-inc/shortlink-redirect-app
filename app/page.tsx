import Image from "next/image";

export default function Home() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center flex flex-col items-center">
        <Image src="/next.svg" alt="Next.js logo" width={120} height={32} priority />
        <h1 className="mt-6 text-3xl font-extrabold text-[#2F2E4F]">Welcome to Chiper Shortlink!</h1>
        <p className="mt-3 text-lg text-[#475569] max-w-xl">
        </p>
        <div className="mt-8 flex flex-col gap-4 w-full">
          <a
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#00B56B] to-[#01985F] hover:opacity-95 active:scale-[0.99] transition"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy now
          </a>
          <a
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-[#2F2E4F] font-semibold bg-[#F5F7FB] border border-[#E5EAF2] hover:bg-[#E5EAF2] active:scale-[0.99] transition"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
        <span className="block mt-6 text-xs text-[#94A3B8]">✓ Free download · ✓ No registration required · ✓ Works offline</span>
      </div>
    </div>
  );
}
