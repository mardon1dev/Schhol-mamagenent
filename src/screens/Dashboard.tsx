import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useCurriculumStore } from '../store/useCurriculumStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

interface DashboardProps {
  onNavigateToExplorer: () => void;
}

export default function Dashboard({ onNavigateToExplorer }: DashboardProps) {
  const { getOverallProgress, getActiveModules, getStats } = useCurriculumStore();
  const progress = getOverallProgress();
  const activeModules = getActiveModules();
  const stats = getStats();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Xush kelibsiz, John!</h2>
        <p className="text-slate-500 text-sm">O'quv rejangiz bo'yicha qisqacha ma'lumot.</p>
      </section>

      {/* Progress Card */}
      <Card className="bg-blue-600 text-white border-none shadow-lg shadow-blue-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BookOpen className="w-24 h-24" />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-medium opacity-90">Umumiy o'zlashtirish</CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{progress}%</span>
            <span className="text-sm opacity-75">o'quv rejasi</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 bg-blue-400/30" />
          <div className="mt-4 flex justify-between text-xs opacity-80">
            <span>Yaxshi ketyapsiz! To'xtamang.</span>
            <span>{Math.round(progress / 10)} / 10 Sinf</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Modules */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Faol modullar</h3>
          <button 
            onClick={onNavigateToExplorer}
            className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline"
          >
            Barchasini ko'rish <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {activeModules.length > 0 ? (
          <div className="space-y-3">
            {activeModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none mb-1">
                          {module.subject}
                        </Badge>
                        <h4 className="font-bold text-slate-800">{module.title}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-600">{module.progress}%</span>
                      </div>
                    </div>
                    <Progress value={module.progress} className="h-1.5" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-slate-200 bg-transparent">
            <CardContent className="p-8 text-center space-y-2">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-slate-500 text-sm">Faol modullar yo'q. Explorer orqali yangi darsni boshlang!</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Tugallangan</p>
              <p className="text-lg font-bold text-slate-800">{stats.completed}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Jarayonda</p>
              <p className="text-lg font-bold text-slate-800">{stats.inProgress}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
