import { Router } from 'express';
import { createComment, getPostComments } from '../controllers/comment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createComment);
router.get('/post/:postId', getPostComments);

export default router;
