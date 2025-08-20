export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { to } = await searchParams;
  return <h1>App opened successfully! URL ({to})</h1>;

  // TODO incluir un card con:
  // - Información indicado que se lanzó la aplicación
  // - Boton para ir a la App con el href este debe venir como parametro
}
