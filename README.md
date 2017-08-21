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

* `images` Array of (String | Buffer | Object) - List of images to concat. If `String` has passed, it will be considered to file path. An `Object` entry can have following options:
  * `src` _`String`_ or `Buffer` - A single image source to concat.
  * `offsetX` Number (optional) - `x` offset to affect this image. Default is `0`.
  * `offsetY` Number (optional) - `y` offset to affect this image. Default is `0`.
* `options` Object (optional)
  * `direction` Boolean - Direction of the merged image. If this value is `true`, the images will be merged vertically (column). Otherwise, the images will be merged horizontally (row). Default is `false`.
  * `color` Number (hex) - Default background color represented by RGBA hex value. Default is `0x00000000`.
  * `align` String - Aligning of given images. If the images are not all the same size, images will be sorted to largest image. Possible values are `start`, `center` and `end`. Default is `start`.
  * `offset` Number - Offset in pixels between each image. Default is `0`.
  * `margin` (Number | String | Object) - Margin of the result image. If `Number` or `String` has passed, it will be considered as [standard css shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) (e.g. '40 40 0 10'). An `Object` entry can have following options:
    * `top` Number (optional) - Margin on top side of result image. Default is `0`.
    * `right` Number (optional) - Margin on right side of result image. Default is `0`.
    * `bottom` Number (optional) - Margin on bottom side of result image. Default is `0`.
    * `left` Number (optional) - Margin on left side of result image. Default is `0`.

Returns a `Promise` that contains [`Jimp`][jimp] object.

## License

[MIT](https://preco.mit-license.org/)

[jimp]: https://github.com/oliver-moran/jimp#writing-to-files-and-buffers
