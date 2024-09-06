import { Router } from 'express';
import { addProfile, getProfileByUserId } from '../controllers/profileControllers';
import { authenticateJWT } from '../../../../auth/interfaces/http/middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /profile:
 *  post:
 *     summary: Add a profile information
 *     tags: [Profile]
 *     requestBody:
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
router.post('/', authenticateJWT, addProfile);


/**
 * @swagger
 * /profile/{userId}:
 *    get:
 *     summary: Get a profile information by userId
 *     tags: [Profile]
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: userId
 *     schema:
 *        type: string
 *        format: uuid
 *     responses:
 *       200:
 *        description: Profile retrieved successfully
 *       401:
 *        description: Unauthorized
 *       404:
 *        description: Profile not found
 *       500:
 *        description: Internal Server Error
 * 
*/
router.get('/:userId', authenticateJWT, getProfileByUserId);

export default router;