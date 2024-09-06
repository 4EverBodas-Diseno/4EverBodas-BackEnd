import { Document, model, Schema } from 'mongoose';
import { IUser } from '../../../auth/domain/models/User';

export interface IProfile extends Document, IUser {
    firstName: string;
    lastName: string;
    email: string;
}

const profileSchema = new Schema<IProfile>({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

export const Profile = model<IProfile>('Profile', profileSchema);