import { User, IUser } from '../../domain/models/user';

export class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    async create(user: IUser): Promise<IUser> {
        return User.create(user);
    }
}