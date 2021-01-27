import * as express from 'express';
import User from '../models/user.model';

class UserController {
  async getAllUsers(req, res) {
    const allUsers = await User.find();

    res.send(allUsers);
  }

  async getUser(req, res) {
    const getUser = await User.findOne(req.params.id);

    res.send(getUser);
  }

  async createUser(req, res) {
    const { fullName, login, password } = req.body;

    try {
      const newUser = await new User();

      newUser.fullName = fullName;
      newUser.login = login;
      newUser.password = password;

      const savedUsers = await newUser.save();
      res.send(`Saved a new user ${newUser.fullName}!`);
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(req, res) {
    try {
      const updateUser = await User.findOne(req.params.id);
      await User.merge(updateUser, req.body);
      const result = await User.save(updateUser);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }

  async deleteUser(req, res) {
    const deletedUser = await User.delete(req.params.id);

    res.send('User successfully deleted');
  }
}

export default new UserController();
