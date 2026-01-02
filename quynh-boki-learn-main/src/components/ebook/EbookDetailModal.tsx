import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle2, Loader2, Star, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/data/courses';

interface Ebook {
    id: number;
    title: string;
    description: string;
    price: number;
    part: number;
    topic: string;
}

interface EbookDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    ebook: Ebook | null;
}

type Step = 'detail' | 'info' | 'payment' | 'success';

const EbookDetailModal = ({ isOpen, onClose, ebook }: EbookDetailModalProps) => {
    const [step, setStep] = useState<Step>('detail');

    // Reset step when modal opens/closes or ebook changes
    useEffect(() => {
        if (isOpen) {
            setStep('detail');
        }
    }, [isOpen, ebook]);

    // Timer for payment step
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === 'payment') {
            timer = setTimeout(() => {
                setStep('success');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [step]);

    if (!ebook) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden flex flex-col md:flex-row gap-0 h-[600px] md:h-[500px]">
                {/* Left Side: Visual/Summary (Always visible but adapts) */}
                <div className="bg-slate-900 text-white p-6 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-slate-900/50 z-0" />
                    {/* Decorative circles */}
                    <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 mb-4">
                            Ebook Kế toán
                        </Badge>
                        <h2 className="font-display font-bold text-2xl mb-2">{ebook.title}</h2>
                        <div className="flex items-center gap-2 text-slate-300 text-sm mb-4">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span>4.9 (50+ đánh giá)</span>
                        </div>
                        <p className="text-slate-300 text-sm line-clamp-4">
                            {ebook.description}.
                            Tài liệu được biên soạn kỹ lưỡng, phù hợp cho người mới bắt đầu học kế toán Nhật Bản (Nissho Boki 3).
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-emerald-400">{formatCurrency(ebook.price)}</span>
                            <span className="text-sm text-slate-400 line-through mb-1">{formatCurrency(ebook.price * 1.5)}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            <ShieldCheck className="h-3 w-3 inline mr-1" />
                            Hoàn tiền 100% nếu lỗi file
                        </p>
                    </div>
                </div>

                {/* Right Side: Logics & Steps */}
                <div className="flex-1 p-6 md:p-8 bg-white flex flex-col overflow-y-auto">
                    {/* Step Content */}
                    <div className="flex-1 flex flex-col justify-center">

                        {/* STEP 1: DETAIL REVIEW */}
                        {step === 'detail' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Thông tin tài liệu</h3>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        <li className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            <span>Định dạng: <b>PDF (Bản đẹp)</b></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            <span>Số trang: <b>120 trang</b></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            <span>Ngôn ngữ: <b>Tiếng Việt & Tiếng Nhật</b></span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            <span>Cập nhật: <b>Tháng 1/2024</b></span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-4">
                                    <Button size="lg" className="w-full font-bold text-lg" onClick={() => setStep('info')}>
                                        Mua ngay
                                    </Button>
                                    <p className="text-center text-xs text-muted-foreground mt-3">
                                        Nhận file ngay lập tức qua email sau khi thanh toán
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: USER INFO FORM */}
                        {step === 'info' && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-bold">Thông tin nhận Ebook</h3>
                                    <p className="text-sm text-muted-foreground">Vui lòng nhập chính xác email để nhận file.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Họ tên</Label>
                                        <Input id="name" placeholder="Nguyễn Văn A" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email nhận tài liệu</Label>
                                        <Input id="email" type="email" placeholder="email@example.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <Input id="phone" placeholder="09xxxxxxxx" />
                                    </div>
                                </div>
                                <Button className="w-full mt-2" onClick={() => setStep('payment')}>
                                    Thanh toán
                                </Button>
                                <Button variant="ghost" className="w-full" onClick={() => setStep('detail')}>
                                    Quay lại
                                </Button>
                            </div>
                        )}

                        {/* STEP 3: PAYMENT QR */}
                        {step === 'payment' && (
                            <div className="flex flex-col items-center space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-xl font-bold">Quét mã để thanh toán</h3>

                                <div className="bg-white p-3 rounded-xl border-2 border-primary/20 shadow-sm">
                                    {/* Fake QR Code */}
                                    <div className="h-40 w-40 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2 opacity-20">
                                            {Array.from({ length: 36 }).map((_, i) => (
                                                <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                                            ))}
                                        </div>
                                        <span className="font-bold text-slate-400 z-10">QR CODE</span>
                                    </div>
                                </div>

                                <div className="w-full bg-muted/50 p-3 rounded-lg space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Ngân hàng:</span>
                                        <span className="font-bold">MB Bank</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Số TK:</span>
                                        <span className="font-bold">1234 5678 9999</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Nội dung:</span>
                                        <span className="font-bold text-primary">EB{ebook.id} {ebook.title.substring(0, 5)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-primary animate-pulse">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang xử lý giao dịch...
                                </div>
                            </div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 'success' && (
                            <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300 h-full">
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                    <CheckCircle2 className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Mua thành công!</h3>
                                <p className="text-muted-foreground">
                                    Cảm ơn bạn đã mua tài liệu.<br />
                                    Vui lòng kiểm tra email của bạn để tải xuống file PDF.
                                </p>
                                <div className="pt-6 w-full">
                                    <Button size="lg" variant="hero" className="w-full" onClick={onClose}>
                                        Hoàn thành
                                    </Button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EbookDetailModal;
