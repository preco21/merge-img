import imageSize from 'image-size';
import {createCanvas, loadImage, Image} from 'canvas';

const imageSizeP = (...args) =>
  new Promise((resolve, reject) => imageSize(...args, (err, dimensions) => err ? reject(err) : resolve(dimensions)));

export default function canvasComposer({
  color,
} = {}) {
  return {
    createCanvas({width, height}) {
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // Fill background if needed
      if (color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.rect(0, 0, width, height);
        ctx.fill();
        ctx.restore();
      }

      return Promise.resolve(canvas);
    },
    resolveImage({source}) {
      if (Buffer.isBuffer(source)) {
        const image = new Image();
        image.src = source;

        const {width, height} = imageSize(source);

        return Promise.resolve({
          image,
          width,
          height,
        });
      }

      return loadImage(source)
        .then((canvasImage) =>
          imageSizeP(source).then(({width, height}) => ({
            image: canvasImage,
            width,
            height,
          })));
    },
    drawImage({canvas, image, x, y}) {
      const ctx = canvas.getContext('2d');
      console.log(image);
      ctx.drawImage(image, x, y);
      return Promise.resolve();
    },
  };
}
