import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  FileText, 
  Link as LinkIcon, 
  Video,
  ChevronLeft,
  Download
} from 'lucide-react';
import { useCurriculumStore } from '../store/useCurriculumStore';
import { Lesson, LessonStatus } from '../types/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

export default function LessonDetail({ lesson, onBack }: LessonDetailProps) {
  const { updateLessonStatus, grades } = useCurriculumStore();
  
  // Find context (Grade/Subject) for the lesson
  let gradeTitle = '';
  let subjectTitle = '';
  
  grades.forEach(g => {
    g.subjects.forEach(s => {
      s.modules.forEach(m => {
        if (m.lessons.some(l => l.id === lesson.id)) {
          gradeTitle = g.title;
          subjectTitle = s.title;
        }
      });
    });
  });

  const handleStatusChange = (status: LessonStatus) => {
    updateLessonStatus(lesson.id, status);
  };

  return (
    <div className="space-y-6">
      {/* Header with breadcrumbs */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{gradeTitle}</span>
          <span>/</span>
          <span>{subjectTitle}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{lesson.title}</h2>
      </div>

      {/* Status Toggle */}
      <Card className="border-none bg-white shadow-sm overflow-hidden">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusBadge status={lesson.status} />
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={lesson.status === 'In Progress' ? 'default' : 'outline'}
              className={lesson.status === 'In Progress' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              onClick={() => handleStatusChange('In Progress')}
            >
              {lesson.status === 'In Progress' ? 'Active' : 'Start'}
            </Button>
            <Button 
              size="sm" 
              variant={lesson.status === 'Completed' ? 'default' : 'outline'}
              className={lesson.status === 'Completed' ? 'bg-green-600 hover:bg-green-700' : ''}
              onClick={() => handleStatusChange('Completed')}
            >
              {lesson.status === 'Completed' ? 'Done' : 'Complete'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          Objectives
        </h3>
        <Card className="border-none bg-white shadow-sm">
          <CardContent className="p-4 space-y-4">
            {lesson.objectives.map((objective, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="mt-1">
                  <Checkbox id={`obj-${i}`} className="rounded-full border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                </div>
                <Label 
                  htmlFor={`obj-${i}`} 
                  className="text-sm text-slate-600 leading-relaxed cursor-pointer group-hover:text-slate-900 transition-colors"
                >
                  {objective}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800">Resources</h3>
        {lesson.resources.length > 0 ? (
          <div className="space-y-2">
            {lesson.resources.map((resource) => (
              <Card key={resource.id} className="border-none bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <ResourceIcon type={resource.type} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{resource.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{resource.type}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic px-1">No resources available for this lesson.</p>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: LessonStatus }) {
  switch (status) {
    case 'Completed':
      return <Badge className="bg-green-50 text-green-600 hover:bg-green-50 border-none">Completed</Badge>;
    case 'In Progress':
      return <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none">In Progress</Badge>;
    default:
      return <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-none">Todo</Badge>;
  }
}

function ResourceIcon({ type }: { type: Lesson['resources'][0]['type'] }) {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'video':
      return <Video className="w-5 h-5 text-purple-500" />;
    case 'link':
      return <LinkIcon className="w-5 h-5 text-blue-500" />;
  }
}
