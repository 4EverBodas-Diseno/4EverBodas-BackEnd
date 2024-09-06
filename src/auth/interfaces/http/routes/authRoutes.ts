import { Router } from 'express';
import AuthController from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/signup', authController.register.bind(authController));

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Inicia sesión con un usuario existente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/signin', authController.login.bind(authController));

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Ruta protegida
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       401:
 *         description: Acceso denegado
 */
router.get('/protected', authenticateJWT, (req, res) => {
    res.send('Esta es una ruta protegida.');
});

router.get('/:id', authenticateJWT, authController.getById.bind(authController));
router.post('/request-password-reset', authController.requestPasswordReset.bind(authController));
router.post('/confirm-reset-password', authController.resetPassword.bind(authController));

export default router;