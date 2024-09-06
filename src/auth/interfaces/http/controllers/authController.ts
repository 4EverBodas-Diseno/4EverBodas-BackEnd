import e, { Request, Response } from 'express';
import { RegisterUserCommand } from '../../../application/commands/registerUserCommand';
import { LoginUserCommand } from '../../../application/commands/loginUserCommand';
import { GetByIdQuery } from '../../../application/queries/getByIdQuery';

const registerUserCommand = new RegisterUserCommand();
const loginUserCommand = new LoginUserCommand();
const getByIdQuery = new GetByIdQuery();

export async function register(req: Request, res: Response) {
    // This should be the User entity
    const { username, password, email, firstName, lastName } = req.body;
    try {
        const user = await registerUserCommand.execute(username, password, email, firstName, lastName);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        const token = await loginUserCommand.execute(username, password);
        if (token) {
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export async function getById(req: Request, res: Response) {
    const { id } = req.params
    try {
        const user = await getByIdQuery.execute(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400)
    }
};