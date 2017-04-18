# merge-img

[![Code Style Prev](https://img.shields.io/badge/code%20style-prev-32c8fc.svg?style=flat-square)](https://github.com/preco21/eslint-config-prev)
[![NPM Version](https://img.shields.io/npm/v/merge-img.svg?style=flat-square)](https://www.npmjs.com/package/merge-img)
[![Build Status](https://img.shields.io/travis/preco21/merge-img/master.svg?style=flat-square)](https://travis-ci.org/preco21/merge-img)
[![Dependency Status](https://dependencyci.com/github/preco21/merge-img/badge?style=flat-square)](https://dependencyci.com/github/preco21/merge-img)

> Merge multiple images into one single image

## Install

```bash
$ npm install --save merge-img
```

## Usage

```javascript
import mergeImg from 'merge-img';

mergeImg(['image-1.png', 'image-2.jpg'])
  .then((img) => {
    console.log(img); // => `[object Jimp]`

    // Save image as file
    img.write('out.png', () => console.log('done'));

    // Get image as `Buffer`
    img.getBuffer(img.getMIME(), (buf) => console.log(buf));
  });

// You can pass image buffers as well
mergeImg([imgBuffer1, imgBuffer2])
  .then((img) => {
    // Do something
  });
```

## API

### mergeImg(images[, options])

* `images` Array of `String` and `Buffer` - List of images to be merged.
* `options` Object (optional)
  * `direction` Boolean - Direction of merged image. If this value is `true`, the images are merged vertically. Otherwise, the images are merged horizontally.
  * `color` Number (hex) - Default background color represented by hex value.
  * `align` String - Aligns the images. If the images are not all the same size, they are sorted by the largest image. Possible values are `start`, `center` and `end`.
  * `offset` Number - Offset in pixels between each image.

Returns a `Promise` that contains [`Jimp`](https://github.com/oliver-moran/jimp#writing-to-files-and-buffers) object, so you can do additional tasks with it.

## License

[MIT](https://preco.mit-license.org/)
