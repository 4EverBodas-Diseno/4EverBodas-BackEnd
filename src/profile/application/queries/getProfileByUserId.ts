import { ProfileService } from "../../domain/services/profileService";

export class GetProfileByUserIdQuery {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    async execute(userId: string) {
        return this.profileService.getProfileByUserId(userId);
    }
}