import {resolve} from 'path';
import Jimp from 'jimp';
import mergeImg from '../src';

const fixturePath = resolve(__dirname, 'fixtures');

test('`mergeImg()` returns `Promise` that contains `Jimp` object', async () => {
  const image = await mergeImg([`${fixturePath}/example.png`, `${fixturePath}/example.png`]);
  expect(image instanceof Jimp).toBeTruthy();
});
