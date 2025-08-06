import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileCard } from "./UserProfileCard";
import { ActivityHistoryTab } from "./ActivityHistoryTab";
import { LearningRoadmapTab } from "./LearningRoadmapTab";
import { ProfileSettingsTab } from "./ProfileSettingsTab";

export const UserProfilePage = () => {
  return (
    <div className="mx-auto py-10">
      <div className="flex items-start space-x-4">
        <div className="min-w-2/5 pt-12">
          <UserProfileCard />
        </div>
        <div className="flex-1 min-h-[600px]">
          <Tabs defaultValue="roadmap" className="w-full">
            <TabsList className="mx-auto my-0 grid w-md grid-cols-3 ">
              <TabsTrigger value="roadmap">Lộ trình học</TabsTrigger>
              <TabsTrigger value="activity">Lịch sử</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            <TabsContent value="roadmap">
              <LearningRoadmapTab />
            </TabsContent>

            <TabsContent value="activity" className="max-w-3xl mx-auto">
              <ActivityHistoryTab />
            </TabsContent>

            <TabsContent value="settings">
              <ProfileSettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
