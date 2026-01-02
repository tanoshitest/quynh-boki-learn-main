import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import {
  BookOpen,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  FileText,
  TrendingUp,
  Clock,
  Star,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';
import { allCourses, formatCurrency } from '@/data/courses';
import AwardsSection from '@/components/home/AwardsSection';

const Index = () => {
  const features = [
    {
      icon: Play,
      title: 'Video chất lượng cao',
      description: 'Bài giảng được thiết kế chuyên nghiệp, dễ hiểu, phù hợp với người mới bắt đầu.'
    },
    {
      icon: FileText,
      title: 'Đề thi mô phỏng thực tế',
      description: 'Luyện tập với cấu trúc đề thi Nissho Boki Level 3 chuẩn Nhật Bản.'
    },
    {
      icon: TrendingUp,
      title: 'Theo dõi tiến độ',
      description: 'Xem kết quả chi tiết, phân tích điểm mạnh/yếu để cải thiện.'
    },
    {
      icon: Award,
      title: 'Chứng chỉ hoàn thành',
      description: 'Nhận chứng chỉ sau khi hoàn thành khóa học và vượt qua bài thi.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Học viên' },
    { value: '95%', label: 'Tỷ lệ đậu' },
    { value: '10+', label: 'Bài học' },
    { value: '24/7', label: 'Hỗ trợ' }
  ];

  const featuredCourses = allCourses.slice(0, 3);

  const blogPosts = [
    {
      title: 'Bí quyết đậu Boki Level 3 ngay lần thi đầu tiên',
      excerpt: 'Chia sẻ kinh nghiệm và phương pháp học tập hiệu quả từ các học viên xuất sắc.',
      category: 'Kinh nghiệm',
      date: '10/12/2024',
      readTime: '5 phút'
    },
    {
      title: 'Tổng quan về kế toán Nhật Bản - Nissho Boki',
      excerpt: 'Tìm hiểu về hệ thống kế toán chuẩn Nhật và tầm quan trọng của chứng chỉ Boki.',
      category: 'Kiến thức',
      date: '08/12/2024',
      readTime: '7 phút'
    },
    {
      title: 'Cơ hội việc làm với chứng chỉ Nissho Boki',
      excerpt: 'Khám phá các cơ hội nghề nghiệp hấp dẫn khi sở hữu chứng chỉ kế toán Nhật.',
      category: 'Nghề nghiệp',
      date: '05/12/2024',
      readTime: '6 phút'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Đào tạo Kế toán Nissho Boki
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Chinh phục{' '}
              <span className="text-primary">Nissho Boki</span>{' '}
              cùng Quỳnh BOKI
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Khóa học kế toán theo chuẩn Nhật Bản, từ cơ bản đến nâng cao.
              Luyện thi Level 3 với đề mô phỏng thực tế, cam kết đậu 95%.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/courses">
                  Xem khóa học
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/about">
                  Tìm hiểu thêm
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tại sao chọn Quỳnh BOKI?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp chương trình đào tạo toàn diện, được thiết kế bởi
              chuyên gia kế toán có kinh nghiệm làm việc tại Nhật Bản.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-card border border-border rounded-2xl hover:shadow-card hover:border-primary/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Khóa học tiêu biểu
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Các khóa học được yêu thích nhất tại Quỳnh BOKI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <Card
                key={course.id}
                className="group overflow-hidden hover:shadow-card transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 gradient-hero flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary-foreground/80" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs">4.9</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      {course.lessons.length} bài học
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(course.price)}
                    </span>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/courses/${course.id}`}>
                        Chi tiết
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="hero" asChild>
              <Link to="/courses">
                Xem tất cả khóa học
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <AwardsSection />

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Sẵn sàng bắt đầu hành trình?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt và bắt đầu
              chinh phục chứng chỉ Nissho Boki!
            </p>
            <Button
              size="xl"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link to="/courses">
                Khám phá khóa học
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Blog & Tin tức
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cập nhật kiến thức, kinh nghiệm và tin tức mới nhất về kế toán Nhật Bản
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card
                key={post.title}
                className="group overflow-hidden hover:shadow-card transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-primary/50" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/blog">
                        Đọc thêm
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/blog">
                Xem tất cả bài viết
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-hero opacity-10 rounded-full blur-3xl" />

              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xl">
                  NA
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Nguyễn Văn A</h4>
                  <p className="text-sm text-muted-foreground">Học viên khóa Boki 1</p>
                </div>
              </div>

              <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                "Trước khi học tại Quỳnh BOKI, mình không biết gì về kế toán Nhật.
                Sau 2 tháng học, mình đã tự tin thi đậu Level 3 với điểm cao.
                Cảm ơn cô Quỳnh và đội ngũ giảng viên!"
              </blockquote>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Có thắc mắc hay cần tư vấn? Hãy liên hệ ngay, chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">contact@quynhboki.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Điện thoại</h4>
                  <p className="text-muted-foreground">0123 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Địa chỉ</h4>
                  <p className="text-muted-foreground">123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Giờ làm việc</h4>
                  <p className="text-muted-foreground">Thứ 2 - Thứ 7: 8:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Họ và tên
                    </label>
                    <Input placeholder="Nhập họ và tên" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="Nhập email" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Số điện thoại
                  </label>
                  <Input placeholder="Nhập số điện thoại" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nội dung
                  </label>
                  <Textarea
                    placeholder="Nhập nội dung tin nhắn..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" variant="hero">
                  Gửi tin nhắn
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
