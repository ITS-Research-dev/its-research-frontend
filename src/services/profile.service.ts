import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";
import { ProfileResponse, ProfileSummary } from "@/types/profile";
import { formatIntoProfileSummary } from "@/utils/profileMapper";

class ProfileService {
    async getProfile(): Promise<ProfileSummary> {
        const response = await api.get<ProfileResponse[]>(ROUTES.API.STUDENT.PROFILE)
        return formatIntoProfileSummary(response.data)
    }
}

export default new ProfileService();