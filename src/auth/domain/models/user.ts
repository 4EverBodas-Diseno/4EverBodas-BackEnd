import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});

export const User = model<IUser>('User', userSchema);