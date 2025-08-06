import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Zap, Flame } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn utility từ Shadcn

// --- Dữ liệu mẫu (trong ứng dụng thực, bạn sẽ fetch từ API) ---
const weeklyData = [
  {
    rank: 1,
    name: "Lan Anh",
    avatar: "https://github.com/shadcn.png",
    level: 12,
    xp: 1250,
    streak: 7,
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: "Bạn",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    level: 10,
    xp: 1100,
    streak: 7,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Thanh Tung",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    level: 11,
    xp: 1050,
    streak: 6,
    isCurrentUser: false,
  },
  {
    rank: 4,
    name: "Minh Duc",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    level: 9,
    xp: 980,
    streak: 5,
    isCurrentUser: false,
  },
  {
    rank: 5,
    name: "Hoai Nam",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
    level: 9,
    xp: 950,
    streak: 7,
    isCurrentUser: false,
  },
];

// const monthlyData = [
//   /* ... Dữ liệu tương tự cho tháng ... */
// ];
// const allTimeData = [
//   /* ... Dữ liệu tương tự cho toàn bộ ... */
// ];

// --- Component con cho một hàng trong bảng xếp hạng ---
const LeaderboardRow = ({ user }) => {
  const { rank, name, avatar, level, xp, streak, isCurrentUser } = user;

  const rankColors = {
    1: "text-amber-400", // Gold
    2: "text-slate-400", // Silver
    3: "text-orange-400", // Bronze
  };

  return (
    <div
      className={cn(
        "flex items-center p-3 rounded-lg transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
        isCurrentUser &&
          "bg-blue-100/50 dark:bg-blue-900/20 border-2 border-blue-500"
      )}
    >
      {/* Hạng */}
      <div className="w-12 text-center text-lg font-bold">
        {rank <= 3 ? (
          <Trophy className={cn("inline", rankColors[rank])} />
        ) : (
          rank
        )}
      </div>

      {/* Thông tin người dùng */}
      <div className="flex-grow flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold text-base flex items-center">
            {name} {isCurrentUser && <Badge className="ml-2">Bạn</Badge>}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> Cấp {level}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Zap className="w-4 h-4 text-purple-500" /> {xp.toLocaleString()}{" "}
              XP
            </span>
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="hidden md:flex items-center gap-1 text-red-500 font-bold">
        <Flame className="w-5 h-5" />
        {streak}
      </div>
    </div>
  );
};

// --- Component chính của trang Xếp hạng ---
export const LeaderboardPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Bảng Xếp Hạng Tuần
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Đây là bảng xếp hạng người dùng dựa trên điểm XP và streak trong tuần
          này.
        </p>
      </div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Tuần này</TabsTrigger>
              <TabsTrigger value="monthly">Tháng này</TabsTrigger>
              <TabsTrigger value="alltime">Tất cả</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              <div className="space-y-2 mt-4">
                {weeklyData.map((user) => (
                  <LeaderboardRow key={user.rank} user={user} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              <p className="text-center p-8 text-muted-foreground">
                Bảng xếp hạng tháng sẽ sớm ra mắt!
              </p>
              {/* {monthlyData.map(user => <LeaderboardRow key={user.rank} user={user} />)} */}
            </TabsContent>

            <TabsContent value="alltime">
              <p className="text-center p-8 text-muted-foreground">
                Bảng xếp hạng tổng sẽ sớm ra mắt!
              </p>
              {/* {allTimeData.map(user => <LeaderboardRow key={user.rank} user={user} />)} */}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};
