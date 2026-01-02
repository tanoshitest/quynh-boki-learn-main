import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { demoCourse } from '@/data/courses';
import { BookOpen, PlayCircle, CheckCircle, ArrowRight } from 'lucide-react';

const StudentCourses = () => {
    const { hasPurchasedCourse } = useAuth();
    const purchasedCourses = [demoCourse].filter(c => hasPurchasedCourse(c.id));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Khóa học của tôi</h2>
                    <p className="text-muted-foreground">
                        Tiếp tục hành trình học tập của bạn
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link to="/courses">
                        Xem tất cả khóa học
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            </div>

            {purchasedCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300"
                        >
                            <div className="h-32 gradient-hero relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-primary-foreground/80 text-sm">
                                        {course.lessons.length} bài học
                                    </p>
                                </div>
                                <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 text-primary px-2 py-1 rounded-full text-xs font-medium">
                                    <CheckCircle className="h-3 w-3" />
                                    Đã mua
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                                    {course.title}
                                </h3>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-muted-foreground">Tiến độ</span>
                                        <span className="font-medium text-foreground">0%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full gradient-hero rounded-full"
                                            style={{ width: '0%' }}
                                        />
                                    </div>
                                </div>

                                <Button variant="default" size="sm" className="w-full" asChild>
                                    <Link to={`/courses/${course.id}/lessons/1`}>
                                        <PlayCircle className="h-4 w-4 mr-2" />
                                        Tiếp tục học
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                        Chưa có khóa học nào
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Hãy khám phá các khóa học của chúng tôi và bắt đầu học ngay!
                    </p>
                    <Button variant="hero" asChild>
                        <Link to="/courses">
                            Xem khóa học
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default StudentCourses;
