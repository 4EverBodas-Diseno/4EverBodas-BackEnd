import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', register);
router.post('/signin', login);

// Rutas protegidas
router.get('/protected', authenticateJWT, (req, res) => {
    res.send('Esta es una ruta protegida.');
});


export default router;