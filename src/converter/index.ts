import { Requester } from '../requester';
import { ChromeWebstoreMetaResult, IConverter } from '../types';
import { DomHandler, Parser, DomUtils } from 'htmlparser2';

export class Converter implements IConverter {
  private requester: Requester;

  constructor(requester: Requester) {
    this.requester = requester;
  }

  public async run() {
    const detailHtml = await this.requester.get();

    const itemProps: Record<string, any> = {};
    const handler = new DomHandler(null);
    new Parser(handler).end(detailHtml);

    // parse meta
    DomUtils.getElementsByTagName('meta', handler.dom, true).forEach(
      function (el) {
        const property = DomUtils.getAttributeValue(el, 'property');
        const contentValue = DomUtils.getAttributeValue(el, 'content');

        // A meta tag beginning with og:
        if (property && property.indexOf('og:') === 0) {
          let nameValue = property.replace('og:', '');
          nameValue = nameValue.replace('title', 'name'); // title -> name
          itemProps[nameValue.toLowerCase()] = contentValue;
          return;
        }
      }
    );

    // parse version
    const regex = /<div[^>]*>([\d.]+)<\/div>/;
    const versionMatch = detailHtml.match(regex);
    let version = null;
    if (versionMatch && versionMatch.length > 1) {
      version = versionMatch[1];
    }
    itemProps['version'] = version;

    if (Object.keys(itemProps).length === 0) {
      throw new Error('meta property not found');
    }
    if (
      !Object.prototype.hasOwnProperty.call(itemProps, 'url') ||
      !itemProps['url']
    ) {
      throw new Error('url in response is required');
    }
    const splitUrl = itemProps.url.split('/');
    itemProps['id'] = splitUrl[splitUrl.length - 1];

    return itemProps as ChromeWebstoreMetaResult;
  }
}
