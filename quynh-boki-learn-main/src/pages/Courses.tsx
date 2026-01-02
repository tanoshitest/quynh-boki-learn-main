import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allCourses, courseCategories, formatCurrency } from '@/data/courses';
import {
  BookOpen, Clock, Users, Star, Play, Lock, Filter,
  ChevronRight, Sparkles, GraduationCap, Video, Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EbookDetailModal from '@/components/ebook/EbookDetailModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { user, hasPurchasedCourse } = useAuth();
  const [isZoomRegisterOpen, setIsZoomRegisterOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState<any>(null);
  const { toast } = useToast();

  const handleZoomRegister = () => {
    setIsZoomRegisterOpen(false);
    toast({
      title: "Đăng ký thành công",
      description: "Bạn đã đăng ký khóa học Zoom thành công. Chúng tôi sẽ liên hệ sớm nhất!",
    });
  };

  const filteredCourses = selectedCategory === 'all'
    ? allCourses
    : allCourses.filter(course => course.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
              <span className="text-primary-foreground/90 text-sm font-medium">8+ Khóa học chuyên nghiệp</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Khóa học & Tài liệu
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Khám phá các khóa học kế toán, tài chính và kỹ năng văn phòng.
              Mỗi khóa đều có nội dung miễn phí để bạn trải nghiệm trước khi đăng ký.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/90">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <BookOpen className="h-5 w-5" />
                <span>{allCourses.length} Khóa học</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="h-5 w-5" />
                <span>8,000+ Học viên</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5" />
                <span>4.8 Đánh giá</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="video-courses" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="video-courses">Khóa học Video</TabsTrigger>
                <TabsTrigger value="zoom-courses">Khóa học Zoom</TabsTrigger>
                <TabsTrigger value="ebooks">Ebook</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="video-courses" className="space-y-8">
              {/* Category Filter */}
              <div className="bg-muted/30 p-4 rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Lọc theo danh mục:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="rounded-full"
                  >
                    Tất cả
                  </Button>
                  {courseCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                      className="rounded-full"
                    >
                      <span className="mr-1">{cat.icon}</span>
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => {
                  const isPurchased = user ? hasPurchasedCourse(course.id) : false;

                  return (
                    <div
                      key={course.id}
                      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Course Thumbnail */}
                      <div className="relative h-44 gradient-hero overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                        {/* Thumbnail Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl opacity-90">{course.thumbnail}</span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            {courseCategories.find(c => c.id === course.category)?.name || 'Khác'}
                          </Badge>
                        </div>

                        {/* Purchased Badge */}
                        {isPurchased && (
                          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                            ✓ Đã mua
                          </Badge>
                        )}

                        {/* Free Content Badge */}
                        {(course.freeContentCount ?? 0) > 0 && !isPurchased && (
                          <div className="absolute bottom-3 right-3">
                            <Badge variant="outline" className="bg-white/90 text-primary border-primary">
                              <Sparkles className="h-3 w-3 mr-1" />
                              {course.freeContentCount} bài miễn phí
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Course Content */}
                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        {/* Course Meta */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>{course.lessons.length} bài học</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{course.students?.toLocaleString()} học viên</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-yellow-500" />
                            <span>{course.rating} / 5</span>
                          </div>
                        </div>

                        {/* Content Distribution */}
                        <div className="flex gap-2 text-xs">
                          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <Play className="h-3 w-3" />
                            <span>{course.freeContentCount} miễn phí</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Lock className="h-3 w-3" />
                            <span>{course.paidContentCount} trả phí</span>
                          </div>
                        </div>

                        {/* Instructor */}
                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-sm font-medium">
                              {course.instructor?.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{course.instructor}</span>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-3">
                          <div>
                            <p className="text-xl font-bold text-foreground">
                              {formatCurrency(course.price)}
                            </p>
                            <p className="text-xs text-muted-foreground">Trọn đời</p>
                          </div>

                          <Button asChild variant={isPurchased ? "default" : "hero"} size="sm">
                            <Link to={`/courses/${course.id}`}>
                              {isPurchased ? (
                                <>
                                  <Play className="h-4 w-4 mr-1" />
                                  Học ngay
                                </>
                              ) : (
                                <>
                                  Chi tiết
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </>
                              )}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="zoom-courses">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Demo Zoom Course Card */}
                <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-44 bg-blue-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="text-6xl text-white opacity-90" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        Lớp Zoom Live
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        Kế toán Boki 1 - Online Zoom
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        Khóa học nhập môn kế toán Nhật Bản (Nissho Boki 3). Học trực tiếp qua Zoom với giáo viên giàu kinh nghiệm.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Khai giảng: 15/01</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>24 buổi (90p/buổi)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>Tối đa 20 HV</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500" />
                        <span>Giáo viên Nhật - Việt</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-medium">Q</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Quỳnh Sensei</span>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <p className="text-xl font-bold text-foreground">
                          {formatCurrency(3500000)}
                        </p>
                        <p className="text-xs text-muted-foreground">Toàn khóa</p>
                      </div>

                      <Button asChild variant="hero" size="sm">
                        <Link to="/courses/zoom/demo">
                          Chi tiết
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ebooks">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 10 }).map((_, i) => {
                  const ebookData = {
                    id: i + 1,
                    title: `Giáo trình Boki 3 - Phần ${i + 1}: ${['Nhập môn', 'Tài sản', 'Nợ phải trả', 'Vốn chủ sở hữu', 'Doanh thu', 'Chi phí', 'Báo cáo TC', 'Bài tập', 'Đề thi', 'Tổng ôn'][i]}`,
                    description: 'Tài liệu chi tiết, biên soạn theo chuẩn Nissho Boki mới nhất.',
                    price: 150000,
                    part: i + 1,
                    topic: ['Nhập môn', 'Tài sản', 'Nợ phải trả', 'Vốn chủ sở hữu', 'Doanh thu', 'Chi phí', 'Báo cáo TC', 'Bài tập', 'Đề thi', 'Tổng ôn'][i]
                  };

                  return (
                    <div
                      key={i}
                      className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      onClick={() => setSelectedEbook(ebookData)}
                    >
                      <div className="relative aspect-[3/4] bg-emerald-600/10 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <BookOpen className="h-12 w-12 text-emerald-600 mb-2 opacity-80" />
                          <h3 className="font-display font-bold text-emerald-900 text-lg leading-tight">
                            Ebook Kế toán Boki
                          </h3>
                          <span className="text-emerald-700 font-bold text-4xl opacity-20 absolute bottom-4 right-4">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-foreground shadow-sm">
                            PDF
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {ebookData.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {ebookData.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="font-bold text-lg text-primary">{formatCurrency(ebookData.price)}</span>
                          <Button size="sm" variant="ghost" className="hover:text-primary hover:bg-primary/10">
                            Xem trước
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <EbookDetailModal
        isOpen={!!selectedEbook}
        onClose={() => setSelectedEbook(null)}
        ebook={selectedEbook}
      />

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Bạn cần tư vấn khóa học phù hợp?
            </h2>
            <p className="text-muted-foreground mb-6">
              Liên hệ với chúng tôi để được tư vấn miễn phí về lộ trình học tập phù hợp với mục tiêu của bạn.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Liên hệ tư vấn
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Về Quỳnh BOKI
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
};

export default Courses;
