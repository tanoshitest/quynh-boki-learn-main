import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { CourseFormData } from './CourseFormDialog';
import { formatCurrency } from '@/data/courses';

interface CourseDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CourseFormData | null;
}

const CourseDetailDialog = ({ open, onOpenChange, course }: CourseDetailDialogProps) => {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Chi tiết khóa học
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{course.title}</h2>
                {course.description && (
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                )}
              </div>
              <Badge variant={course.published ? 'default' : 'secondary'}>
                {course.published ? (
                  <><CheckCircle className="h-3 w-3 mr-1" /> Đã xuất bản</>
                ) : (
                  <><XCircle className="h-3 w-3 mr-1" /> Bản nháp</>
                )}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-muted/50 rounded-lg p-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Giá khóa học</p>
                <p className="font-bold text-foreground text-lg">{formatCurrency(course.price)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Số bài học</p>
                <p className="font-bold text-foreground text-lg">{course.lessons?.length || 0} bài</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Danh sách bài học */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Danh sách bài học ({course.lessons?.length || 0})
            </h3>

            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="font-medium text-foreground mb-3">
                      Bài {index + 1}: {lesson.title || 'Chưa có tiêu đề'}
                    </h4>

                    <div className="space-y-2 text-sm">
                      {/* Video */}
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Video:</span>
                        {lesson.videoUrl ? (
                          <a 
                            href={lesson.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 truncate max-w-[300px]"
                          >
                            {lesson.videoUrl}
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground italic">Chưa có</span>
                        )}
                      </div>

                      {/* PDF */}
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">PDF:</span>
                        {lesson.pdfUrl ? (
                          <a 
                            href={lesson.pdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 truncate max-w-[300px]"
                          >
                            {lesson.pdfUrl}
                            <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground italic">Chưa có</span>
                        )}
                      </div>

                      {/* Quiz */}
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Quiz:</span>
                        {lesson.quizTitle ? (
                          <span className="text-foreground">{lesson.quizTitle}</span>
                        ) : (
                          <span className="text-muted-foreground italic">Chưa có</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Chưa có bài học nào</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
