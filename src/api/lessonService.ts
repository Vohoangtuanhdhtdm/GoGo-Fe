import { api } from "@/axios/axiosConfig";

export type TLesson = {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
  duration: number;
  displayOrder: number;
  moduleId: string;
};

export const lessonsInModuleService = async (
  moduleId: string
): Promise<TLesson[]> => {
  const response = await api.get(`Lesson/${moduleId}/Lesson`);
  return response.data;
};
