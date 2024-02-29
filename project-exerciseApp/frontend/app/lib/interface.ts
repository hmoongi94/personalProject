export interface ChildrenProp {
  children: React.ReactNode;
}

export interface ExerciseDetailProps {
  imgurl: string;
  name: string;
  description: string;
}

export interface ExerciseData {
  exerciseIndex: number;
  name: string;
  category: string;
  description: string;
  imgurl: string;
}

export interface ExerciseDetailProps {
  name: string;
  imgurl: string;
  description: string;
}

export interface WorkoutEntry {
  id: number;
  name: string;
  totalReps: number;
  totalSets: number;
}

export interface CaloryEntry {
  name: string;
  caloryPerRepsTotal: number;
}

export interface PostData {
  content: string;
  date: string;
  imgurl: string;
  userId: string;
  postId: string;
  userIndex: number;
  likeCount: string;
  commentContents: string | null;
  commentDates: string | null;
  commentuserId: string | null;
  commentIndexes: string | null;
}

export interface LikeData {
  userId: string;
  postId: string;
}