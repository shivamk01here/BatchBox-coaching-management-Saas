import { Router } from 'express';
import { manualNotify } from '../src/controllers/notification.controller';

const router = Router();

router.post('/', manualNotify);

export default router;
