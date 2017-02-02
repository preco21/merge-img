import Jimp, {read} from 'jimp';

function mergeImg(images, opts = {}) {
  if (!Array.isArray(images)) {
    throw new TypeError('`images` must be an array contains images');
  }

  if (images.length < 1) {
    throw new Error('At least `images` must contain more than one image');
  }

  const {
    direction = false,
    color = 0x00000000,
    align = 'center',
    offset = 0,
  } = opts;

  return Promise.all(images.map((img) => read(img)))
    .then((imgs) => {
      const {data: imgData} = imgs.reduce((res, elem) => {
        const {data, prevX, prevY} = res;
        const {bitmap: {width, height}} = elem;

        data.push({
          img: elem,
          prevX,
          prevY,
        });

        res.prevX = prevX + width; // eslint-disable-line no-param-reassign
        res.prevY = prevY + height; // eslint-disable-line no-param-reassign

        return res;
      }, {
        data: [],
        prevX: 0,
        prevY: 0,
      });

      const totalWidth = direction
        ? Math.max(...imgs.map(({bitmap: {width}}) => width))
        : imgs.reduce((res, {bitmap: {width}}) => res + width, 0) + ((imgs.length - 1) * offset);

      const totalHeight = direction
        ? imgs.reduce((res, {bitmap: {height}}) => res + height, 0) + ((imgs.length - 1) * offset)
        : Math.max(...imgs.map(({bitmap: {height}}) => height));

      const baseImage = new Jimp(totalWidth, totalHeight, color);

      const alignImage = (total, size) => {
        if (align === 'center') {
          return (total - size) / 2;
        }

        if (align === 'end') {
          return total - size;
        }

        return 0;
      };

      for (const [index, {img, prevX, prevY}] of imgData.map((elem, idx) => [idx, elem])) {
        const {bitmap: {width, height}} = img;
        const [px, py] = direction
          ? [alignImage(totalWidth, width), prevY + (index * offset)]
          : [prevX + (index * offset), alignImage(totalHeight, height)];

        baseImage.composite(img, px, py);
      }

      return baseImage;
    });
}

export {
  mergeImg as default,
};
