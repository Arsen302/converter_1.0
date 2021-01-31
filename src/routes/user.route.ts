import { Router } from 'express';
import userController from '../controllers/user.controller';
import userValidation from '../validations/user.validation';
import * as promisify from 'util';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post(
  '/',
  async (req, res, next): Promise<void> => {
    try {
      await userValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.createUser
);
router.put(
  '/:id',
  async (req, res, next): Promise<void> => {
    try {
      await userValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.updateUser
);
router.delete('/:id', userController.deleteUser);

export default router;
