import { ProfileService } from "../../domain/services/profileService";

export class CreateProfileCommand {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    async execute(firstName: string, lastName: string, email: string) {
        return this.profileService.createProfile(firstName, lastName, email);
    }
}