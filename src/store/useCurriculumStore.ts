import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Grade, LessonStatus } from '../types/curriculum';
import { MOCK_CURRICULUM } from '../utils/mockData';

interface CurriculumState {
  grades: Grade[];
  completedObjectives: Record<string, boolean>; // lessonId-objectiveIndex -> boolean
  setGrades: (grades: Grade[]) => void;
  updateLessonStatus: (lessonId: string, status: LessonStatus) => void;
  toggleObjective: (lessonId: string, objectiveIndex: number) => void;
  getOverallProgress: () => number;
  getActiveModules: () => { title: string; subject: string; progress: number }[];
  getStats: () => { completed: number; inProgress: number };
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set, get) => ({
      grades: MOCK_CURRICULUM,
      completedObjectives: {},
      
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

      toggleObjective: (lessonId, objectiveIndex) => {
        const key = `${lessonId}-${objectiveIndex}`;
        set((state) => ({
          completedObjectives: {
            ...state.completedObjectives,
            [key]: !state.completedObjectives[key]
          }
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
      },

      getStats: () => {
        const grades = get().grades;
        let completed = 0;
        let inProgress = 0;

        grades.forEach((g) =>
          g.subjects.forEach((s) =>
            s.modules.forEach((m) =>
              m.lessons.forEach((l) => {
                if (l.status === 'Completed') completed++;
                if (l.status === 'In Progress') inProgress++;
              })
            )
          )
        );

        return { completed, inProgress };
      }
    }),
    {
      name: 'curriculum-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
