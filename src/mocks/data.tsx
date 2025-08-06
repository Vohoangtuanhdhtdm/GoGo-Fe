import type {
  Activity,
  Course,
  LeaderboardUser,
  Roadmap,
  UserProfile,
} from "@/types/course";

export const demoDataCourseNew = {
  heading: "Khóa học Mới & Nổi Bật",
  // Thay thế bằng URL thực tế dẫn đến trang danh sách khóa học của bạn
  demoUrl: "/courses",
  items: [
    {
      id: "course-nextjs-14",
      title: "Next.js 14 & React: Xây dựng ứng dụng web hiện đại",
      summary:
        "Học cách xây dựng các ứng dụng web full-stack, hiệu suất cao với Next.js App Router, Server Components và tích hợp hệ sinh thái React.",
      // URL thực tế của khóa học
      url: "/courses/2",
      // Bạn nên sử dụng ảnh thumbnail riêng cho mỗi khóa học
      image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
    },
    {
      id: "course-js-mastery",
      title: "JavaScript Toàn Tập: Từ Cơ Bản đến Nâng Cao 2025",
      summary:
        "Nắm vững ngôn ngữ nền tảng của web. Khóa học bao gồm ES6+, lập trình bất đồng bộ, DOM, và các dự án thực tế.",
      url: "/courses/javascript-mastery",
      image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    },
    {
      id: "course-nodejs-api",
      title: "Node.js & Express: Xây dựng API cho người mới bắt đầu",
      summary:
        "Tạo ra các RESTful API mạnh mẽ và có khả năng mở rộng bằng Node.js, Express và kết nối với cơ sở dữ liệu MongoDB.",
      url: "/courses/nodejs-express-api",
      image: "https://files.fullstack.edu.vn/f8-prod/courses/6.png",
    },
    {
      id: "course-devops-intro",
      title: "Docker & DevOps Nhập Môn: Tự động hóa và triển khai",
      summary:
        "Tìm hiểu cách container hóa ứng dụng của bạn với Docker, thiết lập quy trình CI/CD cơ bản và hiểu rõ hơn về văn hóa DevOps.",
      url: "/courses/docker-devops-intro",
      image:
        "https://i.pinimg.com/736x/f1/7b/e2/f17be2c9f083a5c869c64f6fd8f943fa.jpg",
    },
    {
      id: "course-dsa-python",
      title: "Giải Thuật và Cấu Trúc Dữ Liệu với Python",
      summary:
        "Nền tảng vững chắc cho mọi lập trình viên. Cải thiện kỹ năng giải quyết vấn đề và chuẩn bị cho các buổi phỏng vấn kỹ thuật.",
      url: "/courses/dsa-with-python",
      image:
        "https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png",
    },
  ],
};

export const demoDataCourseFollow = {
  heading: "Các khóa học đang theo dõi",
  // Thay thế bằng URL thực tế dẫn đến trang quản lý khóa học của người dùng
  demoUrl: "/my-courses",
  items: [
    {
      id: "course-js-mastery",
      title: "JavaScript Toàn Tập: Từ Cơ Bản đến Nâng Cao 2025",
      summary:
        "Bạn đang học về Lập trình bất đồng bộ. Hãy tiếp tục để hoàn thành module!",
      url: "/my-courses/javascript-mastery",
      image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
      progress: 65, // Tiến độ học (ví dụ: 65%)
    },
    {
      id: "course-nodejs-api",
      title: "Node.js & Express: Xây dựng API cho người mới bắt đầu",
      summary:
        "Hoàn thành 8/12 bài học. Chương tiếp theo: Kết nối với cơ sở dữ liệu.",
      url: "/my-courses/nodejs-express-api",
      image: "https://files.fullstack.edu.vn/f8-prod/courses/6.png",
      progress: 75, // Tiến độ học (ví dụ: 75%)
    },
    {
      id: "course-nextjs-14",
      title: "Next.js 14 & React: Xây dựng ứng dụng web hiện đại",
      summary:
        "Mới bắt đầu! Khám phá những khái niệm cốt lõi của Server Components.",
      url: "/my-courses/nextjs-14-va-react",
      image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
      progress: 15, // Tiến độ học (ví dụ: 15%)
    },
  ],
};

// src/mocks/data.ts

export const userProfileData: UserProfile = {
  name: "Gemini AI",
  role: "Frontend Developer",
  avatarUrl: "https://i.pravatar.cc/150?u=gemini",
  email: "gemini.ai@example.dev",
  phone: "(+84) 123 456 789",
  location: "Ho Chi Minh City, Vietnam",
  bio: "AI Assistant passionate about creating beautiful and functional user interfaces.",
};

export const userRoadmaps: Roadmap[] = [
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
];

export const userActivities: Activity[] = [
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
];

export const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "An Nguyen",
    avatar: "/avatars/01.png",
    level: 50,
    xp: 15000,
    streak: 120,
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: "Bao Tran",
    avatar: "/avatars/02.png",
    level: 48,
    xp: 14500,
    streak: 110,
    isCurrentUser: false,
  },
  {
    rank: 3,
    name: "Chi Le",
    avatar: "/avatars/03.png",
    level: 45,
    xp: 13800,
    streak: 95,
    isCurrentUser: false,
  },
  {
    rank: 15,
    name: "Bạn",
    avatar: "https://i.pravatar.cc/150?u=gemini",
    level: 30,
    xp: 9500,
    streak: 45,
    isCurrentUser: true,
  },
];

export const courseData: Course = {
  title: "Khóa React Từ Cơ Bản đến Nâng Cao",
  shortDescription:
    "Nắm vững React và hệ sinh thái của nó qua các dự án thực tế, từ tạo component đến quản lý state phức tạp.",
  thumbnail:
    "https://i.pinimg.com/1200x/58/3e/a7/583ea7d4745614ce2eeab249e5355838.jpg",
  learningObjectives: [
    "Xây dựng ứng dụng web hiện đại với React",
    "Hiểu sâu về JSX, Components, Props và State",
    "Sử dụng thành thạo React Hooks",
    "Quản lý state với Redux Toolkit",
  ],
  duration: "25 giờ",
  lessonCount: 120,
  level: "Trung bình",
  curriculum: [
    {
      moduleTitle: "Chương 1: Nhập Môn React",
      lessons: [
        { title: "React là gì?", duration: "10:35", type: "video" },
        { title: "Cài đặt môi trường", duration: "15:20", type: "video" },
        { title: "Tạo ứng dụng đầu tiên", duration: "20:00", type: "article" },
        {
          title: " Thực Hành tạo ứng dụng đầu tiên",
          duration: "20:00",
          type: "practice",
        },
      ],
    },
    {
      moduleTitle: "Chương 2: Components và Props",
      lessons: [
        {
          title: "Functional vs. Class Components",
          duration: "12:00",
          type: "video",
        },
        { title: "Functional là gì?", duration: "10:35", type: "video" },
        { title: "Cài đặt Functional", duration: "15:20", type: "video" },
        {
          title: "Functional vs. Class Components",
          duration: "20:00",
          type: "article",
        },
        {
          title: " Thực Hành Functional vs. Class Components",
          duration: "20:00",
          type: "practice",
        },
      ],
    },
  ],
  instructor: {
    name: "Gemini AI",
    avatar: "https://i.pravatar.cc/150?u=gemini",
    bio: "Chuyên gia phát triển ứng dụng web.",
  },
  rating: 4.8,
  reviewCount: 1250,
  tags: ["React", "JavaScript", "Frontend"],
  prerequisites: ["Kiến thức cơ bản về HTML, CSS và JavaScript (ES6+)."],
};
