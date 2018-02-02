import isPlainObj from 'is-plain-obj';
import alignImage from './utils/alignImage';
import calcMargin from './utils/calcMargin';
import {jimpComposer} from './composers';

export default function mergeImg(images, {
  direction = false,
  align = 'start',
  offset = 0,
  margin,
  composer = jimpComposer(),
} = {}) {
  if (!Array.isArray(images)) {
    throw new TypeError('`images` must be an array that contains images');
  }

  if (images.length < 1) {
    throw new Error('At least `images` must contain more than one image');
  }

  const processImage = (input) => {
    if (isPlainObj(input)) {
      const {source, offsetX, offsetY} = input;
      return composer.resolveImage({source})
        .then((imageObj) => ({
          ...imageObj,
          offsetX,
          offsetY,
        }));
    }

    return composer.resolveImage({source: input});
  };

  return Promise.all(images.map(processImage))
    .then((imgs) => {
      let totalX = 0;
      let totalY = 0;

      const imageData = imgs.reduce((res, {image, width, height, offsetX = 0, offsetY = 0}) => {
        res.push({
          image,
          width,
          height,
          x: totalX + offsetX,
          y: totalY + offsetY,
          offsetX,
          offsetY,
        });

        totalX += width + offsetX;
        totalY += height + offsetY;

        return res;
      }, []);

      // Calculate margins
      const {top, right, bottom, left} = calcMargin(margin);
      const marginTopBottom = top + bottom;
      const marginRightLeft = right + left;

      const totalWidth = direction
        ? Math.max(...imageData.map(({width, offsetX}) => width + offsetX))
        : imageData.reduce((res, {width, offsetX}, index) => res + width + offsetX + (Number(index > 0) * offset), 0);

      const totalHeight = direction
        ? imageData.reduce((res, {height, offsetY}, index) => res + height + offsetY + (Number(index > 0) * offset), 0)
        : Math.max(...imageData.map(({height, offsetY}) => height + offsetY));

      // Create canvas to draw images
      const canvasImagePromise = composer.createCanvas({
        width: totalWidth + marginRightLeft,
        height: totalHeight + marginTopBottom,
      });

      // Draw images to the canvas
      return canvasImagePromise.then(
        (imageCanvas) =>
          imageData.reduce(
            (res, {image, width, height, x, y, offsetX, offsetY}, index) =>
              res.then(() => {
                const [px, py] = direction
                  ? [alignImage(totalWidth, width, align) + offsetX, y + (index * offset)]
                  : [x + (index * offset), alignImage(totalHeight, height, align) + offsetY];

                return composer.drawImage({
                  canvas: imageCanvas,
                  image,
                  width,
                  height,
                  x: px + left,
                  y: py + top,
                  offsetX,
                  offsetY,
                  index,
                });
              }),
            Promise.resolve(),
          ).then(() => imageCanvas),
      );
    });
}
