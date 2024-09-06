import { AuthService } from '../../domain/services/authService';

export class RegisterUserCommand {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async execute(username: string, email: string, password: string) {
        return this.authService.register(username, email, password);
    }
}