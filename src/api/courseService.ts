import { api } from "@/axios/axiosConfig";
import type { TCourse } from "@/types/course";

export const coursesService = async (): Promise<TCourse[]> => {
  const response = await api.get("/Courses");
  return response.data;
};

export const coursesByIdService = async (
  courseId: string
): Promise<TCourse> => {
  const response = await api.get(`/Courses/${courseId}`);
  return response.data;
};
