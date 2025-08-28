import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Course } from "@/types/course";
import { courseData } from "@/mocks/data";
import { CourseDetailSkeleton } from "./CourseDetailSkeleton";
import { CourseCurriculum } from "./CourseCurriculum";
import { CourseSidebar } from "./CourseSidebar";

type CourseDetailPageProps = {
  courseId: string;
};

export const CourseDetailPage = ({ courseId }: CourseDetailPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setCourse({ ...courseData });
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading || !course) {
    return <CourseDetailSkeleton />;
  }

  return (
    <div className="bg-background py-5 px-10">
      <div className="container mx-auto py-10 px-4">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            <header className="space-y-4">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-lg text-muted-foreground">
                {course.shortDescription}
              </p>
            </header>

            <Card>
              <CardHeader>
                <CardTitle>Bạn sẽ học được gì?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {course.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">Nội dung khóa học </h2>
              <CourseCurriculum curriculum={course.curriculum} />
            </div>
          </div>

          <div className="lg:col-span-1 ">
            <CourseSidebar course={course} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Yêu cầu</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-muted-foreground">
              Có kiến thức cơ bản về HTML, CSS và Javascript
            </li>
            <li className="text-sm text-muted-foreground">
              Nắm chắc các tính năng trong Javascript ES6
            </li>
            <li className="text-sm text-muted-foreground">
              Có hiểu biết về lập trình bất đồng bộ trong Javascript
            </li>
            <li className="text-sm text-muted-foreground">
              Sở hữu máy tính kết nối internet HDH Windows, Ubuntu hoặc MacOS
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
