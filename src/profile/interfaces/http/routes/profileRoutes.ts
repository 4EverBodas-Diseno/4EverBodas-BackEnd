import { Router } from 'express';
import { addProfile } from '../controllers/profileControllers';
import { authenticateJWT } from '../../../../auth/interfaces/http/middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Add a profile information
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateJWT, addProfile, (req, res) => {
    res.send(401).json({ message: 'Unauthorized' });
});

export default router;