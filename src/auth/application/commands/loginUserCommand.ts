import { AuthService } from '../../domain/services/authService';

export class LoginUserCommand {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async execute(username: string, password: string) {
        return this.authService.login(username, password);
    }
}