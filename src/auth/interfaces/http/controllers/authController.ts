import e, { Request, Response } from 'express';
import { RegisterUserCommand } from '../../../application/commands/registerUserCommand';
import { LoginUserCommand } from '../../../application/commands/loginUserCommand';

const registerUserCommand = new RegisterUserCommand();
const loginUserCommand = new LoginUserCommand();


export async function register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
        const user = await registerUserCommand.execute(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await loginUserCommand.execute(email, password);
        if (token) {
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};