import { User, IUser } from '../../domain/models/User';

export class UserRepository {
    async create(user: IUser): Promise<IUser> {
        return User.create(user);
    }
    async findByUsername(username: string): Promise<IUser | null> {
        return User.findOne({ username });
    }
    async findById(id: string): Promise<IUser | null> {
        return User.findById(id);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async findByResetPasswordToken(token: string): Promise<IUser | null> {
        return User.findOne({ resetPasswordToken: token });
    }
}