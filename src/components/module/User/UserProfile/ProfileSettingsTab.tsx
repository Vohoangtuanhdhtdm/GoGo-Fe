import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ProfileSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Shadcn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="UI" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="shadcn@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" defaultValue="I'm a frontend developer..." />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};
