import * as express from 'express';
import * as multer from 'multer';
import messageBroker from 'src/services/producer.service';
import Photo from '../models/photo.model';

class PhotoController {
  async getAllPhoto(_: express.Request, res: express.Response): Promise<void> {
    const allPhotos = await Photo.find();

    res.status(200).json(allPhotos);
  }

  async getPhoto(req: express.Request, res: express.Response): Promise<void> {
    const getPhoto = await Photo.findOne(req.params.id);

    res.status(200).json(getPhoto);
  }

  // async uploadPhoto(
  //   req: express.Request,
  //   res: express.Response
  // ): Promise<void> {
  //   const { id }: any = req.params;
  //   const { originalname, filename, path } = req.file;

  //   try {
  //     const photo = await new Photo();

  //     photo.name = originalname;
  //     photo.convertedName = filename;
  //     photo.clientName = originalname;
  //     photo.filePath = path;
  //     photo.user = id;

  //     await messageBroker.messageProduce(photo);

  //     res.status(201).send('User upload new photo to convert');
  //   } catch (err) {
  //     res.status(403).send(err);
  //   }
  // }

  async updatePhoto(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const updatePhoto: any = await Photo.findOne(req.params.id);
      await Photo.merge(updatePhoto, req.body);
      const result = await Photo.save(updatePhoto);
      res.status(201).json(result);
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async deletePhoto(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    await Photo.delete(req.params.id);

    res.status(204).send('Photo successfully deleted');
  }
}

export default new PhotoController();
