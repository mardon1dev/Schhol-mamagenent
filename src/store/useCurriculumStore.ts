import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Grade, LessonStatus } from '../types/curriculum';
import { MOCK_CURRICULUM } from '../utils/mockData';

interface CurriculumState {
  grades: Grade[];
  setGrades: (grades: Grade[]) => void;
  updateLessonStatus: (lessonId: string, status: LessonStatus) => void;
  getOverallProgress: () => number;
  getActiveModules: () => { title: string; subject: string; progress: number }[];
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set, get) => ({
      grades: MOCK_CURRICULUM,
      
      setGrades: (grades) => set({ grades }),

      updateLessonStatus: (lessonId, status) => {
        set((state) => ({
          grades: state.grades.map((grade) => ({
            ...grade,
            subjects: grade.subjects.map((subject) => ({
              ...subject,
              modules: subject.modules.map((module) => ({
                ...module,
                lessons: module.lessons.map((lesson) =>
                  lesson.id === lessonId ? { ...lesson, status } : lesson
                ),
              })),
            })),
          })),
        }));
      },

      getOverallProgress: () => {
        const grades = get().grades;
        let total = 0;
        let completed = 0;

        grades.forEach((g) =>
          g.subjects.forEach((s) =>
            s.modules.forEach((m) =>
              m.lessons.forEach((l) => {
                total++;
                if (l.status === 'Completed') completed++;
              })
            )
          )
        );

        return total === 0 ? 0 : Math.round((completed / total) * 100);
      },

      getActiveModules: () => {
        const grades = get().grades;
        const activeModules: { title: string; subject: string; progress: number }[] = [];

        grades.forEach((g) =>
          g.subjects.forEach((s) =>
            s.modules.forEach((m) => {
              const totalLessons = m.lessons.length;
              const completedLessons = m.lessons.filter(l => l.status === 'Completed').length;
              const inProgressLessons = m.lessons.filter(l => l.status === 'In Progress').length;
              
              if (inProgressLessons > 0 || (completedLessons > 0 && completedLessons < totalLessons)) {
                activeModules.push({
                  title: m.title,
                  subject: s.title,
                  progress: Math.round((completedLessons / totalLessons) * 100)
                });
              }
            })
          )
        );

        return activeModules;
      }
    }),
    {
      name: 'curriculum-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
