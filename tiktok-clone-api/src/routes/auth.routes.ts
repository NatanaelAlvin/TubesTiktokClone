import { Router } from 'express';
import { register, login,deleteUser } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/:id', authenticateJWT, deleteUser);


export default router;
