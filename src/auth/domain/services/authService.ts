import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/userRepository';
import { IUser, User } from '../models/User';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(username: string, password: string): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword });
        return this.userRepository.create(user);
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return jwt.sign({ id: user._id }, 'token', { expiresIn: '7d' });
        }
        return null;
    }
}