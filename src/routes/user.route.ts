import { Router } from 'express';
import userController from '../controllers/user.controller';
import userValidation from '../validations/user.validation';
import * as promisify from 'util';

const router = Router();

router.get('/users/', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.post(
  '/users',
  async (req, res, next) => {
    try {
      await userValidation.validateAsync(req.body);
    } catch (err) {
      res.send("This data isn't valid!");
    }
    next();
  },
  userController.createUser
);
router.put(
  '/users/:id',
  async (req, res, next) => {
    try {
      await userValidation.validateAsync(req.body);
    } catch (err) {
      res.send("This data isn't valid!");
    }
    next();
  },
  userController.updateUser
);
router.delete('/users/:id', userController.deleteUser);

export default router;
