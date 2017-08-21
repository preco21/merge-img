import {resolve} from 'path';
import Jimp from 'jimp';
import mergeImg from '../src';

const fixturePath = resolve(__dirname, 'fixtures');

describe('`mergeImg()`', () => {
  test('should only accept correct types', async () => {
    await expect(mergeImg([`${fixturePath}/example.png`, `${fixturePath}/example.png`]))
      .resolves
      .toBeDefined();

    await expect(
      mergeImg([
        {
          src: `${fixturePath}/example.png`,
          offsetX: 5,
        },
        {
          src: `${fixturePath}/example.png`,
          offsetX: 10,
        },
      ]),
    )
      .resolves
      .toBeDefined();
  });

  test('should returns `Promise` that contains `Jimp` object', async () => {
    const image = await mergeImg([`${fixturePath}/example.png`, `${fixturePath}/example.png`]);
    expect(image instanceof Jimp).toBeTruthy();
  });

  test('should handle options', async () => {
    const {bitmap: {width, height}} = await mergeImg([
      `${fixturePath}/example.png`,
      `${fixturePath}/example.png`,
    ], {
      direction: true,
      color: 0xffffffff,
      align: 'center',
      offset: 10,
    });

    expect(width).toBe(512);
    expect(height).toBe(1034);
  });

  test('should handle offsets per image individually`', async () => {
    const {bitmap: {width, height}} = await mergeImg([
      {
        src: `${fixturePath}/example.png`,
        offsetY: 20,
      },
      {
        src: `${fixturePath}/example.png`,
        offsetX: 100,
      },
      {
        src: `${fixturePath}/example.png`,
        offsetX: 100,
        offsetY: 150,
      },
    ]);

    expect(width).toBe(1736);
    expect(height).toBe(662);
  });
});
