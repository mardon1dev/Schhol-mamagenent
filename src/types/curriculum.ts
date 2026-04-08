export type LessonStatus = 'Todo' | 'In Progress' | 'Completed';

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'video';
  url: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  objectives: string[];
  status: LessonStatus;
  resources: Resource[];
}

export interface Module {
  id: string;
  subjectId: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  gradeId: string;
  title: string;
  modules: Module[];
}

export interface Grade {
  id: string;
  title: string;
  subjects: Subject[];
}
