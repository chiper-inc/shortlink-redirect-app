interface QRInstalationPageProps {
  to?: string;
  qrSrc?: string;
  size?: number;
}

export default function QRInstalationPage({ to, qrSrc = "/QR.png", size = 160 }: QRInstalationPageProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img
        src={qrSrc}
        alt="QR code to install app"
        style={{ width: size, height: size }}
        className="rounded-xl border border-[#E5EAF2] bg-[#F5F7FB]"
      />
    </div>
  );
}
