import * as express from 'express';
import * as multer from 'multer';
import Photo from '../models/photo.model';
import messageBroker from 'src/services/producer.service';

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
  //   const { name, converted_name, client_name, user } = req.body;

  //   try {
  //     const photo = await new Photo();

  //     photo.name = name;
  //     photo.convertedName = converted_name;
  //     photo.clientName = client_name;
  //     photo.file_path = url;
  //     photo.user = user;

  //     await photo.save();

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
