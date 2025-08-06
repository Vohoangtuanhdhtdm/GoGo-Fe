import type { LessonContent } from "@/types/learning";

export const detailedLessonData: LessonContent = {
  type: "video",
  title: "Tìm hiểu về Props trong React",
  description:
    "Props (viết tắt của properties) là các đối số chỉ đọc được truyền vào React Component. Chúng cho phép bạn truyền dữ liệu từ component cha xuống component con, giúp tạo ra các component linh hoạt và có thể tái sử dụng.",
  videoUrl: "https://www.youtube.com/watch?v=sBws8MSXN7A",
  practice: {
    language: "javascript",
    initialCode: `function Greeting(props) {\n  // TODO: Trả về một thẻ h1 hiển thị "Hello, [tên]!"\n  // sử dụng props.name\n  return <h1>Hello, ???</h1>;\n}\n\nfunction App() {\n  return <Greeting name="Gemini" />;\n}`,
  },
  qanda: [
    {
      id: "q1",
      author: { name: "An Nguyen", avatar: "/avatars/01.png" },
      timestamp: "2 giờ trước",
      content:
        "Em vẫn chưa hiểu rõ sự khác biệt giữa props và state ạ. Ai đó giải thích giúp em được không?",
      likes: 5,
      isResolved: false,
      replies: [
        {
          id: "r1",
          author: {
            name: "Admin Gemini",
            avatar: "https://i.pravatar.cc/150?u=gemini",
          },
          timestamp: "1 giờ trước",
          content:
            "Chào em, câu hỏi rất hay! Em có thể hiểu đơn giản: **Props** là dữ liệu được truyền từ bên ngoài vào (read-only), còn **State** là dữ liệu do chính component đó quản lý và có thể thay đổi (read-write).",
          likes: 10,
          isResolved: false,
          replies: [],
        },
      ],
    },
  ],
};
