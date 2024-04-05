import { RequestConfig } from './types';

export const defaultUserConfig: RequestConfig = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  },
  qs: {
    hl: 'en',
    gl: 'US',
  },
};
