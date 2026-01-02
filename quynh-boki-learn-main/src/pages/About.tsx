import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Target, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Về <span className="text-primary">Quỳnh BOKI</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chúng tôi là nền tảng giáo dục trực tuyến hàng đầu về kế toán Nhật Bản (Nissho Boki), 
              giúp học viên Việt Nam chinh phục các chứng chỉ kế toán quốc tế.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Sứ mệnh của chúng tôi</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Quỳnh BOKI được thành lập với mục tiêu mang đến phương pháp học kế toán Nhật Bản 
                hiệu quả và dễ tiếp cận nhất cho học viên Việt Nam.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi tin rằng mọi người đều có thể nắm vững kiến thức kế toán chuẩn quốc tế 
                thông qua các khóa học được thiết kế bài bản và hệ thống luyện thi chuyên sâu.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Học viên</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Tỷ lệ đậu</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Khóa học</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-4">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Chất lượng</h3>
                <p className="text-sm text-muted-foreground">
                  Nội dung được biên soạn bởi chuyên gia có chứng chỉ Nissho Boki
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Hiệu quả</h3>
                <p className="text-sm text-muted-foreground">
                  Phương pháp học tập được tối ưu hóa cho kỳ thi thực tế
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Hỗ trợ</h3>
                <p className="text-sm text-muted-foreground">
                  Đội ngũ hỗ trợ tận tâm, sẵn sàng giải đáp mọi thắc mắc
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Cam kết</h3>
                <p className="text-sm text-muted-foreground">
                  Cam kết đồng hành cùng học viên đến khi đạt kết quả
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Đội ngũ giảng viên</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">Q</span>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg">Cô Quỳnh</h3>
                <p className="text-sm text-primary mb-2">Founder & Giảng viên chính</p>
                <p className="text-sm text-muted-foreground">
                  Chứng chỉ Nissho Boki cấp 2, 10 năm kinh nghiệm giảng dạy
                </p>
              </CardContent>
            </Card>
            <Card className="text-center overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-secondary-foreground">M</span>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg">Thầy Minh</h3>
                <p className="text-sm text-primary mb-2">Giảng viên</p>
                <p className="text-sm text-muted-foreground">
                  Chuyên gia kế toán, 8 năm làm việc tại doanh nghiệp Nhật
                </p>
              </CardContent>
            </Card>
            <Card className="text-center overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-muted-foreground">L</span>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg">Cô Linh</h3>
                <p className="text-sm text-primary mb-2">Trợ giảng</p>
                <p className="text-sm text-muted-foreground">
                  Tốt nghiệp loại giỏi ngành Kế toán, hỗ trợ học viên 24/7
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
