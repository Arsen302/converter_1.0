import * as express from 'express';
import Photo from '../models/photo.model';

class PhotoController {
  async getAllPhoto(req, res) {
    const allPhoto = await Photo.find();

    res.send(allPhoto);
  }

  async getPhoto(req, res) {
    const getPhoto = await Photo.findOne(req.params.id);

    res.send(getPhoto);
  }

  async sendPhoto(req, res) {
    const { name, convertedName, clientName, url, user } = req.body;

    try {
      const photo = await new Photo();

      photo.name = name;
      photo.convertedName = convertedName;
      photo.clientName = clientName;
      photo.url = url;
      photo.user = user;

      const savedPhotos = await photo.save();
      res.send('User upload new photo to convert');
    } catch (err) {
      res.send(err);
    }
  }

  async updatePhoto(req, res) {
    try {
      const updatePhoto = await Photo.findOne(req.params.id);
      await Photo.merge(updatePhoto, req.body);
      const result = await Photo.save(updatePhoto);
      res.send(updatePhoto);
    } catch (err) {
      res.send(err);
    }
  }

  async deletePhoto(req, res) {
    const deletedPhoto = await Photo.delete(req.params.id);

    res.send('Photo successfully deleted');
  }
}

export default new PhotoController();
