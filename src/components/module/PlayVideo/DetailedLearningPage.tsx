import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactPlayer from "react-player";
import { PracticeEditor } from "./PracticeEditor";
import { QandASection } from "./QandASection";
import { detailedLessonData } from "@/mocks/data-learning";

export const DetailedLearningPage = () => {
  const [lesson] = useState(detailedLessonData);

  return (
    // Giả sử layout này nằm trong layout lớn có sidebar trái
    <div className="flex space-x-8 p-6 bg-muted/20">
      <div className="aspect-video w-2/3 max-w-2/3 bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          src={lesson.videoUrl}
          width="100%"
          height="100%"
          controls
        />
      </div>
      <div className="flex-1">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="practice">Thực hành</TabsTrigger>
            <TabsTrigger value="qanda">
              Hỏi đáp ({lesson.qanda.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="description"
            className=" prose dark:prose-invert max-w-none space-y-4"
          >
            <h2 className="font-semibold">{lesson.title}</h2>
            <p>{lesson.description}</p>
          </TabsContent>

          <TabsContent value="practice" className="">
            <PracticeEditor
              initialCode={lesson.practice.initialCode}
              language={lesson.practice.language}
            />
          </TabsContent>

          <TabsContent value="qanda" className="">
            <QandASection comments={lesson.qanda} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
