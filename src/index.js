import Jimp, {read} from 'jimp';

export default function mergeImg(images, {
  direction = false,
  color = 0x00000000,
  align = 'start',
  offset = 0,
} = {}) {
  if (!Array.isArray(images)) {
    throw new TypeError('`images` must be an array contains images');
  }

  if (images.length < 1) {
    throw new Error('At least `images` must contain more than one image');
  }

  const processImg = (img) => {
    if (typeof img === 'object') {
      const {src, offsetX, offsetY} = img;

      return read(src)
        .then((imgObj) => ({
          img: imgObj,
          offsetX,
          offsetY,
        }));
    }

    return read(img).then((imgObj) => ({img: imgObj}));
  };

  const alignImage = (total, size) => {
    if (align === 'center') {
      return (total - size) / 2;
    }

    if (align === 'end') {
      return total - size;
    }

    return 0;
  };

  return Promise.all(images.map(processImg))
    .then((imgs) => {
      let totalX = 0;
      let totalY = 0;

      const imgData = imgs.reduce((res, {img, offsetX = 0, offsetY = 0}) => {
        const {bitmap: {width, height}} = img;

        res.push({
          img,
          prevX: totalX + offsetX,
          prevY: totalY + offsetY,
          offsetX,
          offsetY,
        });

        totalX += width + offsetX;
        totalY += height + offsetY;

        return res;
      }, []);

      const totalWidth = direction
        ? Math.max(...imgData.map(({img: {bitmap: {width}}, offsetX}) => width + offsetX))
        : imgData.reduce((res, {img: {bitmap: {width}}, offsetX}, index) => res + width + offsetX + (index * offset), 0);

      const totalHeight = direction
        ? imgData.reduce((res, {img: {bitmap: {height}}, offsetY}, index) => res + height + offsetY + (index * offset), 0)
        : Math.max(...imgData.map(({img: {bitmap: {height}}, offsetY}) => height + offsetY));

      const baseImage = new Jimp(totalWidth, totalHeight, color);

      // Fallback for `Array#entries()`
      const imgDataEntries = imgData.map((data, index) => [index, data]);

      for (const [index, {img, prevX, prevY, offsetX, offsetY}] of imgDataEntries) {
        const {bitmap: {width, height}} = img;
        const [px, py] = direction
          ? [alignImage(totalWidth, width) + offsetX, prevY + (index * offset)]
          : [prevX + (index * offset), alignImage(totalHeight, height) + offsetY];

        baseImage.composite(img, px, py);
      }

      return baseImage;
    });
}
