import { IPrepare, RequestConfig } from '../types';

export class Prepare implements IPrepare {
  private id: string;
  private config: RequestConfig;

  constructor(
    urlOrID: string | undefined,
    defaultUserConfig: RequestConfig,
    userConfig?: RequestConfig
  ) {
    if (!urlOrID) {
      throw new Error('urlOrID is required');
    }

    this.id = this.transformID(urlOrID);
    this.config = {
      headers: userConfig?.headers || defaultUserConfig.headers,
      qs: userConfig?.qs || defaultUserConfig.qs,
    };
  }

  private transformID(identifierOrUrl: string) {
    // url decoding to avoid secondary encoding
    identifierOrUrl = decodeURIComponent(identifierOrUrl);

    let identifier = identifierOrUrl;

    if (/^(http|https)/.test(identifierOrUrl)) {
      const detailIndex = identifierOrUrl.indexOf('detail/');
      const startIndex =
        detailIndex !== -1 ? detailIndex + 'detail/'.length : 0;
      const endIndex = identifierOrUrl.length;
      identifier = identifierOrUrl.substring(startIndex, endIndex);
    }

    identifier = identifier.replace(/^\/|\/$/g, ''); // Remove the top-level slash

    // Remove query params
    if (identifier.split('?').length > 0) {
      identifier = identifier.split('?')[0];
    }

    const splits = identifier.split('/');
    if (splits.length > 1) {
      // url encoding first digit
      identifier =
        encodeURIComponent(splits[0]) + '/' + splits.slice(1).join('/');
    }

    return identifier;
  }

  public getConfig() {
    return this.config;
  }

  public getUrl() {
    const qs = new URLSearchParams(this.config.qs).toString();
    const url = `https://chromewebstore.google.com/detail/${this.id}?${qs}`;
    return url;
  }
}
