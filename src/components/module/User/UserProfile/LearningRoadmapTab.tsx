// components/UserProfile/LearningRoadmapTab.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { BookMarked } from "lucide-react";

// Dữ liệu mẫu, sau này sẽ lấy từ API
const userRoadmaps = [
  {
    id: 1,
    title: "Lộ trình Frontend Master",
    progress: 75,
    description:
      "Trở thành một chuyên gia Frontend với React, Next.js và Tailwind CSS.",
  },
  {
    id: 2,
    title: "Lộ trình Backend với Node.js",
    progress: 30,
    description:
      "Xây dựng API mạnh mẽ và hiệu quả với Node.js, Express và PostgreSQL.",
  },
  {
    id: 3,
    title: "Lộ trình DevOps Cơ bản",
    progress: 0,
    description: "Tìm hiểu về Docker, CI/CD và triển khai ứng dụng.",
  },
];

export const LearningRoadmapTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lộ trình học của bạn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {userRoadmaps.map((roadmap) => (
          <div key={roadmap.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg flex items-center">
                <BookMarked className="w-5 h-5 mr-2 text-blue-500" />
                {roadmap.title}
              </h3>
              <span className="text-sm font-medium text-gray-500">
                {roadmap.progress}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {roadmap.description}
            </p>
            <Progress value={roadmap.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
