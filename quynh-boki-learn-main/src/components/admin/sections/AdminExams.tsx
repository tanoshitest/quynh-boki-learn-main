import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Plus, Trash2, Clock, FileQuestion, CheckCircle, Search } from 'lucide-react';
import AdminExamEditor from './AdminExamEditor';

// Mock Data
const initialExams = [
    {
        id: 1,
        title: "Đề thi giữa kỳ - Kế toán căn bản",
        course: "Boki 1 - Level 3",
        duration: 45,
        questionCount: 20,
        type: "mixed", // mixed, multiple-choice, essay
        status: "published",
        created: "2024-03-15",
        questions: []
    },
    {
        id: 2,
        title: "Kiểm tra 15 phút - Định khoản",
        course: "Boki 1 - Level 3",
        duration: 15,
        questionCount: 5,
        type: "multiple-choice",
        status: "published",
        created: "2024-03-20",
        questions: []
    },
    {
        id: 3,
        title: "Đề thi thử Level 2 - Tháng 4",
        course: "Boki 2 - Level 2",
        duration: 90,
        questionCount: 35,
        type: "mixed",
        status: "draft",
        created: "2024-04-01",
        questions: []
    }
];

const AdminExams = () => {
    const [exams, setExams] = useState(initialExams);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingExam, setEditingExam] = useState<any>(null);

    // New Exam State
    const [newExam, setNewExam] = useState({
        title: '',
        course: '',
        duration: '60',
        type: 'mixed'
    });

    const handleCreateExam = () => {
        const exam = {
            id: exams.length + 1,
            title: newExam.title || "Đề thi mới",
            course: "Chưa gán", // Simplified for demo
            duration: parseInt(newExam.duration),
            questionCount: 0,
            questions: [],
            type: newExam.type,
            status: "draft",
            created: new Date().toISOString().split('T')[0],
        };

        setExams([exam, ...exams]);
        setIsDialogOpen(false);
        setNewExam({ title: '', course: '', duration: '60', type: 'mixed' });
    };

    const handleDelete = (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa đề thi này?')) {
            setExams(exams.filter(e => e.id !== id));
        }
    };

    const handleSaveExam = (updatedExam: any) => {
        setExams(exams.map(e => e.id === updatedExam.id ? updatedExam : e));
        setEditingExam(null);
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'multiple-choice': return <Badge variant="secondary">Trắc nghiệm</Badge>;
            case 'essay': return <Badge variant="outline">Tự luận</Badge>;
            default: return <Badge variant="default">Hỗn hợp</Badge>;
        }
    };

    const getStatusBadge = (status: string) => {
        return status === 'published'
            ? <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Đã xuất bản</Badge>
            : <Badge variant="secondary">Bản nháp</Badge>;
    };

    const filteredExams = exams.filter(exam =>
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (editingExam) {
        return (
            <AdminExamEditor
                exam={editingExam}
                onSave={handleSaveExam}
                onCancel={() => setEditingExam(null)}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Quản lý đề thi</h2>
                    <p className="text-muted-foreground">Tạo và quản lý ngân hàng đề thi cho các khóa học</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Tạo đề thi mới
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Tạo đề thi mới</DialogTitle>
                            <DialogDescription>
                                Điền thông tin cơ bản cho đề thi. Bạn có thể thêm câu hỏi sau khi tạo.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Tên đề thi</Label>
                                <Input
                                    id="title"
                                    placeholder="Ví dụ: Đề thi cuối kỳ Boki 3"
                                    value={newExam.title}
                                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Thời gian (phút)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={newExam.duration}
                                        onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Loại đề</Label>
                                    <Select
                                        value={newExam.type}
                                        onValueChange={(val) => setNewExam({ ...newExam, type: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn loại" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mixed">Hỗn hợp</SelectItem>
                                            <SelectItem value="multiple-choice">Trắc nghiệm</SelectItem>
                                            <SelectItem value="essay">Tự luận</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                            <Button onClick={handleCreateExam}>Tạo đề thi</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-2 bg-card p-2 rounded-lg border border-border max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground ml-2" />
                <Input
                    placeholder="Tìm kiếm đề thi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0"
                />
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Tên đề thi</TableHead>
                            <TableHead>Khóa học</TableHead>
                            <TableHead>Thông tin</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExams.length > 0 ? filteredExams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <FileQuestion className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{exam.title}</p>
                                            <p className="text-xs text-muted-foreground">Tạo: {exam.created}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{exam.course}</TableCell>
                                <TableCell>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span>{exam.duration} phút</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span>{exam.questionCount} câu hỏi</span>
                                        </div>
                                        <div className="mt-1">
                                            {getTypeBadge(exam.type)}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(exam.status)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" title="Xem chi tiết" onClick={() => setEditingExam(exam)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="Chỉnh sửa"
                                            onClick={() => setEditingExam(exam)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(exam.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    Không tìm thấy đề thi nào phù hợp.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminExams;
