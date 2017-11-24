import {resolve} from 'path';
import Jimp, {read} from 'jimp';
import mergeImg from '../src';

const fixturePath = resolve(__dirname, 'fixtures');

describe('`mergeImg()`', () => {
  test('accepts correct path type', async () => {
    await expect(mergeImg([`${fixturePath}/example.png`, `${fixturePath}/example.png`]))
      .resolves
      .toBeDefined();
  }, 10000);

  test('accepts correct object type', async () => {
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
  }, 10000);

  // FIXME: Need to address for upstream issue accepting Jimp object as a argument
  test.skip('accepts correct Jimp type', async () => {
    const jimpImg = await read(`${fixturePath}/example.png`);
    const jimpImg2 = await read(`${fixturePath}/example.png`);

    await expect(mergeImg([jimpImg, jimpImg2]))
      .resolves
      .toBeDefined();
  }, 10000);

  test('returns `Promise` that contains `Jimp` object', async () => {
    const image = await mergeImg([`${fixturePath}/example.png`, `${fixturePath}/example.png`]);
    expect(image instanceof Jimp).toBeTruthy();
  }, 10000);

  test('handles options', async () => {
    const image = await mergeImg([
      `${fixturePath}/example.png`,
      `${fixturePath}/example.png`,
    ], {
      direction: true,
      color: 0xffffffff,
      align: 'center',
      offset: 10,
    });

    expect(image instanceof Jimp).toBeTruthy();
  }, 10000);

  test('handles offsets per image individually`', async () => {
    const {bitmap: {width, height}} = await mergeImg([
      {
        src: `${fixturePath}/example.png`,
        offsetY: 20,
      },
      {
        src: `${fixturePath}/example.png`,
        offsetX: 100,
        offsetY: 150,
      },
    ]);

    expect(width).toBe(1124);
    expect(height).toBe(662);
  }, 10000);
});

describe('`mergeImg()` margin option', () => {
  test('handles the image margin with number option', async () => {
    const {bitmap: {width, height}} = await mergeImg([
      `${fixturePath}/example.png`,
      `${fixturePath}/example.png`,
    ], {
      margin: 40,
    });

    expect(width).toBe(1104);
    expect(height).toBe(592);
  }, 10000);

  test('handles the image margin with string option', async () => {
    const {bitmap: {width, height}} = await mergeImg([
      `${fixturePath}/example.png`,
      `${fixturePath}/example.png`,
    ], {
      margin: '40 40 0 10',
    });

    expect(width).toBe(1074);
    expect(height).toBe(552);
  }, 10000);

  test('handles the image margin with object option', async () => {
    const {bitmap: {width, height}} = await mergeImg([
      `${fixturePath}/example.png`,
      `${fixturePath}/example.png`,
    ], {
      margin: {
        top: 40,
        right: 40,
        bottom: 0,
        left: 10,
      },
    });

    expect(width).toBe(1074);
    expect(height).toBe(552);
  }, 10000);
});
