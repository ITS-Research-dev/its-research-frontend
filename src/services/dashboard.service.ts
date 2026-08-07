import {
  teacherDashboardSummary,
  topicScores,
  aiEfficiency,
} from "@/data/dashboard";

class DashboardService {
  async getSummary() {
    return Promise.resolve(teacherDashboardSummary);
  }

  async getTopicScores() {
    return Promise.resolve(topicScores);
  }

  async getAIEfficiency() {
    return Promise.resolve(aiEfficiency);
  }
}

export default new DashboardService();
