import { AuthService } from '../../domain/services/authService';

export class GetByIdQuery {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async execute(id: string) {
        return this.authService.getById(id);
    }
}
