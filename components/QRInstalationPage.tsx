export default function QRInstalationPage({ to }: { to: string }) {
  return (
    <div>
      <h1>Installation Instructions</h1>
      <p>Scan the QR code below to install the app:</p>
      <a href={to}>Download App ({to})</a>
    </div>
  );

  // TODO incluir una card para mostrar el código QR y texto indicando que se debe escanear el QR desde el movil para instalar la app
}
