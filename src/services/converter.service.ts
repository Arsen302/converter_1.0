import { Options, diskStorage } from 'multer';
import * as sharp from 'sharp';
import * as express from 'express';
import { resolve } from 'path';
import { randomBytes } from 'crypto';

export const multerConfig = {
  dest: resolve(__dirname, '../../src/uploads'),
  storage: diskStorage({
    destination: (req, file, callback): void => {
      callback(null, resolve(__dirname, '../../src/uploads'));
    },
    filename: (req, file, callback): void => {
      randomBytes(16, (error, hash): void => {
        if (error) {
          callback(error, file.filename);
        } else if (file.mimetype === 'image/jpeg') {
          const filename: string = `${hash.toString('hex')}.jpg`;
          callback(null, filename);
        } else if (file.mimetype === 'image/png') {
          const filename: string = `${hash.toString('hex')}.png`;
          callback(null, filename);
        }
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, callback) => {
    const formats = ['image/jpeg', 'image/jpg', 'image/png'];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Format not accepted'));
    }
  },
} as Options;

class Converter {
  // https://sharp.pixelplumbing.com/api-output
  // https://www.npmjs.com/package/sharp нужен класс конвертер,
  // у которого будут методы для работы с разными форматами
  // https://medium.com/better-programming/sharp-high-performance-node-js-image-processing-library-3f04df66c722
  // https://www.youtube.com/watch?v=1oVme5nIEpY

  // if (req.file === '.jpg' || req.file === '.jpeg') {
  // await sharp(photo).png({ quality: 100 });
  // } else if (req.file === '.png') {
  //   await sharp().jpeg({ quality: 100 });
  // } else {
  //   return req.file
  // }

  async convertJpgToPng(req: express.Request, res: express.Response) {
    const data = sharp().png();
  }

  async convertPngToJpg(req: express.Request, res: express.Response) {
    const data = sharp().jpeg();
  }

  async convertSvgToPng(req: express.Request, res: express.Response) {
    const data = sharp().png();
  }

  async convertPngToSvg(req: express.Request, res: express.Response) {
    const data = sharp().toBuffer(); // как в svg поменять???
  }
}
