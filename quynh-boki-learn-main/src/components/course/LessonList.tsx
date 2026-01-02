import { Link } from 'react-router-dom';
import { Lesson } from '@/data/courses';
import { PlayCircle, Clock, FileText, Lock, Unlock } from 'lucide-react';

interface LessonListProps {
  lessons: Lesson[];
  courseId: number;
  isLocked?: boolean;
}

const LessonList = ({ lessons, courseId, isLocked = false }: LessonListProps) => {
  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const isFreeLesson = lesson.isFree;
        const canAccess = isFreeLesson || !isLocked;

        return (
          <div
            key={lesson.id}
            className={`group relative rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 ${
              canAccess 
                ? 'hover:shadow-soft hover:border-primary/30' 
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            {canAccess ? (
              <Link
                to={`/courses/${courseId}/lessons/${lesson.id}`}
                className="flex items-center gap-4 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-primary-foreground group-hover:shadow-glow transition-all duration-300">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      Có bài thi
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isFreeLesson && (
                    <span className="text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                      <Unlock className="h-3 w-3" />
                      Miễn phí
                    </span>
                  )}
                  <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem ngay
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground line-clamp-1">
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      Có bài thi
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  Trả phí
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LessonList;
