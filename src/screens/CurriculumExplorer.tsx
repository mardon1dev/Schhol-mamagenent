import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Circle,
  PlayCircle
} from 'lucide-react';
import { useCurriculumStore } from '../store/useCurriculumStore';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Lesson } from '../types/curriculum';

interface CurriculumExplorerProps {
  onSelectLesson: (lesson: Lesson) => void;
}

export default function CurriculumExplorer({ onSelectLesson }: CurriculumExplorerProps) {
  const { grades } = useCurriculumStore();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Curriculum Explorer</h2>
        <p className="text-slate-500 text-sm">Drill down to find your lessons.</p>
      </section>

      <Accordion type="multiple" className="space-y-4">
        {grades.map((grade) => (
          <AccordionItem 
            key={grade.id} 
            value={grade.id}
            className="border-none bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{grade.title}</h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {grade.subjects.length} Subjects • {grade.subjects.reduce((acc, s) => acc + s.modules.reduce((ma, m) => ma + m.lessons.length, 0), 0)} Lessons
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-2">
              <div className="space-y-6 pl-2 border-l-2 border-slate-100 ml-5">
                {grade.subjects.map((subject) => (
                  <div key={subject.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold text-slate-700">{subject.title}</h4>
                    </div>
                    
                    <div className="space-y-4 pl-4">
                      {subject.modules.map((module) => (
                        <div key={module.id} className="space-y-2">
                          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Module: {module.title}
                          </h5>
                          <div className="space-y-1">
                            {module.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => onSelectLesson(lesson)}
                                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <StatusIcon status={lesson.status} />
                                  <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function StatusIcon({ status }: { status: Lesson['status'] }) {
  switch (status) {
    case 'Completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'In Progress':
      return <PlayCircle className="w-5 h-5 text-blue-500" />;
    default:
      return <Circle className="w-5 h-5 text-slate-300" />;
  }
}
