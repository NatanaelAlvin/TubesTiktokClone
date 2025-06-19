import { Router } from 'express';
import * as followController from '../controllers/follow.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, followController.followUser);
router.get('/followers/:userId', followController.getFollowers);
router.get('/following/:userId', followController.getFollowing);


export default router;
