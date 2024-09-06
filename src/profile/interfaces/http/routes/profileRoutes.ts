import { Router } from 'express';
import { addProfile } from '../controllers/profileControllers';
import { authenticateJWT } from '../../../../auth/interfaces/http/middleware/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, addProfile, (req, res) => {
    res.send(401).json({ message: 'Unauthorized' });
});

export default router;