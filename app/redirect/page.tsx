import { headers } from 'next/headers';
import RedirectPage from '../../components/RedirectPage';
import { detectUserAgent, IDetectUserAgent } from '@/lib/detect-user-agent';
import { v4 as uuid } from 'uuid';
import { generateUrlForUserAgent } from '@/lib/redirection-url';
import { appConfig } from '@/lib/config';
import Fallback from './fallback/page';
import QRInstalationPage from '@/components/QRInstalationPage';

const generateTimeoutForUserAgent = ({
  isAndroid,
  isIOS,
}: IDetectUserAgent): number => {
  const { android, ios } = appConfig;
  return isAndroid ? android.timeout : isIOS ? ios.timeout : 500;
};

export default async function Page() {
  const sessionId = uuid();

  const userAgent = (await headers()).get('user-agent') || '';

  const detectedUserAgent = detectUserAgent(userAgent);
  const redirectTo = generateUrlForUserAgent(detectedUserAgent, sessionId);
  const timeout = generateTimeoutForUserAgent(detectedUserAgent);

  return (
    <>
      <h1>Redirecting to {redirectTo.href}</h1>
      <h1>Fallback to {redirectTo.fallback}</h1>
      {redirectTo.href && (
        <RedirectPage
          sessionId={sessionId}
          redirectTo={redirectTo}
          timeout={timeout}
        />
      )}
      {!redirectTo.href && <QRInstalationPage to={redirectTo.fallback} />}
    </>
  );
}
