import { IProfile, Profile } from "../../domain/models/Profile";

export class ProfileRepository {
    async create(profile: IProfile): Promise<IProfile> {
        return Profile.create(profile);
    }

    async findByUserId(userId: string): Promise<IProfile | null> {
        return Profile.findOne({ userId: userId });
    }
}