import { Router } from 'express';
import { authenticateJWT } from '../../../../auth/interfaces/http/middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /event/getAllEvents:
 *   get:
 *     summary: Ruta protegida
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       401:
 *         description: Acceso denegado
 */
router.get('/getAllEvents', authenticateJWT, (req, res) => {
    res.send('getAllEvents');
});

export default router;