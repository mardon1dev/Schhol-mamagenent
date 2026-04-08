import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { useCurriculumStore } from '../store/useCurriculumStore';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Lesson } from '../types/curriculum';

interface SearchScreenProps {
  onSelectLesson: (lesson: Lesson) => void;
}

export default function SearchScreen({ onSelectLesson }: SearchScreenProps) {
  const { grades } = useCurriculumStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchResults: { lesson: Lesson; grade: string; subject: string }[] = [];
    const lowerQuery = query.toLowerCase();

    grades.forEach(grade => {
      grade.subjects.forEach(subject => {
        subject.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            if (
              lesson.title.toLowerCase().includes(lowerQuery) ||
              module.title.toLowerCase().includes(lowerQuery) ||
              subject.title.toLowerCase().includes(lowerQuery) ||
              lesson.objectives.some(obj => obj.toLowerCase().includes(lowerQuery))
            ) {
              searchResults.push({ lesson, grade: grade.title, subject: subject.title });
            }
          });
        });
      });
    });

    return searchResults;
  }, [query, grades]);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Global Search</h2>
        <p className="text-slate-500 text-sm">Find any lesson, module, or topic.</p>
      </section>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input 
          className="pl-10 h-12 rounded-2xl border-slate-200 focus-visible:ring-blue-500 bg-white shadow-sm"
          placeholder="Search for 'Algebra', 'Newton', etc..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-3">
        {query.trim() === '' ? (
          <div className="text-center py-12 space-y-3">
            <SearchIcon className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-400 text-sm">Start typing to search the curriculum.</p>
          </div>
        ) : results.length > 0 ? (
          results.map(({ lesson, grade, subject }, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="border-none bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onSelectLesson(lesson)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" /> {grade}
                        </span>
                        <span>•</span>
                        <span>{subject}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 space-y-3">
            <p className="text-slate-400 text-sm">No results found for "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
