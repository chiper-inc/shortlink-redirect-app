export default async function Fallback({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { to } = await searchParams;
  return (
    <h1>
      Could not open the app. URL ({to}){' '}
      <a href={to as unknown as string}>Install it here</a>
    </h1>
  );

  // TODO detectar el sistema operativo del usuario y navegador
  // Incluir una card con:
  // - Invitación al usuario a instalar la app
  // - Un botón que lo lleve a la tienda correspondiente, la href de la tienda debe venir como parametro
}
