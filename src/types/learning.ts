// Định nghĩa cho một bình luận/câu hỏi
export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  isResolved: boolean;
  replies: Comment[]; // Cho phép bình luận lồng nhau
}

// Cập nhật LessonContent để bao gồm các phần mới
export interface LessonContent {
  type: "video" | "text" | "quiz" | "code_challenge";
  title: string;
  description: string; // Mô tả chi tiết cho tab [Mô tả]
  videoUrl: string; // URL cho video bài giảng
  practice: {
    initialCode: string;
    language: "html" | "javascript";
  };
  qanda: Comment[]; // Dữ liệu cho tab [Hỏi đáp]
}
