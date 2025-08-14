import { CarouselHome } from "@/components/module/Home/CarouselHome";
import { CourseFollow } from "@/components/module/Home/CourseFollow";
import { CourseNew } from "@/components/module/Home/CourseNew";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-3xl border h-60 flex items-center justify-center">
        {/* <CarouselHome /> */}
      </div>

      <div>
        <div className="p-10">
          <CourseNew />
        </div>
        <hr className="my-8 w-full border-t" />
        <div className="p-10">
          <CourseFollow />
        </div>
      </div>
    </div>
  );
}
