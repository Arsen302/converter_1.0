import * as express from 'express';
import * as sharp from 'sharp';
import messageBroker from '../services/rabbitmq.service';
import Photo from '../models/photo.model';
import User from '../models/user.model';

class UserController {
  async getAllUsers(_: express.Request, res: express.Response): Promise<void> {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  }

  async getUser(req: express.Request, res: express.Response): Promise<void> {
    const getUser = await User.findOne(req.params.id);

    res.status(200).json(getUser);
  }

  async createUser(req: express.Request, res: express.Response): Promise<void> {
    const { full_name, login, password } = req.body;

    try {
      const newUser = await new User();

      newUser.fullName = full_name;
      newUser.login = login;
      newUser.password = password;

      await newUser.save();
      res.status(201).send(`Saved a new user ${newUser.fullName}!`);
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async userUploadPhoto(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    // const { name, converted_name, client_name, url, user } = req.body;
    const { originalname, filename, path } = req.file;

    // try {
    //   const photo = await new Photo();

    //   photo.name = name;
    //   photo.convertedName = converted_name;
    //   photo.clientName = client_name;
    //   photo.url = url;
    //   photo.user = user;

    //   await photo.save();

    //   await messageBroker.messageProducer(photo);

    //   res.status(201).send('User upload new photo to convert');
    // } catch (err) {
    //   res.status(403).send(err);
    // }

    try {
      const photo = await new Photo();

      photo.name = originalname;
      photo.convertedName = filename;
      photo.clientName = filename;
      photo.url = path;

      await photo.save();

      await messageBroker.messageProducer(photo);

      res.status(201).send('User upload new photo to convert');
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async updateUser(req: express.Request, res: express.Response): Promise<void> {
    try {
      const updateUser: any = await User.findOne(req.params.id);
      await User.merge(updateUser, req.body);
      const result = await User.save(updateUser);
      res.status(201).json(result);
    } catch (err) {
      res.status(403).send(err);
    }
  }

  async deleteUser(req: express.Request, res: express.Response): Promise<void> {
    await User.delete(req.params.id);

    res.status(204).send('User successfully deleted');
  }
}

export default new UserController();
