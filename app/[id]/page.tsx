import ShortlinkPage from '@/components/ShortlinkPage';
import { headers } from 'next/headers';

interface ShortlinkRedirectionProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(context: ShortlinkRedirectionProps) {
  const { id } = await context.params;

  const userAgent = (await headers()).get('user-agent') || '';

  return (
    <>
      {/* <h1>Shorlink present.</h1>
      <div> Shorlink Id {id}</div> */}
      <ShortlinkPage userAgent={userAgent} />
    </>
  );
}
