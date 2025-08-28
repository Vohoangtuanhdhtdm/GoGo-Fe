export type TCourse = {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  skillLevel: string;
};

// Response body là một mảng các course
export type TCourseResponse = TCourse[];

// --- User & Profile ---
export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

// --- Learning Roadmap ---
export interface Roadmap {
  id: number;
  title: string;
  progress: number;
  description: string;
}

// --- Activity History ---
export interface Activity {
  id: number;
  text: string;
  time: string;
  xp: number;
}

// --- Leaderboard ---
export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  isCurrentUser: boolean;
}

// --- Course Detail ---
export interface Lesson {
  title: string;
  duration: string;
  type: "video" | "article" | "practice";
}

export interface CurriculumModule {
  moduleTitle: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  avatar: string;
  bio: string;
}

export interface Course {
  title: string;
  shortDescription: string;
  thumbnail: string;
  learningObjectives: string[];
  duration: string;
  lessonCount: number;
  level: "Cơ bản" | "Trung bình" | "Nâng cao";
  curriculum: CurriculumModule[];
  instructor: Instructor;
  rating: number;
  reviewCount: number;

  tags: string[];
  prerequisites: string[];
}
