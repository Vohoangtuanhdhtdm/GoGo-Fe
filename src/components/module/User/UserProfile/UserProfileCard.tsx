import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfileCard = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage
            src="https://i.pinimg.com/736x/76/c8/8c/76c88c7de180333ed87ec46f8f11eb3f.jpg"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>Shadcn</CardTitle>
        <CardDescription>Frontend Developer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <span>shadcn@example.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span>(+84) 123 456 789</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
        </div>
        <Button className="w-full mt-6">Follow</Button>
      </CardContent>
    </Card>
  );
};
