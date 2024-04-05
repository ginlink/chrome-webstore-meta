import { Converter } from './converter';
import { defaultUserConfig } from './data';
import { Prepare } from './prepare';
import { Requester } from './requester';
import { RequestConfig } from './types';

export async function parse(
  urlOrID: string | undefined,
  userConfig?: RequestConfig
) {
  // Assembly request parameter
  const prepare = new Prepare(urlOrID, defaultUserConfig, userConfig);

  // Get data
  const requester = new Requester(prepare);

  // Convert data
  const converter = new Converter(requester);
  return converter.run();
}

export default parse;
