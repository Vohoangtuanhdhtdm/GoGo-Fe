import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "@tanstack/react-router";
import { FileText, Code, BookOpen, PlayCircle } from "lucide-react";

export const CourseCurriculum = ({ curriculum }) => {
  const getIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-5 h-5 text-orange-400" />;
      case "article":
        return <FileText className="w-5 h-5 text-green-500" />;
      case "practice":
        return <Code className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };
  const navaigate = useNavigate();

  return (
    <Accordion type="single" collapsible className="w-full">
      {curriculum.map((module, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-lg font-semibold">
            {module.moduleTitle}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {module.lessons.map((lesson, lessonIndex) => (
                <button
                  type="button"
                  key={lessonIndex}
                  onClick={() => {
                    navaigate({
                      to: `/courses/${2}/${3}`,
                    });
                  }}
                  className="w-full text-left flex justify-between items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    {getIcon(lesson.type)}
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {lesson.duration}
                  </span>
                </button>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
