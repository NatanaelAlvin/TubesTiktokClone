import { Router } from 'express';
import { likePost, likeComment } from '../controllers/like.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/post', authenticateJWT, likePost);
router.post('/comment', authenticateJWT, likeComment);

export default router;
