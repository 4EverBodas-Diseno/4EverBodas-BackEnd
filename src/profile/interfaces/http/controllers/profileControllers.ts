import e, { Request, Response } from 'express';
import { CreateProfileCommand } from "../../../application/commands/createProfileCommnad"
import { GetProfileByUserIdQuery } from '../../../application/queries/getProfileByUserId';

const createProfileCommand = new CreateProfileCommand();
const getProfileByUserIdQuery = new GetProfileByUserIdQuery();

export async function addProfile(req: Request, res: Response) {
    const { userId, email, firstName, LastName } = req.body;
    try {
        const profile = await createProfileCommand.execute(userId, email, firstName, LastName);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export async function getProfileByUserId(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
        const profile = await getProfileByUserIdQuery.execute(userId);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}