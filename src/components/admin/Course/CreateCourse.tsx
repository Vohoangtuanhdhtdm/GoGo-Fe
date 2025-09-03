import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createCourse } from "@/api/courseService";

// Định nghĩa schema với z.preprocess cho price
export const CourseCreateSchema = z.object({
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
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    message: "Vui lòng chọn trình độ kỹ năng.",
  }),
});

export type CourseCreateValues = z.infer<typeof CourseCreateSchema>;

export const CreateCourse = () => {
  const form = useForm<CourseCreateValues>({
    resolver: zodResolver(CourseCreateSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      thumbnailUrl: "",
      price: 1,
      skillLevel: "Beginner",
    },
  });

  const thumbnailUrl = form.watch("thumbnailUrl");

  const [imageError, setImageError] = useState(false);

  const onSubmitCreateCourse = async (data: CourseCreateValues) => {
    try {
      const result = await createCourse(data);
      console.log("Khóa học được tạo:", result);
      form.reset();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tạo khóa học mới</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCreateCourse)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                {/* Tên khóa học */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên khóa học</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên khóa học"
                          className="border rounded-md"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mô tả khóa học */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả khóa học</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả chi tiết về khóa học"
                          className="min-h-[100px] border rounded-md"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* URL hình ảnh và Preview */}
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL hình ảnh khóa học</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập URL hình ảnh (ví dụ: https://example.com/image.jpg)"
                          className="border rounded-md"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                      {/* Preview hình ảnh */}
                      {thumbnailUrl && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-muted-foreground">
                            Xem trước hình ảnh:
                          </p>
                          {imageError ? (
                            <Alert variant="destructive" className="mt-2">
                              <AlertDescription>
                                Không thể tải hình ảnh. Vui lòng kiểm tra URL.
                              </AlertDescription>
                            </Alert>
                          ) : (
                            <img
                              src={thumbnailUrl}
                              alt="Preview"
                              className="mt-2 h-48 w-full rounded-md object-cover"
                              onError={() => setImageError(true)}
                              onLoad={() => setImageError(false)}
                            />
                          )}
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                {/* Giá khóa học */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá bán khóa học (VND)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá bán khóa học"
                          className="border rounded-md"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Trình độ kỹ năng */}
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trình độ kỹ năng</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border rounded-md">
                            <SelectValue placeholder="Chọn trình độ kỹ năng" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Sơ cấp</SelectItem>
                          <SelectItem value="Intermediate">
                            Trung cấp
                          </SelectItem>
                          <SelectItem value="Advanced">Cao cấp</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              {/* Nút gửi */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                >
                  Tạo khóa học
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
