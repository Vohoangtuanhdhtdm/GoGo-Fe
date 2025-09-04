import { api } from "@/axios/axiosConfig";
import type { CreateModule } from "@/types/module";

export type TModule = {
  id: string;
  title: string;
  description: string;
  displayOrder: number;
};

export const modulesOfCourseService = async (
  courseId: string
): Promise<TModule[]> => {
  const response = await api.get(`/Modules/${courseId}/modules`);
  return response.data;
};

export const createModuleService = async (
  courseId: string,
  moduleData: CreateModule
): Promise<TModule> => {
  const response = await api.post(`/Modules/${courseId}/modules`, moduleData);
  return response.data;
};

export const deleteModuleService = async (moduleId: string) => {
  const response = await api.delete(`/Modules/${moduleId}`);
  return response.data;
};
