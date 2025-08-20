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

  if (isAndroid) {
    const { host, path, packageName, installUrl } = android;
    const pkg = encodeURIComponent(packageName);
    const fallback = encodeURIComponent(installUrl);
    const schema = 'https';
    const href = `intent://${host}${path}#Intent;scheme=${schema};package=${pkg};S.browser_fallback_url=${fallback};end`;
    return { href, fallback };
  }

  if (isIOS) {
    const fallback = encodeURIComponent(ios.installUrl);
    const href = isChrome
      ? `${ios.schemaLink}?session=${sessionId}`
      : `${appConfig.ios.universalLink}?session=${sessionId}`;
    return { href, fallback };
  }

  return { href: null, fallback: '/installation' };
};
