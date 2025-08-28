import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { coursesByIdService } from "@/api/courseService";
import { modulesOfCourseService } from "@/api/moduleService";

type CourseDetailPageProps = {
  courseId: string;
};

export const CourseDetailPage = ({ courseId }: CourseDetailPageProps) => {
  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => coursesByIdService(courseId),
  });

  const { data: modules, isLoading: isLoadingModules } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => modulesOfCourseService(courseId),
    enabled: !!course,
  });

  if (isLoadingCourse || isLoadingModules) {
    return (
      <div className="container mx-auto py-8 animate-pulse">
        <Skeleton className="h-8 w-48 mb-12 bg-gray-200" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Skeleton className="h-20 w-3/4 bg-gray-200" />
            <Skeleton className="h-40 w-full rounded-lg bg-gray-200" />
            <Skeleton className="h-64 w-full rounded-lg bg-gray-200" />
          </div>
          <div className="md:col-span-1">
            <Skeleton className="h-96 w-full bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gray-800 text-white p-5">
        <img
          src={course?.thumbnailUrl}
          alt={course?.name}
          className="w-full h-full object-cover opacity-30 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 container mx-auto flex flex-col justify-end p-8">
          <Button className="absolute top-8 flex items-center gap-2 text-sm font-semibold hover:underline bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md">
            <ArrowLeft size={16} /> Quay lại
          </Button>
          <h1 className="text-5xl font-bold tracking-tight">{course?.name}</h1>
          <p className="text-lg mt-2 max-w-2xl text-slate-300">
            {course?.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid md:grid-cols-3 gap-x-12">
          {/* Left Column */}
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Bạn sẽ học được gì?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>Xây dựng ứng dụng web động với React.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>Quản lý trạng thái hiệu quả với Hooks.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>Tương tác với API để lấy và hiển thị dữ liệu.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>Tự tin áp dụng React vào các dự án thực tế.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Nội dung khóa học</h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white p-4 rounded-xl border shadow-sm"
            >
              {modules
                ?.sort((a, b) => a.displayOrder - b.displayOrder)
                .map((module) => (
                  <AccordionItem value={module.id} key={module.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-sky-600" />
                        <span className="font-semibold">{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {module.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>

          {/* Right Column */}
          <div className="md:col-span-1 mt-8 md:mt-0">
            <Card className="sticky top-8 shadow-lg">
              <CardHeader>
                <span className="text-4xl font-bold text-primary">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(course?.price || 0)}
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <span>
                    Cấp độ:{" "}
                    <span className="font-semibold">{course?.skillLevel}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>
                    Thời lượng: <span className="font-semibold">8 giờ</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <span>Cấp chứng chỉ sau hoàn thành</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 text-white h-12 text-lg font-bold hover:bg-blue-700">
                  Đăng ký học
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
