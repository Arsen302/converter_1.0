import { Router } from 'express';
import photoController from '../controllers/photo.controller';
import photoValidation from '../validations/photo.validation';

const router = Router();

router.get('/photos/', photoController.getAllPhoto);
router.get('/photos/:id', photoController.getPhoto);
router.post('/photos', photoController.sendPhoto);
router.put('/photos/:id', photoController.updatePhoto);
router.delete('/photos/:id', photoController.deletePhoto);

export default router;
