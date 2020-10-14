import { Router } from 'express';
import multer from 'multer';

import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from './config/upload';

const router = Router();
const upload = multer(uploadConfig);

router.post('/orphanages', upload.array('images'), OrphanagesController.create);
router.get('/orphanages',OrphanagesController.index);
router.get('/orphanages/:id', OrphanagesController.show);

export default router;