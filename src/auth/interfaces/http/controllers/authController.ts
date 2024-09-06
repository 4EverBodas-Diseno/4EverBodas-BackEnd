import { Request, Response } from 'express';
import { RegisterUserCommand } from '../../../application/commands/registerUserCommand';
import { LoginUserCommand } from '../../../application/commands/loginUserCommand';
import { GetByIdQuery } from '../../../application/queries/getByIdQuery';
import { AuthService } from '../../../domain/services/authService';

class AuthController {
    private registerUserCommand: RegisterUserCommand;
    private loginUserCommand: LoginUserCommand;
    private getByIdQuery: GetByIdQuery;
    private authService: AuthService;

    constructor() {
        this.registerUserCommand = new RegisterUserCommand();
        this.loginUserCommand = new LoginUserCommand();
        this.getByIdQuery = new GetByIdQuery();
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
        // This should be the User entity
        const { username, password, email, firstName, lastName } = req.body;
        try {
            const user = await this.registerUserCommand.execute(username, password, email, firstName, lastName);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async requestPasswordReset(req: Request, res: Response) {
        const { email } = req.body;
        try {
            await this.authService.requestPasswordReset(email);
            res.status(200).json({ message: 'Password reset link sent' });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async resetPassword(req: Request, res: Response) {
        const { token, newPassword } = req.body;
        console.log("token", token);
        try {
            await this.authService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const token = await this.loginUserCommand.execute(username, password);
            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const user = await this.getByIdQuery.execute(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400)
        }
    }
}

export default AuthController;