import { FileText, Play, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type LessonTab = 'pdf' | 'video' | 'quiz';

interface LessonSidebarProps {
  activeTab: LessonTab;
  onTabChange: (tab: LessonTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  lessonTitle: string;
}

const tabs = [
  { id: 'pdf' as const, label: 'PDF bài học', icon: FileText },
  { id: 'video' as const, label: 'Video bài giảng', icon: Play },
  { id: 'quiz' as const, label: 'Quiz', icon: ClipboardList },
];

const LessonSidebar = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  lessonTitle,
}: LessonSidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border flex flex-col transition-all duration-300 z-40',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <h3 className="font-semibold text-foreground text-sm line-clamp-2">
            {lessonTitle}
          </h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="shrink-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className={cn('h-5 w-5 shrink-0', isCollapsed && 'mx-auto')} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{tab.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Quỳnh BOKI
          </p>
        </div>
      )}
    </aside>
  );
};

export default LessonSidebar;
