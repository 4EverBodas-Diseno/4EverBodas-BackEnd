import { ProfileRepository } from "../../infrastructure/repositories/profileRepository";
import { Profile } from "../models/Profile";

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    async createProfile(userId: string, firstName: string, lastName: string, email: string) {
        const profile = new Profile({ userId, firstName, lastName, email });
        return this.profileRepository.create(profile);
    }
}