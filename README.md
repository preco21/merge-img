# merge-img

[![Code Style Prev](https://img.shields.io/badge/code%20style-prev-32c8fc.svg?style=flat-square)](https://github.com/preco21/eslint-config-prev)
[![NPM Version](https://img.shields.io/npm/v/merge-img.svg?style=flat-square)](https://www.npmjs.com/package/merge-img)
[![Build Status](https://img.shields.io/travis/preco21/merge-img/master.svg?style=flat-square)](https://travis-ci.org/preco21/merge-img)
[![Dependency Status](https://dependencyci.com/github/preco21/merge-img/badge?style=flat-square)](https://dependencyci.com/github/preco21/merge-img)

> Merge multiple images into one single image in serial

`merge-img` simply merges passed images into one single image in serial. This may helpful for task which has to generate a preview of multiple images in single image. This moudle is based on [`Jimp`][jimp].

![figure](https://rawgit.com/preco21/merge-img/master/media/figure.png)

## Install

```bash
$ npm install merge-img
```

## Usage

```javascript
import mergeImg from 'merge-img';

mergeImg(['image-1.png', 'image-2.jpg'])
  .then((img) => {
    // Save image as file
    img.write('out.png', () => console.log('done'));

    // Get image as `Buffer`
    img.getBuffer(img.getMIME(), (buf) => console.log(buf));
  });
```

## API

### mergeImg(images[, options])

* `images` Array of `String` and `Buffer` - List of images to be merged. If `String` has passed, it will be considered to file path.
* `options` Object (optional)
  * `direction` Boolean - Direction of merged image. If this value is `true`, the images are merged vertically. Otherwise, the images are merged horizontally.
  * `color` Number (hex) - Default background color represented by RGBA hex value. Default is `0x00000000`.
  * `align` String - Aligns given images. If the images are not all the same size, images will be sorted to largest image. Possible values are `start`, `center` and `end`. Default is `start`.
  * `offset` Number - Offset in pixels between each image. Default is `0`.

Returns a `Promise` that contains [`Jimp`][jimp] object, so you can do more task with it.

## License

[MIT](https://preco.mit-license.org/)

[jimp]: https://github.com/oliver-moran/jimp#writing-to-files-and-buffers
