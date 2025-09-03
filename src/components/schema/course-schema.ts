import z from "zod";

export const CourseUpdateSchema = z.object({
  name: z.string().min(1, {
    message: "Tên khóa học không được để trống.",
  }),
  description: z.string().min(1, {
    message: "Mô tả khóa học không được để trống.",
  }),
  thumbnailUrl: z.string().url({
    message: "URL hình ảnh không hợp lệ.",
  }),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1, {
      message: "Giá khóa học phải lớn hơn hoặc bằng 1.",
    })
  ),
  skillLevel: z.string().min(1, {
    message: "Mô tả khóa học không được để trống.",
  }),
});

export type CourseUpdateValues = z.infer<typeof CourseUpdateSchema>;
