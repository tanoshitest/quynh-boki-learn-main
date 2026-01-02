import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Exam, Question } from '@/data/courses';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AlertCircle, Clock, Send } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface JournalRow {
  debit: string;
  debitAmount: string;
  credit: string;
  creditAmount: string;
}

interface ExamAnswers {
  journal: JournalRow[];
  posting: { summary: string; amounts: string[] };
  pnl: { cogs: string; grossProfit: string };
}

interface ExamInterfaceProps {
  exam: Exam;
  onSubmit: (answers: ExamAnswers, score: number) => void;
}

const ExamInterface = ({ exam, onSubmit }: ExamInterfaceProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [answers, setAnswers] = useState<ExamAnswers>({
    journal: Array(4).fill({ debit: '', debitAmount: '', credit: '', creditAmount: '' }),
    posting: { summary: '', amounts: ['', '', ''] },
    pnl: { cogs: '', grossProfit: '' },
  });

  const journalQuestion = exam.questions.find(q => q.type === 'journal');
  const postingQuestion = exam.questions.find(q => q.type === 'posting');
  const pnlQuestion = exam.questions.find(q => q.type === 'pnl_balance');

  const handleJournalChange = (index: number, field: keyof JournalRow, value: string) => {
    const newJournal = [...answers.journal];
    newJournal[index] = { ...newJournal[index], [field]: value };
    setAnswers({ ...answers, journal: newJournal });
  };

  const calculateScore = (): number => {
    let totalScore = 0;

    // Grade Journal (45 points)
    if (journalQuestion) {
      const correctAnswers = journalQuestion.answer as any[];
      let journalCorrect = 0;
      correctAnswers.forEach((correct, idx) => {
        const userAnswer = answers.journal[idx];
        if (
          userAnswer.debit === correct.debit &&
          parseFloat(userAnswer.debitAmount) === correct.debitAmount &&
          userAnswer.credit === correct.credit &&
          parseFloat(userAnswer.creditAmount) === correct.creditAmount
        ) {
          journalCorrect++;
        }
      });
      totalScore += (journalCorrect / correctAnswers.length) * 45;
    }

    // Grade Posting (20 points)
    if (postingQuestion) {
      const correctPosting = postingQuestion.answer as { summary: string; amounts: number[] };
      let postingScore = 0;
      if (answers.posting.summary.toLowerCase().includes(correctPosting.summary.toLowerCase().substring(0, 5))) {
        postingScore += 10;
      }
      const correctAmounts = correctPosting.amounts;
      const userAmounts = answers.posting.amounts.map(a => parseFloat(a) || 0);
      correctAmounts.forEach((amt, idx) => {
        if (userAmounts[idx] === amt) {
          postingScore += 10 / correctAmounts.length;
        }
      });
      totalScore += Math.min(postingScore, 20);
    }

    // Grade P&L (35 points)
    if (pnlQuestion) {
      const materials = pnlQuestion.materials!;
      const expectedCogs = materials.beginInv! + materials.purchaseBalance! - materials.endingInv!;
      const userCogs = parseFloat(answers.pnl.cogs) || 0;
      const userGross = parseFloat(answers.pnl.grossProfit) || 0;
      
      if (userCogs === expectedCogs) {
        totalScore += 17.5;
      }
      if (userGross === pnlQuestion.answer.grossProfit) {
        totalScore += 17.5;
      }
    }

    return Math.round(totalScore);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    onSubmit(answers, score);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span>Thời gian: {exam.timeLimitMinutes} phút</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Tổng điểm: 100 (Câu 1: 45, Câu 2: 20, Câu 3: 35)
        </div>
      </div>

      {/* Question 1: Journal Entries */}
      {journalQuestion && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">
              Câu 1: Định khoản (仕訳)
            </h3>
            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              {journalQuestion.points} điểm
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            Điền các bút toán định khoản theo nghiệp vụ đã học. Mỗi tài khoản chỉ sử dụng 1 lần trong bảng.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left text-sm font-medium">STT</th>
                  <th className="border border-border p-2 text-left text-sm font-medium">Tài khoản Nợ (Debit)</th>
                  <th className="border border-border p-2 text-left text-sm font-medium">Số tiền</th>
                  <th className="border border-border p-2 text-left text-sm font-medium">Tài khoản Có (Credit)</th>
                  <th className="border border-border p-2 text-left text-sm font-medium">Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {answers.journal.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-border p-2 text-center text-sm">{idx + 1}</td>
                    <td className="border border-border p-2">
                      <Select
                        value={row.debit}
                        onValueChange={(v) => handleJournalChange(idx, 'debit', v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn TK Nợ" />
                        </SelectTrigger>
                        <SelectContent>
                          {journalQuestion.allowedAccounts?.map((acc) => (
                            <SelectItem key={acc} value={acc}>
                              {acc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        type="number"
                        placeholder="0"
                        value={row.debitAmount}
                        onChange={(e) => handleJournalChange(idx, 'debitAmount', e.target.value)}
                      />
                    </td>
                    <td className="border border-border p-2">
                      <Select
                        value={row.credit}
                        onValueChange={(v) => handleJournalChange(idx, 'credit', v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn TK Có" />
                        </SelectTrigger>
                        <SelectContent>
                          {journalQuestion.allowedAccounts?.map((acc) => (
                            <SelectItem key={acc} value={acc}>
                              {acc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border border-border p-2">
                      <Input
                        type="number"
                        placeholder="0"
                        value={row.creditAmount}
                        onChange={(e) => handleJournalChange(idx, 'creditAmount', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Question 2: Posting */}
      {postingQuestion && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">
              Câu 2: Ghi sổ (転記)
            </h3>
            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              {postingQuestion.points} điểm
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tóm tắt nghiệp vụ
              </label>
              <Input
                placeholder="Nhập tóm tắt..."
                value={answers.posting.summary}
                onChange={(e) => setAnswers({
                  ...answers,
                  posting: { ...answers.posting, summary: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Số tiền các bút toán
              </label>
              <div className="grid grid-cols-3 gap-4">
                {answers.posting.amounts.map((amt, idx) => (
                  <Input
                    key={idx}
                    type="number"
                    placeholder={`Số tiền ${idx + 1}`}
                    value={amt}
                    onChange={(e) => {
                      const newAmounts = [...answers.posting.amounts];
                      newAmounts[idx] = e.target.value;
                      setAnswers({
                        ...answers,
                        posting: { ...answers.posting, amounts: newAmounts }
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question 3: P&L / Balance */}
      {pnlQuestion && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">
              Câu 3: Báo cáo & Giá vốn (損益)
            </h3>
            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              {pnlQuestion.points} điểm
            </span>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="text-sm font-medium mb-2">Thông tin cho sẵn:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Tồn kho đầu kỳ: {pnlQuestion.materials?.beginInv?.toLocaleString('vi-VN')} VNĐ</li>
              <li>• Mua hàng trong kỳ: {pnlQuestion.materials?.purchaseBalance?.toLocaleString('vi-VN')} VNĐ</li>
              <li>• Tồn kho cuối kỳ: {pnlQuestion.materials?.endingInv?.toLocaleString('vi-VN')} VNĐ</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Giá vốn hàng bán (COGS)
              </label>
              <Input
                type="number"
                placeholder="Nhập giá vốn..."
                value={answers.pnl.cogs}
                onChange={(e) => setAnswers({
                  ...answers,
                  pnl: { ...answers.pnl, cogs: e.target.value }
                })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Công thức: Tồn ĐK + Mua - Tồn CK
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Lợi nhuận gộp (Gross Profit)
              </label>
              <Input
                type="number"
                placeholder="Nhập lợi nhuận gộp..."
                value={answers.pnl.grossProfit}
                onChange={(e) => setAnswers({
                  ...answers,
                  pnl: { ...answers.pnl, grossProfit: e.target.value }
                })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          variant="hero"
          size="lg"
          onClick={() => setShowConfirm(true)}
        >
          <Send className="h-4 w-4 mr-2" />
          Nộp bài
        </Button>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              Xác nhận nộp bài?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn nộp bài? Sau khi nộp sẽ không thể chỉnh sửa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Xác nhận nộp bài
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamInterface;
