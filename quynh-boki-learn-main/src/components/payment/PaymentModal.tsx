import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/data/courses';
import { Check, Copy, QrCode, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseTitle: string;
  price: number;
}

const PaymentModal = ({ isOpen, onClose, courseId, courseTitle, price }: PaymentModalProps) => {
  const [step, setStep] = useState<'info' | 'confirm' | 'success'>('info');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { purchaseCourse } = useAuth();

  const bankInfo = {
    bank: 'Vietcombank',
    accountNumber: '1234567890123',
    accountName: 'NGUYEN THI QUYNH',
    content: `BOKI${courseId}-${Date.now()}`,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Đã sao chép',
      description: text,
    });
  };

  const handleConfirmPayment = () => {
    setStep('confirm');
    // Simulate admin approval (demo mode)
    setTimeout(() => {
      purchaseCourse(courseId);
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    setStep('info');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {step === 'success' ? '🎉 Đăng ký thành công!' : 'Thông tin đăng ký & QR Code'}
          </DialogTitle>
        </DialogHeader>

        {step === 'info' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: QR Code */}
            <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-xl">
              <div className="h-48 w-48 bg-card border border-border rounded-xl flex items-center justify-center mb-3">
                <QrCode className="h-24 w-24 text-muted-foreground" />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Quét mã QR để thanh toán
              </p>
            </div>

            {/* Right: Info */}
            <div className="space-y-4">
              {/* Course Info */}
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Khóa học</p>
                <p className="font-medium text-foreground">{courseTitle}</p>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formatCurrency(price)}
                </p>
              </div>

              {/* Bank Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Ngân hàng</p>
                    <p className="font-medium">{bankInfo.bank}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Số tài khoản</p>
                    <p className="font-medium">{bankInfo.accountNumber}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(bankInfo.accountNumber)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Chủ tài khoản</p>
                    <p className="font-medium">{bankInfo.accountName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Nội dung chuyển khoản</p>
                    <p className="font-medium text-primary">{bankInfo.content}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(bankInfo.content)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg text-sm">
                <AlertCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  Vui lòng ghi đúng nội dung chuyển khoản để hệ thống tự động kích hoạt khóa học.
                </p>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleConfirmPayment}
              >
                Tôi đã chuyển khoản (Xác nhận)
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <div className="h-8 w-8 rounded-full gradient-hero" />
            </div>
            <p className="text-muted-foreground">
              Đang xác nhận thanh toán...
            </p>
            <p className="text-xs text-muted-foreground">
              (Demo: Tự động phê duyệt sau 2 giây)
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Đã đăng ký thành công!
              </h3>
              <p className="text-muted-foreground mt-1">
                Bạn đã có thể truy cập vào toàn bộ nội dung khóa học.
              </p>
            </div>
            <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
              (Demo: Auto approved - Thực tế cần admin duyệt)
            </p>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleClose}
            >
              Bắt đầu học ngay
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
