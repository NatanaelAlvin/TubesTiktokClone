import { Router } from 'express';
import { searchUsers, searchPosts } from '../controllers/search.controller';

const router = Router();

router.get('/users', searchUsers);
router.get('/posts', searchPosts);

export default router;
