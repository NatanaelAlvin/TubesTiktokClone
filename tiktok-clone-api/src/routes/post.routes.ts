import { Router } from 'express';
import { createPost, getAllPosts,updatePost,deletePost} from '../controllers/post.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import upload from '../middlewares/upload.middleware';
import { uploadVideoPost } from '../controllers/post.controller';

const router = Router();

router.post('/', authenticateJWT, createPost);
router.get('/', getAllPosts);
router.post('/upload', authenticateJWT, upload.single('video'), uploadVideoPost);
router.put('/:postId', authenticateJWT, updatePost);
router.delete('/:postId', authenticateJWT, deletePost);


export default router;
