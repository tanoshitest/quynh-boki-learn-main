import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Plus, Trash2, Video, FileText, HelpCircle } from 'lucide-react';

export interface LessonFormData {
  id: string;
  title: string;
  videoUrl: string;
  pdfUrl: string;
  quizTitle: string;
}

export interface CourseFormData {
  id: string;
  title: string;
  description: string;
  price: number;
  published: boolean;
  lessonsCount: number;
  lessons: LessonFormData[];
}

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CourseFormData | null;
  onSave: (course: CourseFormData) => void;
}

const createEmptyLesson = (index: number): LessonFormData => ({
  id: `lesson-${Date.now()}-${index}`,
  title: '',
  videoUrl: '',
  pdfUrl: '',
  quizTitle: '',
});

const CourseFormDialog = ({ open, onOpenChange, course, onSave }: CourseFormDialogProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    id: '',
    title: '',
    description: '',
    price: 0,
    published: false,
    lessonsCount: 0,
    lessons: [createEmptyLesson(1)],
  });

  const isEditing = !!course;

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        lessons: course.lessons.length > 0 ? course.lessons : [createEmptyLesson(1)],
      });
    } else {
      setFormData({
        id: `course-${Date.now()}`,
        title: '',
        description: '',
        price: 0,
        published: false,
        lessonsCount: 0,
        lessons: [createEmptyLesson(1)],
      });
    }
  }, [course, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Vui lòng nhập tên khóa học');
      return;
    }

    if (formData.price < 0) {
      toast.error('Giá khóa học không hợp lệ');
      return;
    }

    // Validate at least first lesson has title
    if (!formData.lessons[0]?.title.trim()) {
      toast.error('Vui lòng nhập tiêu đề bài 1');
      return;
    }

    const updatedFormData = {
      ...formData,
      lessonsCount: formData.lessons.filter(l => l.title.trim()).length,
    };

    onSave(updatedFormData);
    toast.success(isEditing ? 'Cập nhật khóa học thành công!' : 'Thêm khóa học thành công!');
    onOpenChange(false);
  };

  const updateLesson = (index: number, field: keyof LessonFormData, value: string) => {
    const newLessons = [...formData.lessons];
    newLessons[index] = { ...newLessons[index], [field]: value };
    setFormData({ ...formData, lessons: newLessons });
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, createEmptyLesson(formData.lessons.length + 1)],
    });
  };

  const removeLesson = (index: number) => {
    if (formData.lessons.length <= 1) {
      toast.error('Khóa học phải có ít nhất 1 bài');
      return;
    }
    const newLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: newLessons });
  };

  const canAddLesson = (index: number) => {
    const lesson = formData.lessons[index];
    return lesson.title.trim() !== '';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Thông tin khóa học</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Tên khóa học *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ví dụ: Boki 1 - Kế toán cơ bản"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả khóa học</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả ngắn gọn về nội dung khóa học..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Giá (VNĐ)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="1500000"
                />
              </div>

              <div className="flex items-center justify-between pt-6">
                <Label htmlFor="published">Xuất bản</Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Danh sách bài học */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Danh sách bài học</h3>

            {formData.lessons.map((lesson, index) => (
              <div key={lesson.id} className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">Bài {index + 1}</h4>
                  {formData.lessons.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLesson(index)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề bài học *</Label>
                  <Input
                    value={lesson.title}
                    onChange={(e) => updateLesson(index, 'title', e.target.value)}
                    placeholder={`Ví dụ: Bài ${index + 1}: Giới thiệu kế toán`}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Link Video (YouTube)
                  </Label>
                  <Input
                    value={lesson.videoUrl}
                    onChange={(e) => updateLesson(index, 'videoUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Link PDF bài giảng
                  </Label>
                  <Input
                    value={lesson.pdfUrl}
                    onChange={(e) => updateLesson(index, 'pdfUrl', e.target.value)}
                    placeholder="/pdf/bai-1.pdf hoặc link URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Tiêu đề Quiz
                  </Label>
                  <Input
                    value={lesson.quizTitle}
                    onChange={(e) => updateLesson(index, 'quizTitle', e.target.value)}
                    placeholder={`Quiz bài ${index + 1}`}
                  />
                </div>

                {/* Nút thêm bài tiếp theo */}
                {index === formData.lessons.length - 1 && canAddLesson(index) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLesson}
                    className="w-full mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm bài {index + 2}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">
              {isEditing ? 'Cập nhật' : 'Thêm khóa học'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseFormDialog;
