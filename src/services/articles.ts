import axiosInstance from "./axios-instance";
import { saveAccessToken, saveRefreshToken } from "./tokenService";

interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}
export interface Report {
  id: number;
  created: string;
  updated: string;
  status: string;
  _type: string;
  main_status: string;
  creator: number;
  updater: number;
  responsible: number;
}
const ArticleService = {
  async getProject(): Promise<Article[]> {
    const { data } = await axiosInstance.get<Article[]>("/project");
    console.log(data);

    return data;
  },

  async getReport(): Promise<Report> {
    saveAccessToken();
    saveRefreshToken();
    const { data } = await axiosInstance.get<Report>(`/report/`);
    return data;
  },
  async getReportDetail(id: number): Promise<Report> {
    saveAccessToken();
    saveRefreshToken();
    const { data } = await axiosInstance.get<Report>(`/report/${id}`);
    return data;
  },

  async getProcurementProgress(slug: string): Promise<Article> {
    const { data } = await axiosInstance.get<Article>(`/procurement_progress`);
    return data;
  },

  async getProcurementDetail(slug: string): Promise<Article> {
    const { data } = await axiosInstance.get<Article>(`/procurement_detail`);
    return data;
  },
  async getBulkProgress(slug: string): Promise<Article> {
    const { data } = await axiosInstance.get<Article>(`/bulk_progress`);
    return data;
  },
  async getBulkDetail(slug: string): Promise<Article> {
    const { data } = await axiosInstance.get<Article>(`/bulk_detail`);
    return data;
  },
};

export default ArticleService;
