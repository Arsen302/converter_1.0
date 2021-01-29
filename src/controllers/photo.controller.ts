import * as express from 'express';
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

  async sendPhoto(req: express.Request, res: express.Response): Promise<void> {
    const { convertedName, clientName, url, user } = req.body;

    try {
      const photo = await new Photo();

      photo.convertedName = convertedName;
      photo.clientName = clientName;
      photo.url = url;
      photo.user = user;

      await photo.save();
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
