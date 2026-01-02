import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';

export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: string;
}

interface StudentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentData | null;
}

// Demo data cho học viên
const getStudentCourses = (studentId: string) => [
  { 
    id: '1', 
    name: 'Boki 1 - Kế toán Nhật Bản cơ bản', 
    purchaseDate: '2024-01-15', 
    progress: 60,
    status: 'active'
  }
];

const getStudentExamAttempts = (studentId: string) => {
  if (studentId === '2') {
    return [
      { lessonTitle: 'Bài 1: Giới thiệu', score: 85, date: '2024-01-20', passed: true },
      { lessonTitle: 'Bài 2: Hóa đơn', score: 90, date: '2024-01-22', passed: true },
    ];
  }
  if (studentId === '3') {
    return [
      { lessonTitle: 'Bài 1: Giới thiệu', score: 72, date: '2024-02-25', passed: true },
    ];
  }
  return [];
};

const StudentDetailDialog = ({ open, onOpenChange, student }: StudentDetailDialogProps) => {
  if (!student) return null;

  const courses = getStudentCourses(student.id);
  const examAttempts = getStudentExamAttempts(student.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thông tin học viên</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Thông tin cơ bản
            </h3>
            
            <div className="grid grid-cols-2 gap-4 bg-muted/50 rounded-lg p-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Họ và tên</p>
                <p className="font-medium text-foreground">{student.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Trạng thái</p>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                  {student.status === 'active' ? 'Hoạt động' : 'Chờ xác nhận'}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Mail className="h-3 w-3" /> Email
                </p>
                <p className="font-medium text-foreground">{student.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Ngày tham gia
                </p>
                <p className="font-medium text-foreground">{student.joinedAt}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Khóa học đã đăng ký */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Khóa học đã đăng ký ({courses.length})
            </h3>
            
            {courses.length > 0 ? (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-foreground">{course.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {course.progress}% hoàn thành
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ngày mua: {course.purchaseDate}
                    </p>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Chưa đăng ký khóa học nào</p>
            )}
          </div>

          <Separator />

          {/* Lịch sử làm bài */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Lịch sử làm bài ({examAttempts.length})
            </h3>
            
            {examAttempts.length > 0 ? (
              <div className="space-y-2">
                {examAttempts.map((attempt, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <div>
                      <p className="font-medium text-foreground text-sm">{attempt.lessonTitle}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {attempt.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{attempt.score}/100</p>
                      <div className="flex items-center gap-1 text-xs">
                        {attempt.passed ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">Đậu</span>
                          </>
                        ) : (
                          <span className="text-red-600">Chưa đậu</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Chưa có bài thi nào</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailDialog;
