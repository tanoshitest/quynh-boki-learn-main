import { Button } from '@/components/ui/button';
import { Download, CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';
import { Exam } from '@/data/courses';

interface ExamResultProps {
  score: number;
  exam: Exam;
  onRetry: () => void;
}

const ExamResult = ({ score, exam, onRetry }: ExamResultProps) => {
  const passed = score >= 70;

  const handleDownloadPDF = () => {
    // Create a simple text content for demo
    const content = `
QUỲNH BOKI - KẾT QUẢ BÀI THI
==============================

Ngày thi: ${new Date().toLocaleDateString('vi-VN')}
Thời gian: ${new Date().toLocaleTimeString('vi-VN')}

ĐIỂM TỔNG KẾT: ${score}/100
KẾT LUẬN: ${passed ? 'ĐẬU' : 'CHƯA ĐẬU'}

-------------------------------
CHI TIẾT ĐIỂM TỪNG CÂU:
-------------------------------

Câu 1 - Định khoản (仕訳): ${Math.round(score * 0.45)}/45 điểm
Câu 2 - Ghi sổ (転記): ${Math.round(score * 0.20)}/20 điểm  
Câu 3 - Báo cáo & Giá vốn: ${Math.round(score * 0.35)}/35 điểm

-------------------------------
ĐÁP ÁN ĐÚNG:
-------------------------------

CÂU 1: ĐỊNH KHOẢN
${exam.questions[0].answer.map((a: any, i: number) => 
  `${i + 1}. Nợ: ${a.debit} (${a.debitAmount?.toLocaleString('vi-VN')}đ) | Có: ${a.credit} (${a.creditAmount?.toLocaleString('vi-VN')}đ)`
).join('\n')}

CÂU 2: GHI SỔ
Tóm tắt: ${exam.questions[1].answer.summary}
Số tiền: ${exam.questions[1].answer.amounts.map((a: number) => a.toLocaleString('vi-VN') + 'đ').join(', ')}

CÂU 3: BÁO CÁO
Giá vốn (COGS): ${exam.questions[2].answer.cogs?.toLocaleString('vi-VN')}đ
Lợi nhuận gộp: ${exam.questions[2].answer.grossProfit?.toLocaleString('vi-VN')}đ

==============================
Quỳnh BOKI - Đào tạo Kế toán Nissho Boki
Website: www.quynhboki.vn
Email: contact@quynhboki.vn
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KetQua_QuynhBOKI_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className={`p-8 text-center ${passed ? 'gradient-hero' : 'bg-destructive'}`}>
          <div className="h-20 w-20 mx-auto rounded-full bg-background/20 flex items-center justify-center mb-4">
            {passed ? (
              <Trophy className="h-10 w-10 text-primary-foreground" />
            ) : (
              <XCircle className="h-10 w-10 text-destructive-foreground" />
            )}
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-2">
            {passed ? 'Chúc mừng!' : 'Chưa đạt'}
          </h2>
          <p className="text-primary-foreground/80">
            {passed 
              ? 'Bạn đã hoàn thành xuất sắc bài thi này!' 
              : 'Hãy ôn tập lại và thử lại nhé!'}
          </p>
        </div>

        {/* Score */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-display font-bold text-foreground mb-2">
              {score}<span className="text-2xl text-muted-foreground">/100</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              passed 
                ? 'bg-primary/10 text-primary' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {passed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {passed ? 'Đậu' : 'Chưa đậu'} (Yêu cầu: 70/100)
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-4 mb-8">
            <h3 className="font-medium text-foreground">Chi tiết điểm:</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Câu 1: Định khoản</span>
                <span className="font-medium">{Math.round(score * 0.45)}/45</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Câu 2: Ghi sổ</span>
                <span className="font-medium">{Math.round(score * 0.20)}/20</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Câu 3: Báo cáo & Giá vốn</span>
                <span className="font-medium">{Math.round(score * 0.35)}/35</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4 mr-2" />
              Tải kết quả (PDF)
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={onRetry}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
