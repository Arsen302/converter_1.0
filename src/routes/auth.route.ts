import { Router, Request, Response } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/signin', authController.login);
router.post('/signup', authController.registration);

export default router;
