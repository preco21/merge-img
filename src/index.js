import Jimp, {read} from 'jimp';

function mergeImg(images, {
    direction = false,
    color = 0x00000000,
    align = 'center',
    offset = 0,
} = {}) {
  if (!Array.isArray(images)) {
    throw new TypeError('`images` must be an array contains images');
  }

  if (images.length < 1) {
    throw new Error('At least `images` must contain more than one image');
  }

  return Promise.all(images.map((img) => read(img)))
    .then((imgs) => {
      let totalX = 0;
      let totalY = 0;

      const imgData = imgs.reduce((res, elem) => {
        const {bitmap: {width, height}} = elem;

        res.push({
          img: elem,
          prevX: totalX,
          prevY: totalY,
        });

        totalX += width;
        totalY += height;

        return res;
      }, []);

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
