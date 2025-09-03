import { coursesByIdService, updateCourse } from "@/api/courseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

type UpdateCourseProps = {
  courseId: string;
};

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

export const UpdateCourse = ({ courseId }: UpdateCourseProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => coursesByIdService(courseId), // Giả sử bạn có hàm fetchCourseById để lấy dữ liệu khóa học
  });
  const form = useForm<CourseUpdateValues>();
  const thumbnailUrl = form.watch("thumbnailUrl");

  const [imageError, setImageError] = useState(false);

  // 3. FIX: Dùng useEffect để điền dữ liệu vào form sau khi useQuery fetch xong
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        thumbnailUrl: data.thumbnailUrl || "",
        price: data.price || 0,
        skillLevel: data.skillLevel || "",
      });
    }
  }, [data, form]);

  const updateCourseMutation = useMutation({
    mutationFn: (updatedData: CourseUpdateValues) =>
      updateCourse(courseId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      console.log("Cập nhật khóa học thành công!");
      navigate({ to: "/admin/course" });
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật khóa học:", error);
    },
  });

  // 5. Hàm onSubmit mới, gọi mutation
  const onUpdateCourse = (data: CourseUpdateValues) => {
    updateCourseMutation.mutate(data);
  };

  // Bạn có thể thêm Skeleton UI cho trạng thái loading ban đầu
  if (isLoading) return <div>Đang tải dữ liệu khóa học...</div>;
  if (isError) return <div>Lỗi khi tải dữ liệu.</div>;
  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card className="shadow-lg">
        <CardHeader>
          {/* 6. Sửa lại tiêu đề cho đúng chức năng */}
          <CardTitle className="text-2xl font-bold">
            Cập nhật khóa học
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onUpdateCourse)}
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
                  disabled={updateCourseMutation.isPending}
                  onClick={() => form.reset(data)}
                >
                  Hoàn tác
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                  disabled={updateCourseMutation.isPending}
                >
                  {updateCourseMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
