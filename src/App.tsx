/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Search, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { useCurriculumStore } from './store/useCurriculumStore';
import Dashboard from './screens/Dashboard';
import CurriculumExplorer from './screens/CurriculumExplorer';
import LessonDetail from './screens/LessonDetail';
import SearchScreen from './screens/Search';
import { Lesson } from './types/curriculum';

type Screen = 'dashboard' | 'explorer' | 'lesson' | 'search';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [history, setHistory] = useState<Screen[]>(['dashboard']);

  const navigateTo = (screen: Screen, lesson: Lesson | null = null) => {
    if (lesson) setSelectedLesson(lesson);
    setHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(prevScreen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigateToExplorer={() => navigateTo('explorer')} />;
      case 'explorer':
        return <CurriculumExplorer onSelectLesson={(lesson) => navigateTo('lesson', lesson)} />;
      case 'lesson':
        return selectedLesson ? (
          <LessonDetail lesson={selectedLesson} onBack={goBack} />
        ) : (
          <Dashboard onNavigateToExplorer={() => navigateTo('explorer')} />
        );
      case 'search':
        return <SearchScreen onSelectLesson={(lesson) => navigateTo('lesson', lesson)} />;
      default:
        return <Dashboard onNavigateToExplorer={() => navigateTo('explorer')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Mobile-style Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {history.length > 1 && (
            <button 
              onClick={goBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
          )}
          <h1 className="text-xl font-bold tracking-tight text-blue-600">
            Curriculum Master
          </h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xs font-bold text-blue-600">JD</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto pb-24 pt-4 px-4 min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen + (selectedLesson?.id || '')}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between max-w-md mx-auto shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <NavButton 
          active={currentScreen === 'dashboard'} 
          icon={<LayoutDashboard className="w-6 h-6" />} 
          label="Asosiy" 
          onClick={() => navigateTo('dashboard')} 
        />
        <NavButton 
          active={currentScreen === 'explorer'} 
          icon={<BookOpen className="w-6 h-6" />} 
          label="O'quv rejasi" 
          onClick={() => navigateTo('explorer')} 
        />
        <NavButton 
          active={currentScreen === 'search'} 
          icon={<Search className="w-6 h-6" />} 
          label="Qidiruv" 
          onClick={() => navigateTo('search')} 
        />
        <NavButton 
          active={false} 
          icon={<Settings className="w-6 h-6" />} 
          label="Sozlamalar" 
          onClick={() => {}} 
        />
      </nav>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
    >
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
}
