import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Hướng dẫn ôn thi Nissho Boki cấp 3 hiệu quả',
    excerpt: 'Chia sẻ kinh nghiệm và phương pháp ôn thi Nissho Boki cấp 3 giúp bạn đạt kết quả cao trong kỳ thi sắp tới.',
    category: 'Kinh nghiệm thi',
    author: 'Cô Quỳnh',
    date: '2024-01-15',
    readTime: '8 phút đọc',
    image: 'bg-gradient-to-br from-blue-100 to-green-100',
  },
  {
    id: 2,
    title: 'Phân biệt các loại tài khoản trong kế toán Nhật',
    excerpt: 'Tìm hiểu chi tiết về hệ thống tài khoản kế toán theo chuẩn Nhật Bản và cách phân loại chính xác.',
    category: 'Kiến thức',
    author: 'Thầy Minh',
    date: '2024-01-10',
    readTime: '12 phút đọc',
    image: 'bg-gradient-to-br from-purple-100 to-pink-100',
  },
  {
    id: 3,
    title: 'Bí quyết ghi nhớ bút toán nhanh và chính xác',
    excerpt: 'Các mẹo và kỹ thuật giúp bạn ghi nhớ bút toán một cách hiệu quả, không còn lo quên trong phòng thi.',
    category: 'Mẹo học tập',
    author: 'Cô Linh',
    date: '2024-01-05',
    readTime: '6 phút đọc',
    image: 'bg-gradient-to-br from-orange-100 to-yellow-100',
  },
  {
    id: 4,
    title: 'Tổng hợp đề thi Nissho Boki qua các năm',
    excerpt: 'Phân tích xu hướng đề thi và những dạng bài thường gặp trong kỳ thi Nissho Boki cấp 3.',
    category: 'Đề thi',
    author: 'Cô Quỳnh',
    date: '2024-01-01',
    readTime: '15 phút đọc',
    image: 'bg-gradient-to-br from-teal-100 to-cyan-100',
  },
  {
    id: 5,
    title: 'Cơ hội việc làm với chứng chỉ Nissho Boki',
    excerpt: 'Khám phá các cơ hội nghề nghiệp hấp dẫn dành cho người sở hữu chứng chỉ kế toán Nhật Bản.',
    category: 'Nghề nghiệp',
    author: 'Thầy Minh',
    date: '2023-12-28',
    readTime: '10 phút đọc',
    image: 'bg-gradient-to-br from-indigo-100 to-blue-100',
  },
  {
    id: 6,
    title: 'Lịch thi Nissho Boki năm 2024',
    excerpt: 'Cập nhật lịch thi Nissho Boki các cấp độ trong năm 2024 và hướng dẫn đăng ký dự thi.',
    category: 'Thông báo',
    author: 'Cô Quỳnh',
    date: '2023-12-20',
    readTime: '5 phút đọc',
    image: 'bg-gradient-to-br from-rose-100 to-red-100',
  },
];

const categories = ['Tất cả', 'Kinh nghiệm thi', 'Kiến thức', 'Mẹo học tập', 'Đề thi', 'Nghề nghiệp', 'Thông báo'];

const Blog = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Blog <span className="text-primary">Quỳnh BOKI</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Chia sẻ kiến thức, kinh nghiệm và mẹo học tập kế toán Nhật Bản
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'Tất cả' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className={`h-48 ${post.image} flex items-center justify-center`}>
                  <span className="text-6xl opacity-20">📚</span>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem thêm bài viết
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Đăng ký nhận bài viết mới</h2>
            <p className="text-muted-foreground mb-6">
              Nhận thông báo về bài viết mới, mẹo học tập và thông tin về kỳ thi qua email
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Đăng ký</Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
