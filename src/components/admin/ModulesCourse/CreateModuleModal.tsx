// src/components/modals/CreateModuleModal.tsx

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createModuleService } from "@/api/moduleService"; // Giả sử service của bạn
import type { CreateModule } from "@/types/module"; // Giả sử type của bạn

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

// 1. Định nghĩa schema validation bằng Zod
const moduleFormSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự."),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự."),
});

type ModuleFormValues = z.infer<typeof moduleFormSchema>;

type CreateModuleModalProps = {
  courseId: string;
};

export function CreateModuleModal({ courseId }: CreateModuleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createModuleMutation = useMutation({
    mutationFn: (moduleData: CreateModule) =>
      createModuleService(courseId, moduleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules", courseId] });
      setIsOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(data: ModuleFormValues) {
    createModuleMutation.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm Module
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo Module Mới</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết cho module mới của bạn. Nhấn lưu khi hoàn
            tất.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề Module</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ví dụ: Giới thiệu về React"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả ngắn gọn về nội dung của module này..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createModuleMutation.isPending}>
                {createModuleMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Thêm Module
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
