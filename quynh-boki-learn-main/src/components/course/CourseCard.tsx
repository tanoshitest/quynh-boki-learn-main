import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Course, formatCurrency } from '@/data/courses';
import { BookOpen, Clock, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { user, hasPurchasedCourse } = useAuth();
  const isPurchased = hasPurchasedCourse(course.id);

  return (
    <div className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300">
      {/* Card Header */}
      <div className="relative h-48 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-primary-foreground/90 text-sm mb-2">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessons.length} bài học</span>
          </div>
          <h3 className="font-display text-xl font-bold text-primary-foreground">
            {course.title}
          </h3>
        </div>
        {isPurchased && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 text-primary px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Đã mua
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(course.price)}
            </p>
            <p className="text-xs text-muted-foreground">Trọn đời</p>
          </div>

          <Button asChild variant={user && isPurchased ? "default" : "hero"}>
            <Link to={`/courses/${course.id}`}>
              {user && isPurchased ? (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Học ngay
                </>
              ) : (
                <>
                  Chi tiết
                </>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
