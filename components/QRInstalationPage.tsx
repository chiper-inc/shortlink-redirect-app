export default function QRInstalationPage({ to }: { to: string }) {
  return (
    <div>
      <h1>Installation Instructions</h1>
      <p>Scan the QR code below to install the app:</p>
      <p>{to}</p>
      <a href={to}>Download App</a>
    </div>
  );

  // TODO incluir una card pa adad a
}
