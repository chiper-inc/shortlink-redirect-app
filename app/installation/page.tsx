import ShortlinkPage from '@/components/ShortlinkPage';
import { headers } from 'next/headers';

export default async function InstallationPage() {
  const userAgent = (await headers()).get('user-agent') || '';

  return (
    <>
      <h1>Installation Page.</h1>
      <ShortlinkPage userAgent={userAgent} />
    </>
  );
}
