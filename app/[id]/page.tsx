interface ShortlinkRedirectionProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShortlinkPage(
  context: ShortlinkRedirectionProps,
) {
  const { id } = await context.params;
  return (
    <>
      <h1>Shorlink present.</h1>
      <div> Shorlink Id {id}</div>
    </>
  );
}
