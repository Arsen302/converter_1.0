import * as express from 'express';
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
    const { fullName, login, password } = req.body;

    try {
      const newUser = await new User();

      newUser.fullName = fullName;
      newUser.login = login;
      newUser.password = password;

      await newUser.save();
      res.status(201).send(`Saved a new user ${newUser.fullName}!`);
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
