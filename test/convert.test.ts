import { Converter } from '../src/converter';
import { Requester } from '../src/requester';
import fs from 'fs';

describe('convert', () => {
  it('should return metadata', async () => {
    const html = fs.readFileSync('test/test-webstore.html', 'utf8');

    const requester = {
      get: jest.fn().mockReturnValue(html),
    } as unknown as Requester;

    const converter = new Converter(requester);
    const res = await converter.run();

    expect(res).toEqual({
      description: expect.any(String),
      id: expect.any(String),
      image: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      url: expect.any(String),
      version: expect.any(String),
    });
  });
});
