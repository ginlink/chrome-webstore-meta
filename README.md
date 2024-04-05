## @ginlink/chrome-webstore-meta

Get chrome extension item meta from Web Store.

Features:

- support new chrome webstore
- typescript
- support any language

## Installation

npm

```sh
npm add @ginlink/chrome-webstore-meta
```

yarn

```sh
yarn add @ginlink/chrome-webstore-meta
```

## Usage

```js
const { parse } = require('@ginlink/chrome-webstore-meta');

// 1.full url
parse(
  'https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb'
)
  .then((res) => {
    console.log('[res]:', res);
  })
  .catch((err) => {
    console.log('[err]:', err);
  });

// 2.only id
// parse('aapbdbdomjkkjkaonfhkkikfgjllcleb')
//   .then((res) => {
//     console.log('[res]:', res);
//   })
//   .catch((err) => {
//     console.log('[err]:', err);
//   });

// 3.with namespace and id
// parse('google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb')
//   .then((res) => {
//     console.log('[res]:', res);
//   })
//   .catch((err) => {
//     console.log('[err]:', err);
//   });

// 4.support any language, such as German
// parse(
//   'https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb',
//   {
//     qs: {
//       hl: 'de',
//       gl: 'DE',
//     },
//   }
// )
//   .then((res) => {
//     console.log('[res]:', res);
//   })
//   .catch((err) => {
//     console.log('[err]:', err);
//   });

/**
 * [res]: {
    type: 'website',
    name: 'Google Translate',
    description: 'View translations easily as you browse the web. By the Google Translate team.',
    image: 'https://lh3.googleusercontent.com/3ZU5aHnsnQUl9ySPrGBqe5LXz_z9DK05DEfk10tpKHv5cvG19elbOr0BdW_k8GjLMFDexT2QHlDwAmW62iLVdek--Q=s128-rj-sc0x00ffffff',
    url: 'https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb',
    version: '2.0.13',
    id: 'aapbdbdomjkkjkaonfhkkikfgjllcleb'
  }
 */
```
