# merge-img

[![Code Style Prev](https://img.shields.io/badge/code%20style-prev-32c8fc.svg?style=flat-square)](https://github.com/preco21/eslint-config-prev)

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
    img.write('out.png');
  });
```

## API

### mergeImg(images[, options])

* `images` Array of `String` and `Buffer` - List of images to be merged.
* `options` Object
  * `direction` Boolean - Direction of merged image. If this value is `true`, the images are merged vertically. Otherwise, the images are merged horizontally.
  * `color` Number (hex) - Default background color represented by hex value.
  * `align` String - Aligns the images. If the images are not all the same size, they are sorted by the largest image. Possible values are `start`, `center` and `end`.
  * `offset` Number - Offsets between each image.

Returns a `Promise` for merged image.

## License

[MIT](https://preco.mit-license.org/)
