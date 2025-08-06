import type { Course } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle,
  Star,
  Clock,
  BookOpen,
  Share2,
  Bookmark,
} from "lucide-react";

export const CourseSidebar = ({ course }: { course: Course }) => (
  <div className=" space-y-4">
    <Card className="overflow-hidden">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-auto object-cover"
      />
      <CardContent className="p-6 space-y-4">
        <Button size="lg" className="w-full text-lg">
          <PlayCircle className="mr-2 h-6 w-6" /> Bắt đầu học
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <Bookmark className="mr-2 h-4 w-4" /> Lưu khóa học
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" /> Chia sẻ
          </Button>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>
            <Clock className="inline mr-2 h-4 w-4" />
            Thời lượng
          </span>{" "}
          <strong>{course.duration}</strong>
        </div>
        <div className="flex justify-between">
          <span>
            <BookOpen className="inline mr-2 h-4 w-4" />
            Số bài học
          </span>{" "}
          <strong>{course.lessonCount}</strong>
        </div>
        <div className="flex justify-between">
          <span>
            <Star className="inline mr-2 h-4 w-4" />
            Cấp độ
          </span>{" "}
          <strong>{course.level}</strong>
        </div>
      </CardContent>
    </Card>
    <div className="flex flex-wrap gap-2">
      {course.tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  </div>
);
