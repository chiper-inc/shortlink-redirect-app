export interface IDetectUserAgent {
  isAndroid: boolean;
  isIOS: boolean;
  isChrome: boolean;
}

export function detectUserAgent(userAgent: string): IDetectUserAgent {
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isChrome = /crios/i.test(userAgent); // Chrome en iOS
  return { isAndroid, isIOS, isChrome };
}
