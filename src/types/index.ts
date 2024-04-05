export interface RequestConfig {
  headers?: Record<string, string>;
  qs?: Record<string, string>;
}

interface InteractionCount {
  UserDownloads: number;
}

export interface ChromeWebstoreMetaResult {
  type: string;
  name: string;
  description: string;
  image: string;
  url: string;
  version: string;
  id: string;

  price?: string;
  priceCurrency?: string;
  interactionCount?: InteractionCount;
  operatingSystem?: string;
  ratingValue?: number;
  ratingCount?: number;
}

export interface IPrepare {
  getConfig: () => RequestConfig;
  getUrl: () => string;
}

export interface IRequester {
  get: () => Promise<string>;
}

export interface IConverter {
  run: () => Promise<ChromeWebstoreMetaResult>;
}
