import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { createLessonService } from "@/api/lessonService";
import type { Lesson } from "@/types/lesson";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const lessonFormSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự."),
  videoUrl: z.string().url("Phải là một đường dẫn URL hợp lệ."),
  description: z.string().optional(),
  content: z.string().optional(),
  duration: z.coerce.number().min(0, "Thời lượng không thể âm."),
  displayOrder: z.coerce.number().min(0, "Thứ tự không thể âm."),
});

type LessonFormValues = z.infer<typeof lessonFormSchema>;

interface CreateLessonModalProps {
  moduleId: string;
}

export function CreateLessonModal({ moduleId }: CreateLessonModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema) as any,
    defaultValues: {
      title: "",
      videoUrl: "",
      description: "",
      content: "",
      duration: 0,
      displayOrder: 0,
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: (lessonData: Lesson) =>
      createLessonService(moduleId, lessonData),
    onSuccess: () => {
      console.log("Thêm bài học mới thành công!");
      queryClient.invalidateQueries({ queryKey: ["lessons", moduleId] });
      setIsOpen(false);
      form.reset();
    },
    onError: (error) => console.log("Thêm bài học thất bại: " + error.message),
  });

  function onSubmit(data: LessonFormValues) {
    const lessonData: Lesson = {
      ...data,
    };
    createLessonMutation.mutate(lessonData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm bài học
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo Bài Học Mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="videoUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="duration"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời lượng (phút)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="displayOrder"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thứ tự</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createLessonMutation.isPending}>
                {createLessonMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Lưu bài học
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
