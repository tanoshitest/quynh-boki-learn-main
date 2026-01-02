import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/data/courses';
import {
    Clock, Users, Star, Play, Lock, CheckCircle2,
    Calendar, Video, ShieldCheck, ArrowLeft, Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const ZoomCourseDetail = () => {
    const { user } = useAuth();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'info' | 'pending' | 'processing' | 'success'>('info');

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPaymentOpen && paymentStatus === 'pending') {
            // Auto switch to success after 5 seconds
            timer = setTimeout(() => {
                setPaymentStatus('success');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isPaymentOpen, paymentStatus]);

    const handleOpenPayment = () => {
        setPaymentStatus('info');
        setIsPaymentOpen(true);
    };

    return (
        <Layout>
            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4 border-b border-border">
                <div className="container">
                    <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại danh sách khóa học
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-12 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="container relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
                                <Video className="mr-1 h-3 w-3" />
                                Lớp học trực tuyến qua Zoom
                            </Badge>

                            <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight">
                                Kế toán Boki 1 - <span className="text-primary">Nissho Boki 3</span>
                            </h1>

                            <p className="text-lg text-slate-300">
                                Khóa học nhập môn kế toán Nhật Bản (Nissho Boki 3). Hệ thống kiến thức bài bản, dễ hiểu, áp dụng ngay vào thực tế công việc.
                            </p>

                            <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>24 buổi (90p/buổi)</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                    <Users className="h-4 w-4 text-primary" />
                                    <span>Tối đa 20 học viên</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>Khai giảng: 15/01/2024</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                                        <span className="text-primary font-bold">Q</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Quỳnh Sensei</p>
                                        <p className="text-sm text-slate-400">Giảng viên chính</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-white/10" />
                                <div>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-bold">4.9</span>
                                    </div>
                                    <p className="text-sm text-slate-400">100+ đánh giá</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 lg:w-[400px] lg:ml-auto">
                            <div className="mb-6 relative h-48 rounded-xl overflow-hidden bg-slate-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Video className="h-16 w-16 text-slate-300" />
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Học phí ưu đãi</span>
                                    <span className="text-primary text-2xl">{formatCurrency(3500000)}</span>
                                </div>
                                <p className="text-sm text-muted-foreground text-center line-through">
                                    {formatCurrency(5000000)}
                                </p>
                            </div>

                            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="w-full font-bold text-lg h-12" onClick={handleOpenPayment}>
                                        Đăng ký ngay
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">
                                            {paymentStatus === 'info' && 'Thông tin đăng ký'}
                                            {paymentStatus === 'pending' && 'Thanh toán học phí'}
                                            {paymentStatus === 'success' && 'Đăng ký thành công!'}
                                        </DialogTitle>
                                        <DialogDescription className="text-center">
                                            {paymentStatus === 'info' && 'Vui lòng điền thông tin để chúng tôi liên hệ.'}
                                            {paymentStatus === 'pending' && 'Vui lòng quét mã QR bên dưới để thanh toán.'}
                                            {paymentStatus === 'success' && 'Chào mừng bạn đến với khóa học.'}
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="py-2">
                                        {paymentStatus === 'info' && (
                                            <div className="space-y-4 px-1">
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
                                                    <input
                                                        id="name"
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        placeholder="Nhập họ và tên của bạn"
                                                        defaultValue={user?.name || ''}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        placeholder="email@example.com"
                                                        defaultValue={user?.email || ''}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="phone" className="text-sm font-medium">Số điện thoại</label>
                                                    <input
                                                        id="phone"
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        placeholder="0912 345 678"
                                                    />
                                                </div>
                                                <Button className="w-full mt-4" onClick={() => setPaymentStatus('pending')}>
                                                    Tiếp tục thanh toán
                                                </Button>
                                            </div>
                                        )}
                                        {paymentStatus === 'success' ? (
                                            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                                    <CheckCircle2 className="h-10 w-10" />
                                                </div>
                                                <p className="text-center font-medium text-lg">Cảm ơn bạn đã đăng ký!</p>
                                                <p className="text-center text-muted-foreground mt-2 text-sm">
                                                    Chúng tôi sẽ nhắc nhở bạn trước mỗi buổi zoom và tự động gửi recap/record/quiz test qua mail đã đăng ký.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center space-y-4 w-full">
                                                <div className="bg-white p-4 rounded-xl border-2 border-primary/20 shadow-sm">
                                                    {/* Fake QR Code */}
                                                    <div className="h-48 w-48 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2 opacity-20">
                                                            {Array.from({ length: 36 }).map((_, i) => (
                                                                <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                                                            ))}
                                                        </div>
                                                        <span className="font-bold text-slate-400 z-10">QR CODE</span>
                                                    </div>
                                                </div>

                                                <div className="w-full bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Ngân hàng:</span>
                                                        <span className="font-bold">MB Bank</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Số tài khoản:</span>
                                                        <span className="font-bold">1234 5678 9999</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Chủ tài khoản:</span>
                                                        <span className="font-bold">QUYNH BOKI</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Nội dung:</span>
                                                        <span className="font-bold text-primary">BOKI3 {user?.id}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center text-sm text-primary animate-pulse">
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Đang kiểm tra thanh toán...
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {paymentStatus === 'success' && (
                                        <DialogFooter className="sm:justify-center">
                                            <Button type="button" variant="hero" onClick={() => setIsPaymentOpen(false)}>
                                                Hoàn tất
                                            </Button>
                                        </DialogFooter>
                                    )}
                                </DialogContent>
                            </Dialog>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                <ShieldCheck className="h-3 w-3 inline mr-1" />
                                Cam kết hoàn tiền trong 7 ngày nếu không hài lòng
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Content Detail Placeholder */}
            <section className="py-12">
                <div className="container">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-bold mb-6">Nội dung khóa học</h2>
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-lg border border-border">
                                <h3 className="font-bold mb-2">Chương 1: Cơ bản về Kế toán (8 buổi)</h3>
                                <p className="text-muted-foreground text-sm">Hiểu về Tài sản, Nợ phải trả, Vốn chủ sở hữu, Doanh thu, Chi phí.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-border">
                                <h3 className="font-bold mb-2">Chương 2: Ghi sổ kép & Báo cáo tài chính (8 buổi)</h3>
                                <p className="text-muted-foreground text-sm">Cách ghi nhật ký chung, sổ cái và lập Bảng cân đối thử.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-border">
                                <h3 className="font-bold mb-2">Chương 3: Xử lý các nghiệp vụ đặc biệt (8 buổi)</h3>
                                <p className="text-muted-foreground text-sm">Khấu hao, Nợ xấu, Chi phí trả trước/phải trả và Lập BCTC cuối kỳ.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ZoomCourseDetail;
