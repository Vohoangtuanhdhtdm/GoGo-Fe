import { api } from "@/axios/axiosConfig";

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
