import e, { Request, Response } from 'express';
import { CreateProfileCommand } from "../../../application/commands/createProfileCommnad"

const createProfileCommand = new CreateProfileCommand();

export async function addProfile(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
        const profile = await createProfileCommand.execute(name, email, password);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};