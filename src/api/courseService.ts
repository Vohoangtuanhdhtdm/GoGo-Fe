import { api } from "@/axios/axiosConfig";
import type { CreateCourse, TCourse, UpdateCourse } from "@/types/course";

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

export const createCourse = async (
  data: CreateCourse
): Promise<CreateCourse> => {
  const response = await api.post(`/Courses`, data);
  return response.data;
};

export const updateCourse = async (courseId: string, data: UpdateCourse) => {
  const response = await api.put(`/Courses/${courseId}`, data);
  return response.data;
};

export const deleteCourse = async (courseId: string): Promise<TCourse> => {
  const response = await api.delete(`/Courses/${courseId}`);
  return response.data;
};
