import api from "@/lib/api";

import { ROUTES } from "@/constants/routes";
import { MaterialDetail, MaterialItem } from "@/types/materials";

class MaterialService {
    async getMateri(): Promise<MaterialItem[]> {
        const response  = await api.get<MaterialItem[]>(ROUTES.API.STUDENT.MATERI);
        return response.data;
    }

    async getDetailMateri(id: string): Promise<MaterialDetail> {
        const response = await api.get<MaterialDetail>(`${ROUTES.API.STUDENT.MATERI}/${id}`)
        return response.data
    }
}

export default new MaterialService();