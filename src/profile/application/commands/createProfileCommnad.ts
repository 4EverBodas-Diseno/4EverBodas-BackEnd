import { ProfileService } from "../../domain/services/profileService";

export class CreateProfileCommand {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    async execute(userId: string, email: string, firstName: string, lastName: string) {
        return this.profileService.createProfile(userId, firstName, lastName, email);
    }
}