export interface AIMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  time: string;
}

export interface StudentContext {
  gradeLevel?: number | string;
  name?: string;
  currentLesson?: string;
}

export type OwlMood = 'waving' | 'happy' | 'thinking' | 'celebrating';
