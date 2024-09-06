import e, { Request, Response } from 'express';
import { CreateProfileCommand } from "../../../application/commands/createProfileCommnad"

const createProfileCommand = new CreateProfileCommand();

export async function addProfile(req: Request, res: Response) {
    const { userId, email, firstName, LastName } = req.body;
    try {
        const profile = await createProfileCommand.execute(userId, email, firstName, LastName);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};