import { Router } from 'express';
import { getUserProfile, editUserProfile } from '../controllers/profile.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';



const router = Router();

router.get('/:userId', getUserProfile);
router.put('/edit', authenticateJWT , editUserProfile);

export default router;
