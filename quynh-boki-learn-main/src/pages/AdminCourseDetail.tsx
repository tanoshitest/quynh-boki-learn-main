import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Save,
  X,
} from 'lucide-react';
import { formatCurrency, Course, Lesson, Question } from '@/data/courses';
import { useCourse } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

const AdminCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCourse, updateCourse } = useCourse();

  // Find course from context
  const course = getCourse(Number(courseId));

  // Dialog states
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);

  // Video Editing State
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);
  const [videoUrlForm, setVideoUrlForm] = useState('');

  const [quizForm, setQuizForm] = useState<{
    title: string;
    timeLimit: number;
    questions: QuizQuestion[];
  }>({
    title: '',
    timeLimit: 30,
    questions: [],
  });

  // Question form state
  const [questionForm, setQuestionForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Không tìm thấy khóa học</p>
          <Button onClick={() => navigate('/admin')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </Layout>
    );
  }

  // Video Editing Handlers
  const startEditingVideo = (lesson: Lesson) => {
    setEditingVideoId(lesson.id);
    setVideoUrlForm(lesson.videoUrl || '');
  };

  const cancelEditingVideo = () => {
    setEditingVideoId(null);
    setVideoUrlForm('');
  };

  const saveVideoUrl = (lessonId: number) => {
    const updatedLessons = course.lessons.map(l => {
      if (l.id === lessonId) {
        return { ...l, videoUrl: videoUrlForm };
      }
      return l;
    });

    updateCourse({ ...course, lessons: updatedLessons });
    setEditingVideoId(null);
    toast.success('Đã cập nhật link video');
  };


  const openQuizDialog = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
    const existingExam = lesson.exam;

    // Map existing exam questions to local QuizQuestion format
    const mappedQuestions: QuizQuestion[] = existingExam.questions
      .filter(q => q.type === 'multiple-choice') // Filter only multiple choice for this simple editor
      .map((q, idx) => ({
        id: String(idx),
        question: q.text || '',
        options: q.options || ['', '', '', ''],
        correctAnswer: q.correctAnswer || 0,
        points: q.points,
      }));

    if (existingExam && mappedQuestions.length > 0) {
      setQuizForm({
        title: `Quiz bài ${lesson.id}`, // Default title as it's not in Lesson model
        timeLimit: existingExam.timeLimitMinutes,
        questions: mappedQuestions,
      });
    } else {
      setQuizForm({
        title: '',
        timeLimit: 30,
        questions: [],
      });
    }
    setQuizDialogOpen(true);
  };

  const addQuestion = () => {
    if (!questionForm.question.trim()) {
      toast.error('Vui lòng nhập câu hỏi');
      return;
    }
    if (questionForm.options.some(opt => !opt.trim())) {
      toast.error('Vui lòng nhập đầy đủ 4 đáp án');
      return;
    }

    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: questionForm.question,
      options: questionForm.options,
      correctAnswer: questionForm.correctAnswer,
      points: questionForm.points,
    };

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    // Reset question form
    setQuestionForm({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
    });

    toast.success('Đã thêm câu hỏi');
  };

  const removeQuestion = (questionId: string) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
    }));
  };

  const saveQuiz = () => {
    if (!currentLessonId) return;

    // Map back to global Question format
    const newQuestions: Question[] = quizForm.questions.map(q => ({
      type: 'multiple-choice',
      points: q.points,
      text: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      answer: { correctOption: q.correctAnswer } // Maintain compatibility or structure
    }));

    // Update the course
    const updatedLessons = course.lessons.map(l => {
      if (l.id === currentLessonId) {
        return {
          ...l,
          exam: {
            ...l.exam,
            timeLimitMinutes: quizForm.timeLimit,
            questions: newQuestions
          }
        };
      }
      return l;
    });

    updateCourse({
      ...course,
      lessons: updatedLessons
    });

    setQuizDialogOpen(false);
    toast.success('Đã lưu quiz thành công!');
  };

  const deleteQuiz = (lessonId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa Quiz này không?")) return;

    const updatedLessons = course.lessons.map(l => {
      if (l.id === lessonId) {
        return {
          ...l,
          exam: {
            ...l.exam,
            timeLimitMinutes: 60,
            questions: [] // Clear questions
          }
        };
      }
      return l;
    });

    updateCourse({
      ...course,
      lessons: updatedLessons
    });

    toast.success('Đã xóa quiz');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Giá khóa học</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(course.price)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Số bài học</p>
              <p className="text-2xl font-bold">{course.lessons.length} bài</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <Badge variant="default" className="mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Đã xuất bản
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6" />

        {/* Lessons List */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Danh sách bài học
        </h2>

        <div className="space-y-4">
          {course.lessons.map((lesson, index) => {
            const hasQuiz = lesson.exam && lesson.exam.questions.length > 0;
            const isEditingVideo = editingVideoId === lesson.id;

            return (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Bài {index + 1}: {lesson.title}</span>
                    <Badge variant="outline">{lesson.duration}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lesson content info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-medium">Link Video (YouTube):</span>
                      </div>

                      {isEditingVideo ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={videoUrlForm}
                            onChange={(e) => setVideoUrlForm(e.target.value)}
                            placeholder="Nhập link YouTube..."
                            className="h-8 text-sm"
                          />
                          <Button size="sm" onClick={() => saveVideoUrl(lesson.id)} className="h-8 px-2">
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEditingVideo} className="h-8 px-2">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group">
                          {lesson.videoUrl ? (
                            <span className="text-primary truncate max-w-[250px]">{lesson.videoUrl}</span>
                          ) : (
                            <span className="text-muted-foreground italic">Chưa có</span>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => startEditingVideo(lesson)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-medium">Tài liệu PDF:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.documents && lesson.documents.length > 0 ? (
                          <span className="text-primary truncate max-w-[200px]">{lesson.documents[0].url}</span>
                        ) : (
                          <span className="text-muted-foreground italic">Chưa có</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Quiz section */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium">Quiz</span>
                      </div>

                      {hasQuiz ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {lesson.exam.questions.length} câu hỏi
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openQuizDialog(lesson)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteQuiz(lesson.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => openQuizDialog(lesson)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Thêm Quiz
                        </Button>
                      )}
                    </div>

                    {hasQuiz && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        <p><strong>Tiêu đề:</strong> Quiz bài {lesson.id}</p>
                        <p><strong>Thời gian:</strong> {lesson.exam.timeLimitMinutes} phút</p>
                        <p><strong>Tổng điểm:</strong> {lesson.exam.questions.reduce((sum, q) => sum + q.points, 0)} điểm</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quiz Dialog */}
      <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {currentLessonId ? 'Chỉnh sửa Quiz' : 'Thêm Quiz mới'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Quiz info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tiêu đề Quiz</Label>
                <Input
                  value={quizForm.title}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tiêu đề quiz"
                />
              </div>
              <div className="space-y-2">
                <Label>Thời gian (phút)</Label>
                <Input
                  type="number"
                  value={quizForm.timeLimit}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value, 10) || 30 }))}
                  min={1}
                />
              </div>
            </div>

            <Separator />

            {/* Questions list */}
            <div>
              <h3 className="font-medium mb-3">Danh sách câu hỏi ({quizForm.questions.length})</h3>

              {quizForm.questions.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {quizForm.questions.map((q, index) => (
                    <div key={q.id} className="bg-muted/50 rounded-lg p-3 flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">Câu {index + 1}: {q.question}</p>
                        <div className="text-sm text-muted-foreground mt-1">
                          {q.options.map((opt, i) => (
                            <span key={i} className={i === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                              {String.fromCharCode(65 + i as number)}. {opt}
                              {i < q.options.length - 1 ? ' | ' : ''}
                            </span>
                          ))}
                        </div>
                        <Badge variant="outline" className="mt-1">{String(q.points)} điểm</Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeQuestion(q.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">Chưa có câu hỏi nào</p>
              )}
            </div>

            <Separator />

            {/* Add new question form */}
            <div className="space-y-4 bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium">Thêm câu hỏi mới</h4>

              <div className="space-y-2">
                <Label>Câu hỏi</Label>
                <Textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Nhập nội dung câu hỏi"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {questionForm.options.map((opt, index) => (
                  <div key={index} className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={questionForm.correctAnswer === index}
                        onChange={() => setQuestionForm(prev => ({ ...prev, correctAnswer: index }))}
                      />
                      Đáp án {String.fromCharCode(65 + index)}
                    </Label>
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...questionForm.options];
                        newOptions[index] = e.target.value;
                        setQuestionForm(prev => ({ ...prev, options: newOptions }));
                      }}
                      placeholder={`Nhập đáp án ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <Label>Điểm</Label>
                  <Input
                    type="number"
                    value={questionForm.points}
                    onChange={(e) => setQuestionForm(prev => ({ ...prev, points: parseInt(e.target.value) || 10 }))}
                    className="w-24"
                    min={1}
                  />
                </div>
                <Button onClick={addQuestion} className="mt-6">
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm câu hỏi
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setQuizDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={saveQuiz}>
              Lưu Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminCourseDetail;
