import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const StudentExams = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Bài thi của tôi</h2>
                <p className="text-muted-foreground">
                    Danh sách các bài thi bạn đã tham gia
                </p>
            </div>

            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Chưa có bài thi nào</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Bạn chưa tham gia bài thi thử nào. Hãy chọn một khóa học và bắt đầu làm bài thi để kiểm tra kiến thức nhé.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentExams;
