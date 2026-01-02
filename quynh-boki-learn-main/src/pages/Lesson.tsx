import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LessonSidebar from '@/components/lesson/LessonSidebar';
import PdfViewer from '@/components/lesson/PdfViewer';
import VideoPlayer from '@/components/lesson/VideoPlayer';
import ExamInterface from '@/components/exam/ExamInterface';
import ExamResult from '@/components/exam/ExamResult';
import { demoCourse } from '@/data/courses';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  ListVideo,
  Clock,
  Play,
  FileText,
  Download,
  PenTool,
  ArrowRightCircle,
  ChevronLeft
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const parseTimeToSeconds = (timeStr: string): number => {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
};

import { useCourse } from '@/contexts/CourseContext';

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const { user, hasPurchasedCourse } = useAuth();
  const { getCourse } = useCourse();
  const [examScore, setExamScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);

  // Validate params
  if (!courseId) {
    return <Navigate to="/courses" replace />;
  }

  const course = getCourse(parseInt(courseId));

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  // eslint-disable-next-line radix
  const lesson = course.lessons.find(l => l.id === parseInt(lessonId || '0'));

  // Initialize video src when lesson changes
  useEffect(() => {
    if (lesson) {
      setVideoSrc(lesson.videoUrl);
      // Reset exam state
      setExamScore(null);
      setShowResult(false);
      setIsTakingQuiz(false);
    }
  }, [lesson]);

  if (!lesson) {
    return <Navigate to={`/courses/${courseId}`} replace />;
  }

  const isPurchased = hasPurchasedCourse(course.id);

  // Phải mua khóa học mới được học
  if (!isPurchased) {
    return <Navigate to={`/courses/${courseId}`} replace />;
  }

  const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  const handleExamSubmit = (answers: any, score: number) => {
    setExamScore(score);
    setShowResult(true);
  };

  const handleRetry = () => {
    setExamScore(null);
    setShowResult(false);
  };

  const handleSeek = (timeStr: string) => {
    const seconds = parseTimeToSeconds(timeStr);
    const baseUrl = lesson.videoUrl.split('?')[0];
    const newSrc = `${baseUrl}?start=${seconds}&autoplay=1`;
    setVideoSrc(newSrc);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border flex items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/courses/${courseId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Quay lại</span>
            </Link>
          </Button>

          <div className="hidden md:block border-l border-border pl-4">
            <h1 className="font-medium text-foreground line-clamp-1 text-sm">
              {lesson.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Bài {lesson.id} / {course.lessons.length}
            </p>
          </div>
        </div>

        {/* Lesson Navigation */}
        <div className="flex items-center gap-2">
          {prevLesson && (
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Bài trước</span>
              </Link>
            </Button>
          )}
          {nextLesson && (
            <Button variant="default" size="sm" asChild>
              <Link to={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                <span className="hidden sm:inline mr-2">Bài tiếp</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 h-screen overflow-hidden">
        <div className="h-full flex flex-col md:flex-row">
          {/* Left Column: Video & Chapters - Takes 2/3 space */}
          <div className="flex-none md:w-[66.6666%] flex flex-col h-full border-r border-border overflow-hidden">
            {/* Video Section */}
            <div className="flex-none p-4 bg-black/5">
              <div className="aspect-video w-full max-h-[50vh] mx-auto bg-black">
                <VideoPlayer title={lesson.title} videoUrl={videoSrc} />
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <h1 className="text-xl font-bold line-clamp-1 mr-4">{lesson.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{lesson.duration}</span>
                </div>
              </div>
            </div>

            {/* Chapters - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 border-t border-border">
              {lesson.chapters && lesson.chapters.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 sticky top-0 bg-background/95 backdrop-blur py-2 z-10">
                    <ListVideo className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Mục lục Video</h3>
                  </div>
                  <div className="space-y-1">
                    {lesson.chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        onClick={() => handleSeek(chapter.time)}
                        className="flex items-center gap-3 p-3 w-full rounded-lg border border-border bg-card hover:bg-muted transition-all text-left group"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Play className="h-3 w-3 fill-current" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-muted-foreground block mb-0.5">
                            {chapter.time}
                          </span>
                          <span className="text-sm font-medium line-clamp-1">
                            {chapter.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tabs (Docs & Quiz) - Takes 1/3 space */}
          <div className="flex-none md:w-[33.3333%] h-full flex flex-col bg-background">
            <Tabs defaultValue="doc" className="h-full flex flex-col">
              <div className="flex-none p-4 border-b border-border">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="doc">Tài liệu</TabsTrigger>
                  <TabsTrigger value="quiz">Bài tập (Quiz)</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <TabsContent value="doc" className="mt-0 h-full">
                  <div className="space-y-4">
                    {lesson.documents && lesson.documents.length > 0 ? (
                      <div className="space-y-3">
                        {lesson.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-foreground line-clamp-1">{doc.title}</p>
                                <p className="text-xs text-muted-foreground">PDF Document</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                        <FileText className="h-12 w-12 mb-2 opacity-20" />
                        <p>Chưa có tài liệu</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="mt-0 h-full">
                  <div className="min-h-full">
                    {!isTakingQuiz ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Bài tập thực hành</h4>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            Hoàn thành bài tập để củng cố kiến thức vừa học.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <button
                            onClick={() => setIsTakingQuiz(true)}
                            className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <PenTool className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">Bài tập trắc nghiệm & tự luận</p>
                                <p className="text-xs text-muted-foreground">Thời gian: {lesson.exam.timeLimitMinutes} phút</p>
                              </div>
                            </div>
                            <ArrowRightCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsTakingQuiz(false)}
                          className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Quay lại danh sách
                        </Button>

                        {!showResult ? (
                          <ExamInterface
                            exam={lesson.exam}
                            onSubmit={handleExamSubmit}
                          />
                        ) : (
                          examScore !== null && (
                            <ExamResult
                              score={examScore}
                              exam={lesson.exam}
                              onRetry={handleRetry}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lesson;
