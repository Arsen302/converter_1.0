import * as express from 'express';
import * as multer from 'multer';
import Photo from '../models/photo.model';
import messageBroker from 'src/services/rabbitmq.service';

class PhotoController {
  async getAllPhoto(_: express.Request, res: express.Response): Promise<void> {
    const allPhotos = await Photo.find();

    res.status(200).json(allPhotos);
  }

  async getPhoto(req: express.Request, res: express.Response): Promise<void> {
    const getPhoto = await Photo.findOne(req.params.id);

    res.status(200).json(getPhoto);
  }
  async uploadPhoto(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { name, convertedName, clientName, url, user } = req.body;

    try {
      const photo = await new Photo();

      photo.name = name;
      photo.convertedName = convertedName;
      photo.clientName = clientName;
      photo.url = url;
      photo.user = user;

      await photo.save();

      // messageBroker.messageProducer(photo);

      res.status(201).send('User upload new photo to convert');
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async updatePhoto(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const updatePhoto = await Photo.findOne(req.params.id);
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

// здесь класс rabbitmq должен отправлять сообщения и файлы на конверт

export default new PhotoController();
function err(
  req: express.Request<
    import('express-serve-static-core').ParamsDictionary,
    any,
    any,
    import('qs').ParsedQs,
    Record<string, any>
  >,
  res: express.Response<any, Record<string, any>>,
  err: any
) {
  throw new Error('Function not implemented.');
}
