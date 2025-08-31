import { coursesByIdService } from "@/api/courseService";
import { lessonsInModuleService, type TLesson } from "@/api/lessonService";
import { modulesOfCourseService } from "@/api/moduleService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileText, MessageSquare, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

type LessonDetailProps = {
  courseId: string;
  moduleId: string;
};

export const LessonDetail = ({ courseId, moduleId }: LessonDetailProps) => {
  const { data: course } = useQuery({
    queryKey: ["courseDetail", courseId],
    queryFn: () => coursesByIdService(courseId),
  });
  const { data: modules } = useQuery({
    queryKey: ["courseModulesDetail", courseId],
    queryFn: () => modulesOfCourseService(courseId),
  });
  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessonsInModule", moduleId],
    queryFn: () => lessonsInModuleService(moduleId),
  });
  const [activeLesson, setActiveLesson] = useState<TLesson>();
  // Khi có dữ liệu bài học, tự động chọn bài đầu tiên
  useEffect(() => {
    if (lessons && lessons.length > 0 && !activeLesson) {
      setActiveLesson(
        lessons.sort((a, b) => a.displayOrder - b.displayOrder)[0]
      );
    }
  }, [lessons, activeLesson]);
  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Đang tải bài học...
      </div>
    );

  interface FormatDuration {
    (seconds: number): string;
  }

  const formatDuration: FormatDuration = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <Button className="flex items-center gap-2 text-sm font-semibold hover:underline p-0">
            <ArrowLeft size={16} />
            {course?.name}
          </Button>
        </div>
        <ScrollArea>
          <Accordion
            type="single"
            collapsible
            defaultValue={moduleId}
            className="p-2"
          >
            {modules?.map((module) => (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger className="text-sm font-bold p-2 hover:no-underline hover:bg-slate-100 rounded-md">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {lessons
                      ?.filter((l) => l.moduleId === module.id) // dùng lessons từ API
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((lesson) => (
                        <li
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`flex items-start p-2 rounded-md cursor-pointer ${activeLesson?.id === lesson.id ? "bg-blue-100" : "hover:bg-slate-50"}`}
                        >
                          <PlayCircle
                            className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${activeLesson?.id === lesson.id ? "text-blue-600" : "text-gray-400"}`}
                          />
                          <div>
                            <h3 className="text-sm font-medium">
                              {lesson.title}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDuration(lesson.duration)}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <h1 className="text-xl font-bold">{activeLesson?.title}</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-black aspect-video rounded-lg overflow-hidden shadow-2xl">
            {activeLesson?.videoUrl && (
              <iframe
                className="w-full h-full"
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <Tabs defaultValue="content" className="mt-6">
            <TabsList>
              <TabsTrigger value="content">
                <FileText className="w-4 h-4 mr-2" />
                Nội dung
              </TabsTrigger>
              <TabsTrigger value="qna">
                <MessageSquare className="w-4 h-4 mr-2" />
                Hỏi đáp
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <Card className="mt-4">
                <CardContent className="p-6">
                  <p>{activeLesson?.content}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="qna">
              <Card className="mt-4">
                <CardContent className="p-6">
                  Phần hỏi đáp sẽ sớm được cập nhật.
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
