import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { ActivityContributionGraph } from "./ActivityContributionGraph";
import { Separator } from "@/components/ui/separator";

// Dữ liệu mẫu
const activities = [
  {
    id: 1,
    text: "Đã hoàn thành bài học 'State và Props trong React'.",
    time: "2 giờ trước",
    xp: 10,
  },
  {
    id: 2,
    text: "Đạt 95% trong bài quiz 'JavaScript ES6'.",
    time: "1 ngày trước",
    xp: 45,
  },
  {
    id: 3,
    text: "Nhận được huy hiệu 'Lập trình viên buổi sáng'.",
    time: "2 ngày trước",
    xp: 0,
  },
  {
    id: 4,
    text: "Bắt đầu lộ trình 'Backend với Node.js'.",
    time: "3 ngày trước",
    xp: 0,
  },
];

export const ActivityHistoryTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử hoạt động</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityContributionGraph />

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="bg-slate-100 p-2 rounded-full mr-4">
                  <Bell className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    {activity.text}
                    {activity.xp > 0 && (
                      <span className="font-bold text-green-500">
                        {" "}
                        +{activity.xp} XP
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
