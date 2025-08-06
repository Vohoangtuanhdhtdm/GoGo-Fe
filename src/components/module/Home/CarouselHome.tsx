"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const CarouselHome = ({
  items = [
    {
      id: "item-1-learning-path",
      title: "Lộ trình học tập rõ ràng",
      summary:
        "Chúng tôi cung cấp các lộ trình học được thiết kế bài bản từ cơ bản đến nâng cao, giúp bạn định hướng và chinh phục mục tiêu một cách hiệu quả.",
      url: "/lo-trinh-hoc",
      image:
        "https://i.pinimg.com/1200x/78/dd/43/78dd436c8afb613ec4b38eaca34b41ca.jpg",
    },
    {
      id: "item-2-real-projects",
      title: "Học qua dự án thực chiến",
      summary:
        "Áp dụng kiến thức ngay vào các dự án thực tế. Xây dựng portfolio ấn tượng và tích lũy kinh nghiệm làm việc ngay trong quá trình học.",
      url: "/du-an",
      image:
        "https://i.pinimg.com/1200x/84/f1/91/84f19121844e594a7f87aaf1e37b3b8c.jpg",
    },
    {
      id: "item-3-mentor-support",
      title: "Mentor đồng hành 1:1",
      summary:
        "Nhận được sự hướng dẫn, góp ý và sửa lỗi trực tiếp từ các chuyên gia lập trình giàu kinh nghiệm, giúp bạn tiến bộ nhanh hơn.",
      url: "/mentor",
      image:
        "https://i.pinimg.com/1200x/96/7a/3f/967a3f3dab66e88a2d7688ddefda8662.jpg",
    },
    {
      id: "item-4-community",
      title: "Cộng đồng hỗ trợ 24/7",
      summary:
        "Tham gia cộng đồng học viên và mentor năng động, nơi bạn có thể đặt câu hỏi, chia sẻ kiến thức và cùng nhau phát triển.",
      url: "/cong-dong",
      image:
        "https://i.pinimg.com/1200x/af/f1/47/aff147929a27d50a45fd3e63b5696b0c.jpg",
    },
    {
      id: "item-5-updated-content",
      title: "Nội dung luôn cập nhật",
      summary:
        "Thế giới công nghệ luôn thay đổi. Các khóa học của chúng tôi được cập nhật liên tục để đảm bảo bạn luôn tiếp cận những kiến thức mới nhất.",
      url: "/khoa-hoc",
      image:
        "https://i.pinimg.com/1200x/e9/6a/0b/e96a0b8e2f010601f2139fbb9745c401.jpg",
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative"
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id} className=" max-w-[752px]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm">
                    Xem thêm{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* Nút Trái Phải */}
      <div className="container p-4 ">
        <div className="mb-8 flex items-center justify-center ">
          <div className="mt-4 flex shrink-0 items-center justify-start gap-2 ">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CarouselHome };
