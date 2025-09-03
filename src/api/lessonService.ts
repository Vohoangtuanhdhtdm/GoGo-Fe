import { api } from "@/axios/axiosConfig";
import type { Lesson } from "@/types/lesson";

export type TLesson = {
  id: string;
  title: string;
  description: string;
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

export const createLessonService = async (
  moduleId: string,
  lessonData: Lesson
): Promise<TLesson> => {
  const response = await api.post(`Lesson/${moduleId}/Lesson`, lessonData);
  return response.data;
};
