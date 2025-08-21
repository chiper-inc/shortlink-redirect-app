import { appConfig } from '@/lib/config';
import { IDetectUserAgent } from './detect-user-agent';
import Fallback from '../app/redirect/fallback/page';

export interface IUrlUserAgent {
  href: string | null;
  fallback: string;
}

export const generateUrlForUserAgent = (
  { isAndroid, isIOS, isChrome }: IDetectUserAgent,
  sessionId: string,
): IUrlUserAgent => {
  const { android, ios } = appConfig;
  const path = '/open?';

  if (isAndroid) {
    const { host, packageName, installUrl } = android;
    const pkg = encodeURIComponent(packageName);
    const fallback = encodeURIComponent(installUrl);
    const schema = 'https';
    const href = `intent://${host}${path}?sessionId=${sessionId}#Intent;scheme=${schema};package=${pkg};S.browser_fallback_url=${fallback};end`;
    return { href, fallback };
  }

  if (isIOS && isChrome) {
    const fallback = ios.installUrlChrome;
    const href = `${ios.schemaLink}${path}?sessionId=${sessionId}`;
    return { href, fallback };
  }

  if (isIOS && !isChrome) {
    const fallback = ios.installUrl;
    const href = `${appConfig.ios.universalLink}?sessionId=${sessionId}`;
    return { href, fallback };
  }

  return { href: null, fallback: '/installation' };
};
