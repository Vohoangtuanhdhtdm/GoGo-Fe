import { Skeleton } from "@/components/ui/skeleton";

export const CourseDetailSkeleton = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cột trái */}
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        {/* Cột phải */}
        <div className="lg:col-span-1">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
};
