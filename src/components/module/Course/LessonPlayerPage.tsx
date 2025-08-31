import { coursesByIdService } from "@/api/courseService";
import { lessonsInModuleService } from "@/api/lessonService";
import { modulesOfCourseService } from "@/api/moduleService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { ModuleLessons } from "./ModuleLessons";
import ReactPlayer from "react-player";

type LessonPlayerPageProps = {
  courseId: string;
  modulesId: string;
  lessonId: string;
};

export const LessonPlayerPage = ({
  courseId,
  modulesId,
  lessonId,
}: LessonPlayerPageProps) => {
  const navigate = useNavigate();
  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => coursesByIdService(courseId),
  });
  const { data: modules, isLoading: isLoadingModules } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => modulesOfCourseService(courseId),
  });
  const { data: lessonsInCurrentModule, isLoading: isLoadingLessons } =
    useQuery({
      queryKey: ["lessons", modulesId],
      queryFn: () => lessonsInModuleService(modulesId),
    });
  console.log("lessonsInCurrentModule", lessonsInCurrentModule);
  const isLoading = isLoadingCourse || isLoadingModules || isLoadingLessons;
  const sortedLessons = useMemo(() => {
    return (
      lessonsInCurrentModule?.sort((a, b) => a.displayOrder - b.displayOrder) ??
      []
    );
  }, [lessonsInCurrentModule]);

  const currentLesson = sortedLessons.find((lesson) => lesson.id === lessonId);
  const currentLessonIndex = sortedLessons.findIndex(
    (lesson) => lesson.id === lessonId
  );
  const prevLesson =
    currentLessonIndex > 0 ? sortedLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < sortedLessons.length - 1
      ? sortedLessons[currentLessonIndex + 1]
      : null;

  const handlePrev = () => {
    if (prevLesson) {
      navigate({
        to: "/course/$courseId/modules/$modulesId/lessons/$lessonId",
        params: { courseId, modulesId: modulesId, lessonId: prevLesson.id },
      });
    }
  };
  const handleNext = () => {
    if (nextLesson) {
      navigate({
        to: "/course/$courseId/modules/$modulesId/lessons/$lessonId",
        params: { courseId, modulesId: modulesId, lessonId: nextLesson.id },
      });
    }
  };
  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <aside className="w-80 border-r p-4 hidden lg:block">
          <Skeleton className="h-full w-full" />
        </aside>
        <main className="flex-1 p-8">
          <Skeleton className="h-full w-full" />
        </main>
      </div>
    );
  }

  if (!currentLesson || !course) {
    return <div>Không tìm thấy bài học hoặc khóa học.</div>;
  }
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-80 border-r bg-white dark:bg-slate-950 dark:border-slate-800 p-4 flex-col hidden lg:flex">
        <Link to="/course/$courseId" params={{ courseId }} className="mb-4">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về trang khóa học
          </Button>
        </Link>
        <h3 className="text-lg font-bold px-2 mb-2 truncate">{course.name}</h3>
        <div className="overflow-y-auto flex-1">
          <Accordion
            type="single"
            collapsible
            defaultValue={modulesId}
            className="w-full"
          >
            {modules
              ?.sort((a, b) => a.displayOrder - b.displayOrder)
              .map((module) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger className="font-semibold hover:no-underline px-2 text-left">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-sky-600 flex-shrink-0" />
                      <span>{module.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ModuleLessons
                      moduleId={module.id}
                      courseId={courseId}
                      currentLessonId={lessonId}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-50">
            {currentLesson.title}
          </h1>
          <div className="aspect-video mb-6 border border-amber-200  rounded-lg overflow-hidden shadow-lg">
            {/* <p> {currentLesson.videoUrl}</p>
            <p> {currentLesson.title}</p> */}
            {/* <iframe
              className="w-full h-full"
              src={currentLesson.videoUrl} // Giả sử đây là link embed (VD: của Youtube, Vimeo)
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
            <ReactPlayer
              src={currentLesson.videoUrl}
              width="100%"
              height="100%"
              playing={true}
              controls={false}
            />
          </div>

          <Card>
            <CardContent className="p-6 border border-blue-500 ">
              <div className="prose dark:prose-invert max-w-none">
                {/* Sử dụng dangerouslySetInnerHTML nếu content là HTML, nếu không thì chỉ cần <p> */}
                <p>{currentLesson.content}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev} disabled={!prevLesson}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Bài trước
            </Button>
            <Button onClick={handleNext} disabled={!nextLesson}>
              Bài tiếp theo
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
