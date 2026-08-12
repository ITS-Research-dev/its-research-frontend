import { ROUTES } from "@/constants/routes";
import api from "@/lib/api";
import { DashboardResponse, DashboardTrendResponse } from "@/types/dashboard";

class DashboardService {
  async getDashboard(classId: string | undefined): Promise<DashboardResponse> {
    const response = await api.get<DashboardResponse>(ROUTES.API.TEACHER.DASHBOARD + "?classId=" +classId);
    return response.data;
  }
  async getTrend(classId: string | undefined): Promise<DashboardTrendResponse> {
    const response = await api.get<DashboardTrendResponse>(ROUTES.API.TEACHER.DASHBOARD_TREND + "?classId=" +classId);
    return response.data;
  }
}

export default new DashboardService();
