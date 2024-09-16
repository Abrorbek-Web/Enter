import axios from "./axios-instance";

interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}
export interface Project {
  id: number;
  created: string;
  updated: string;
  status: string;
  short_name: string;
  public_name: string;
  info_status: string;
  creator: number;
  updater: number;
  director: number;
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

export interface Detail {
  id: number;
  created: string;
  updated: string;
  status: string;
  area: string;
  discipline: string;
  material_name: string;
  weight_factor: string;
  total_boq: string;
  unit: string;
  delivery_site: string;
  creator: number;
  updater: number;
  project: number;
  responsible: number;
  report: number;
}

export interface User {
  id: number;
  password: string;
  last_login: string;
  is_superuser: boolean;
  email: string;
  role: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  int_phone: string;
  position: string;
  status: string;
  tg_id: string;
  is_staff: boolean;
  is_active: boolean;
  project: number;
  groups: [];
  user_permissions: [];
}

const ArticleService = {
  async getProject(): Promise<Project[]> {
    const { data } = await axios.get<Project[]>("/project");
    console.log(data);
    return data;
  },

  async getReport(id: number): Promise<Report> {
    const { data } = await axios.get<Report>(`/report/${id}`);
    return data;
  },

  async getReportDetail(id: number): Promise<Detail> {
    const { data } = await axios.get<Detail>(`/bulk_progress/${id}`);
    return data;
  },

  async getProcurementProgress(slug: string): Promise<Article> {
    const { data } = await axios.get<Article>(`/procurement_progress`);
    return data;
  },

  async getProcurementDetail(slug: string): Promise<Article> {
    const { data } = await axios.get<Article>(`/procurement_detail`);
    return data;
  },

  async getBulkProgress(slug: string): Promise<Article> {
    const { data } = await axios.get<Article>(`/bulk_progress`);
    return data;
  },

  async getBulkDetail(slug: string): Promise<Article> {
    const { data } = await axios.get<Article>(`/bulk_detail`);
    return data;
  },

  getAdminDetails: async (): Promise<User[]> => {
    const response = await axios.get("/user");
    return response.data;
  },

  getUserDetailById: async (id: number): Promise<User> => {
    const response = await axios.get(`/user/${id}`);
    return response.data;
  },
};

export default ArticleService;
