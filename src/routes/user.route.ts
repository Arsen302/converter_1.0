import { Router, Request, Response } from 'express';
import userController from '../controllers/user.controller';
import userValidation from '../validations/user.validation';
import photoValidation from '../validations/photo.validation';
import * as promisify from 'util';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post(
  '/',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await userValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.createUser
);
router.post(
  '/:id/photos',
  async (req: Request, res: Response, next): Promise<void> => {
    try {
      await photoValidation.validateAsync(req.body);
    } catch (err) {
      res.status(403).send("This data isn't valid!");
    }
    next();
  },
  userController.userUploadPhoto
);
router.put(
  '/:id',
  async (req: Request, res: Response, next): Promise<void> => {
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
