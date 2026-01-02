git config--global user.email "tanomorivietnam@gmail.com"
git config--global user.name "THANH NGUYEN"

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user, hasPurchasedCourse } = useAuth();
  const [showPayment, setShowPayment] = useState(false);

  const course = allCourses.find(c => c.id === Number(courseId));

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const isPurchased = hasPurchasedCourse(course.id);
  const category = courseCategories.find(c => c.id === course.category);
  const freeCount = course.lessons.filter(l => l.isFree).length;
  const paidCount = course.lessons.filter(l => !l.isFree).length;

  const features = [
    { icon: BookOpen, text: `${course.lessons.length} bài học đầy đủ` },
    { icon: Clock, text: course.duration || 'Học mọi lúc, mọi nơi' },
    { icon: Award, text: 'Chứng chỉ hoàn thành' },
    { icon: Users, text: `${course.students?.toLocaleString() || 0} học viên` },
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-4">
                <span className="text-2xl">{course.thumbnail}</span>
                {category?.name || 'Khóa học'}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{course.students?.toLocaleString()} học viên</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Giảng viên: {course.instructor}</span>
              </div>

              {/* Content Summary */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full">
                  <Unlock className="h-4 w-4" />
                  <span className="font-medium">{freeCount} bài miễn phí</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">{paidCount} bài trả phí</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Course Content Tabs */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Nội dung khóa học
              </h2>

              {!user && (
                <div className="mb-4 p-4 bg-muted rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    <Lock className="h-4 w-4 inline mr-2" />
                    Vui lòng{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      đăng nhập
                    </Link>
                    {' '}để xem và mua khóa học. Bạn có thể xem các bài học miễn phí sau khi đăng nhập.
                  </p>
                </div>
              )}

              <LessonList
                lessons={course.lessons}
                courseId={course.id}
                isLocked={!isPurchased}
              />
            </div>

            {/* Course Description */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Mô tả khóa học
              </h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>{course.description}</p>
                <h4 className="text-foreground font-semibold mt-4">Bạn sẽ học được gì?</h4>
                <ul className="space-y-2 mt-2">
                  <li>Nắm vững kiến thức từ cơ bản đến nâng cao</li>
                  <li>Thực hành với các bài tập và đề thi thực tế</li>
                  <li>Tự tin thi lấy chứng chỉ chuyên ngành</li>
                  <li>Áp dụng ngay vào công việc thực tế</li>
                </ul>
                <h4 className="text-foreground font-semibold mt-4">Đối tượng phù hợp:</h4>
                <ul className="space-y-2 mt-2">
                  <li>Sinh viên các ngành kinh tế, kế toán</li>
                  <li>Người đi làm muốn nâng cao kỹ năng</li>
                  <li>Những ai muốn lấy chứng chỉ chuyên nghiệp</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden shadow-card">
              {/* Preview Image */}
              <div className="h-48 gradient-hero flex items-center justify-center">
                <span className="text-8xl opacity-80">{course.thumbnail}</span>
              </div>

              {/* Price & CTA */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(course.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Truy cập trọn đời
                  </p>
                </div>

                {isPurchased ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary bg-primary/10 p-3 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Bạn đã sở hữu khóa học này</span>
                    </div>
                    <Button variant="hero" size="lg" className="w-full" asChild>
                      <Link to={`/courses/${course.id}/lessons/1`}>
                        Bắt đầu học ngay
                      </Link>
                    </Button>
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={() => setShowPayment(true)}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Mua khóa học
                    </Button>
                    {freeCount > 0 && (
                      <p className="text-xs text-center text-muted-foreground">
                        Bạn có thể xem {freeCount} bài học miễn phí trước khi mua
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button variant="hero" size="lg" className="w-full" asChild>
                      <Link to="/login">
                        <Lock className="h-5 w-5 mr-2" />
                        Đăng nhập để mua
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Chưa có tài khoản?{' '}
                      <Link to="/register" className="text-primary hover:underline">
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                )}

                {/* Includes */}
                <div className="pt-6 border-t border-border space-y-3">
                  <p className="font-medium text-foreground">Bao gồm:</p>
                  <ul className="space-y-2">
                    {[
                      'Hỗ trợ giảng viên 24/7',
                      'Chứng chỉ hoàn thành',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructor */}
                <div className="pt-6 border-t border-border">
                  <p className="font-medium text-foreground mb-3">Giảng viên</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {course.instructor?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">Chuyên gia {category?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        courseId={course.id}
        courseTitle={course.title}
        price={course.price}
      />
    </Layout>
  );
};

export default CourseDetail;
