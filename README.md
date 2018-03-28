# merge-img

[![Code Style Prev](https://img.shields.io/badge/code%20style-prev-32c8fc.svg)](https://github.com/preco21/eslint-config-prev)
[![NPM Version](https://img.shields.io/npm/v/merge-img.svg)](https://www.npmjs.com/package/merge-img)
[![Build Status](https://travis-ci.org/preco21/merge-img.svg?branch=master)](https://travis-ci.org/preco21/merge-img)
[![Dependency Status](https://dependencyci.com/github/preco21/merge-img/badge)](https://dependencyci.com/github/preco21/merge-img)

> Merge multiple images into a single image

`merge-img` merges given images into a single image in right order. This will be helpful in a situation when you have to generate a preview of multiple images into a single image. This module is based on [`Jimp`][jimp] for image processing.

![figure](https://rawgit.com/preco21/merge-img/master/media/figure.png)
Image credit: https://www.pexels.com/

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
  });
```

## API

### mergeImg(images[, options])

* `images` Array of (String | Object | Buffer | [Jimp][jimp]) - List of images to concat. If `String` is passed, it will be considered to the file path. Also you can pass other [Jimp][jimp] object. An `Object` entry can have following options:
  * `src` _`String`_ or `Buffer` - A single image source to concat.
  * `offsetX` Number (optional) - `x` offset to affect this image. Default is `0`.
  * `offsetY` Number (optional) - `y` offset to affect this image. Default is `0`.
* `options` Object (optional)
  * `direction` Boolean - Direction of the merged image. If this value is `true`, the images will be merged vertically (column). Otherwise, the images will be merged horizontally (row). Default is `false`.
  * `color` Number (hex) - Default background color represented by RGBA hex value. Default is `0x00000000`.
  * `align` String - Aligning of given images. If the images are not all the same size, images will be sorted to largest image. Possible values are `start`, `center` and `end`. Default is `start`.
  * `offset` Number - Offset in pixels between each image. Default is `0`.
  * `margin` (Number | String | Object) - Margin of the result image. If `Number` or `String` is passed, it will be considered as [standard css shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) (e.g. '40 40 0 10'). An `Object` entry can have following options:
    * `top` Number (optional) - Margin on top side of result image. Default is `0`.
    * `right` Number (optional) - Margin on right side of result image. Default is `0`.
    * `bottom` Number (optional) - Margin on bottom side of result image. Default is `0`.
    * `left` Number (optional) - Margin on left side of result image. Default is `0`.

Returns a `Promise` that contains [`Jimp`][working-with-jimp] object.

## License

[MIT](https://preco.mit-license.org/)

[jimp]: https://github.com/oliver-moran/jimp
[working-with-jimp]: https://github.com/oliver-moran/jimp#writing-to-files-and-buffers
