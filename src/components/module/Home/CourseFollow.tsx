import { coursesService } from "@/api/courseService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import type { TCourse } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "@tanstack/react-router";

export const CourseFollow = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: coursesService,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Khóa học nổi bật
        </h2>
        <div className="flex -ml-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pl-4">
              <Card className="overflow-hidden border rounded-lg">
                <Skeleton className="h-48 w-full bg-gray-200" />
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4 bg-gray-200" />
                </CardHeader>
                <CardFooter className="flex justify-between p-4">
                  <Skeleton className="h-6 w-1/4 bg-gray-200" />
                  <Skeleton className="h-8 w-1/3 bg-gray-200" />
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <Alert
          variant="destructive"
          className="max-w-lg mx-auto bg-red-100 border-red-400 text-red-700 p-4 rounded-md"
        >
          <AlertTriangle className="h-4 w-4 inline-block mr-2" />
          <AlertTitle className="font-bold">Đã xảy ra lỗi</AlertTitle>
          <AlertDescription>
            Không thể tải danh sách khóa học. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const onCardClick = (courseId: string) => {
    navigate({ to: "/course/$courseId", params: { courseId } });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Khóa học nổi bật
      </h2>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 4000 })]}
        className="w-full"
      >
        <CarouselContent>
          {data?.map((course: TCourse) => (
            <CarouselItem
              key={course.id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-1">
                <Card
                  onClick={() => onCardClick(course.id)}
                  className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer border"
                >
                  <img
                    src={course.thumbnailUrl}
                    alt={`Thumbnail for ${course.name}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(course.name)}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                  <CardHeader className="flex-grow p-4">
                    <CardTitle className="text-lg font-semibold leading-tight h-12 line-clamp-2">
                      {course.name}
                    </CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 mt-auto">
                    <Badge
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        course.skillLevel === "Beginner"
                          ? "bg-blue-100 text-blue-800"
                          : course.skillLevel === "Intermediate"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.skillLevel}
                    </Badge>
                    <span className="text-xl font-bold text-gray-800">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(course.price)}
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
