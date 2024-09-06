import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/userRepository';
import { IUser, User } from '../models/User';


export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async requestPasswordReset(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://${process.env.FRONTEND_URL}/reset/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findByResetPasswordToken(token);
        if (!user || (user.resetPasswordExpires && user.resetPasswordExpires.getTime() < Date.now())) {
            throw new Error('Password reset token is invalid or has expired');
        }

        user.password = await bcrypt.hash(newPassword, 12);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
    }

    async register(username: string, password: string, email: string, firstName: string, lastName: string): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, password: hashedPassword, email, firstName, lastName });
        return this.userRepository.create(user);
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return jwt.sign({ username: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
        }
        return null;
    }

    async getById(id: string): Promise<IUser | null> {
        return this.userRepository.findById(id);
    }
}