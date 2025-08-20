import { headers } from 'next/headers';
import RedirectPage from './RedirectPage';
// import { detectUserAgent, IDetectUserAgent } from '@/lib/detect-user-agent';
import { v4 as uuid } from 'uuid';
// import { generateUrlForUserAgent } from '@/lib/redirection-url';
import { appConfig } from '@/lib/config';
import QRInstalationPage from '@/components/QRInstalationPage';

interface IUrlUserAgent {
  href: string | null;
  fallback: string;
}

interface IDetectUserAgent {
  isAndroid: boolean;
  isIOS: boolean;
  isChrome: boolean;
}

const generateTimeoutForUserAgent = ({
  isAndroid,
  isIOS,
}: IDetectUserAgent): number => {
  const { android, ios } = appConfig;
  return isAndroid ? android.timeout : isIOS ? ios.timeout : 500;
};

const detectUserAgent = (userAgent: string): IDetectUserAgent => {
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isChrome = /crios/i.test(userAgent); // Chrome en iOS
  return { isAndroid, isIOS, isChrome };
};

const generateUrlForUserAgent = (
  { isAndroid, isIOS, isChrome }: IDetectUserAgent,
  sessionId: string,
): IUrlUserAgent => {
  const { android, ios } = appConfig;
  const path = `/open?sessionId=${sessionId}`;

  if (isAndroid) {
    const { host, packageName, installUrl } = android;
    const pkg = encodeURIComponent(packageName);
    const fallback = encodeURIComponent(installUrl);
    const schema = 'https';
    const href = `intent://${host}${path}#Intent;scheme=${schema};package=${pkg};S.browser_fallback_url=${fallback};end`;
    return { href, fallback };
  }

  if (isIOS && isChrome) {
    const fallback = ios.installUrlChrome;
    const href = `${ios.schemaLink}/${path}`; // the / is required
    return { href, fallback };
  }

  if (isIOS && !isChrome) {
    const fallback = ios.installUrl;
    const href = `${appConfig.ios.universalLink}${path}`;
    return { href, fallback };
  }

  return { href: null, fallback: '/installation' };
};

export default async function ShortlinkPage({
  userAgent,
}: {
  userAgent: string;
}) {
  const sessionId = uuid();

  const detectedUserAgent = detectUserAgent(userAgent);
  const redirectTo = generateUrlForUserAgent(detectedUserAgent, sessionId);
  const timeout = generateTimeoutForUserAgent(detectedUserAgent);

  return (
    <>
      {/* <h1>Redirecting to {redirectTo.href}</h1>
      <h1>Fallback to {redirectTo.fallback}</h1> */}
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
