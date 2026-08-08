import { AssementDetailResponse, AssessmentDetail } from "@/types/asessment";
import {
  ProfileResponse,
  Scoring,
  CompetencySummary,
  ProfileSummary,
  LevelTrend,
  CompetencyTrend,
  RawGraphProfile,
} from "@/types/profile";
import { Console } from "console";

const SCORING_KEYS: (keyof Scoring)[] = [
  "fungsionalitas",
  "logika",
  "syntax",
  "code_style",
  "dokumentasi",
  "konsep",
];

const TEMPLATE : RawGraphProfile = { avg: 0, count: 0 };

function checkWeek(startDate: string): string {
  const date = new Date(startDate);

  // Ambil hari dalam minggu (0 = Minggu, 1 = Senin, ..., 6 = Sabtu) versi UTC
  const day = date.getUTCDay();

  // Hitung selisih hari ke Senin di minggu yang sama
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const format = (d: Date): string => {
    const dd = String(d.getUTCDate()).padStart(2, "0");
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `${dd}-${mm}`;
  };

  return `${format(monday)} - ${format(sunday)}`;
}

function checkMonth(startDate: string): string {
  return startDate.split('-')[1]
}


export function formatIntoProfileSummary(datas: ProfileResponse[]): ProfileSummary {
  let countAverage = 0,
    competencySum = {
      fungsionalitas: 0,
      logika: 0,
      syntax: 0,
      code_style: 0,
      dokumentasi: 0,
      konsep: 0,
    },
    totalCases = 0, totalHints = 0,
    topicName : { [key: string]: number } = {},
    competencyTrend : { [key: string]: { [key: string]:  RawGraphProfile }  } = { };

    datas.map((data) => {
    const topicTitle = data.test.topic.title
    countAverage += data.averageScore;
    totalCases += 1;
    totalHints += data.hintUsage
    topicName[topicTitle] = 0;
    data.aiScore = typeof data.aiScore === 'string' ? JSON.parse(data.aiScore) : data.aiScore;
    SCORING_KEYS.forEach((element) => {
      competencySum[element] += data.aiScore[element];
    });

    const week = checkWeek(data.createdAt);
    const month = checkMonth(data.createdAt)
    if (!competencyTrend[week]) competencyTrend[week] = { total: { ...TEMPLATE} };
    if (!competencyTrend[month]) competencyTrend[month] = { total: { ...TEMPLATE} };
    if (!competencyTrend[week][topicTitle]) competencyTrend[week][topicTitle] = { ...TEMPLATE }
    if (!competencyTrend[month][topicTitle]) competencyTrend[month][topicTitle] = { ...TEMPLATE }
    
    //Week Data
    competencyTrend[week].total.avg += data.averageScore;
    competencyTrend[week].total.count += 1;
    competencyTrend[week][topicTitle].avg += data.averageScore;
    competencyTrend[week][topicTitle].count += 1;
    
    //Month Data
    competencyTrend[month].total.avg += data.averageScore;
    competencyTrend[month].total.count += 1;
    competencyTrend[month][topicTitle].avg += data.averageScore;
    competencyTrend[month][topicTitle].count += 1;
  });

  const nameMaterials = Object.keys(topicName)
  const competencies: CompetencySummary[] = Object.entries(competencySum).map(
    ([name, score]) => ({ name, score })
  );
  return{
    totalHints, nameMaterials, totalCases, competencies, competencyTrend,
    averageScore: countAverage / totalCases,
    totalMaterials: nameMaterials.length,
    levelTrend: competencyTrend,
    raw: datas
  }
}