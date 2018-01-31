import Jimp, {read} from 'jimp';

export default function jimpComposer({
  color = 0x00000000,
} = {}) {
  return {
    createCanvas({width, height}) {
      return Promise.resolve(new Jimp(width, height, color));
    },
    resolveImage({source}) {
      return read(source)
        .then((jimpImage) => {
          const {bitmap: {width, height}} = jimpImage;
          return {
            image: jimpImage,
            width,
            height,
          };
        });
    },
    drawImage({canvas, image, x, y}) {
      canvas.composite(image, x, y);
      return Promise.resolve();
    },
  };
}
