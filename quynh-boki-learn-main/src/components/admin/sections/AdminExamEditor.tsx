import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, Upload, FileQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Question {
    id: number;
    type: 'multiple-choice' | 'essay';
    text: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
    sampleAnswer?: string; // For essay
    points: number;
}

interface AdminExamEditorProps {
    exam: any;
    onSave: (updatedExam: any) => void;
    onCancel: () => void;
}

const AdminExamEditor = ({ exam, onSave, onCancel }: AdminExamEditorProps) => {
    const [formData, setFormData] = useState({
        ...exam,
        questions: exam.questions || [] // Ensure questions array exists
    });

    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

    const handleInfoChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    // Question Management
    const addQuestion = () => {
        const newQuestion: Question = {
            id: Date.now(),
            type: 'multiple-choice',
            text: '',
            options: [
                { id: 'A', text: '' },
                { id: 'B', text: '' },
                { id: 'C', text: '' },
                { id: 'D', text: '' },
            ],
            correctOptionId: 'A',
            sampleAnswer: '',
            points: 1
        };
        setFormData({
            ...formData,
            questions: [...formData.questions, newQuestion]
        });
        setActiveQuestionId(newQuestion.id);
    };

    const updateQuestion = (qId: number, field: string, value: any) => {
        const updatedQuestions = formData.questions.map((q: Question) =>
            q.id === qId ? { ...q, [field]: value } : q
        );
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const updateOption = (qId: number, optionId: string, text: string) => {
        const updatedQuestions = formData.questions.map((q: Question) => {
            if (q.id === qId) {
                const updatedOptions = q.options.map((opt: any) =>
                    opt.id === optionId ? { ...opt, text } : opt
                );
                return { ...q, options: updatedOptions };
            }
            return q;
        });
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const removeQuestion = (qId: number) => {
        if (confirm('Xóa câu hỏi này?')) {
            setFormData({
                ...formData,
                questions: formData.questions.filter((q: Question) => q.id !== qId)
            });
            if (activeQuestionId === qId) setActiveQuestionId(null);
        }
    };

    const handleImportExcel = () => {
        alert("Tính năng Import Excel đang được phát triển. Vui lòng thử lại sau!");
    };

    const handleSave = () => {
        // Calculate total question count
        const updatedExam = {
            ...formData,
            questionCount: formData.questions.length
        };
        onSave(updatedExam);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={onCancel}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Chỉnh sửa đề thi</h2>
                        <p className="text-muted-foreground">{formData.title}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleImportExcel}>
                        <Upload className="h-4 w-4 mr-2" />
                        Import Excel
                    </Button>
                    <Button variant="outline" onClick={onCancel}>Hủy</Button>
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Lưu thay đổi
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: General Info */}
                <div className="space-y-6 lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin chung</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Tên đề thi</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInfoChange('title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="course">Khóa học</Label>
                                <Select
                                    value={formData.course}
                                    onValueChange={(val) => handleInfoChange('course', val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn khóa học" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Boki 1 - Level 3">Boki 1 - Level 3</SelectItem>
                                        <SelectItem value="Boki 2 - Level 2">Boki 2 - Level 2</SelectItem>
                                        <SelectItem value="Chưa gán">Chưa gán</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Thời gian (phút)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => handleInfoChange('duration', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Trạng thái</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(val) => handleInfoChange('status', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Bản nháp</SelectItem>
                                            <SelectItem value="published">Đã xuất bản</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">Danh sách câu hỏi</CardTitle>
                            <Button size="sm" variant="outline" onClick={addQuestion}>
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                {formData.questions.map((q: Question, idx: number) => (
                                    <div
                                        key={q.id}
                                        onClick={() => setActiveQuestionId(q.id)}
                                        className={`p-3 rounded-lg border cursor-pointer text-sm transition-colors flex items-center justify-between group ${activeQuestionId === q.id
                                                ? 'bg-primary/5 border-primary'
                                                : 'bg-card border-border hover:bg-muted'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className="font-mono text-xs text-muted-foreground w-5 h-5 flex items-center justify-center bg-muted rounded-full shrink-0">
                                                {idx + 1}
                                            </span>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="truncate font-medium">
                                                    {q.text || "(Câu hỏi chưa có nội dung)"}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                                    {q.type === 'essay' ? 'Tự luận' : 'Trắc nghiệm'}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeQuestion(q.id);
                                            }}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                                {formData.questions.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground text-sm">
                                        Chưa có câu hỏi nào
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Question Editor */}
                <div className="lg:col-span-2">
                    {activeQuestionId ? (
                        (() => {
                            const question = formData.questions.find((q: Question) => q.id === activeQuestionId);
                            if (!question) return null;
                            return (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Nội dung câu hỏi</CardTitle>
                                        <CardDescription>
                                            Chỉnh sửa nội dung và đáp án cho câu hỏi này.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <Tabs
                                            value={question.type}
                                            onValueChange={(val) => updateQuestion(question.id, 'type', val)}
                                            className="w-full"
                                        >
                                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                                <TabsTrigger value="multiple-choice">Trắc nghiệm</TabsTrigger>
                                                <TabsTrigger value="essay">Tự luận</TabsTrigger>
                                            </TabsList>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Câu hỏi</Label>
                                                    <Textarea
                                                        placeholder="Nhập nội dung câu hỏi..."
                                                        className="min-h-[100px]"
                                                        value={question.text}
                                                        onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                                                    />
                                                </div>

                                                <TabsContent value="multiple-choice" className="space-y-4 mt-0">
                                                    <Separator />
                                                    <Label>Các lựa chọn đáp án</Label>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        {question.options.map((opt: any) => (
                                                            <div key={opt.id} className="flex items-start gap-3">
                                                                <div
                                                                    className={`flex-none w-8 h-8 rounded-full flex items-center justify-center font-bold border cursor-pointer transition-colors ${question.correctOptionId === opt.id
                                                                            ? 'bg-green-100 text-green-600 border-green-200'
                                                                            : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/80'
                                                                        }`}
                                                                    onClick={() => updateQuestion(question.id, 'correctOptionId', opt.id)}
                                                                    title="Đặt làm đáp án đúng"
                                                                >
                                                                    {opt.id}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <Input
                                                                        value={opt.text}
                                                                        onChange={(e) => updateOption(question.id, opt.id, e.target.value)}
                                                                        placeholder={`Nhập đáp án ${opt.id}...`}
                                                                        className={question.correctOptionId === opt.id ? 'border-green-200 bg-green-50' : ''}
                                                                    />
                                                                </div>
                                                                {question.correctOptionId === opt.id && (
                                                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-2.5" />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="essay" className="space-y-4 mt-0">
                                                    <Separator />
                                                    <div className="space-y-2">
                                                        <Label>Đáp án mẫu (Gợi ý chấm điểm)</Label>
                                                        <Textarea
                                                            placeholder="Nhập đáp án mẫu hoặc các ý chính cần có..."
                                                            className="min-h-[150px]"
                                                            value={question.sampleAnswer || ''}
                                                            onChange={(e) => updateQuestion(question.id, 'sampleAnswer', e.target.value)}
                                                        />
                                                    </div>
                                                </TabsContent>
                                            </div>
                                        </Tabs>

                                        <Separator className="my-6" />

                                        <div className="space-y-2">
                                            <Label>Điểm số</Label>
                                            <Input
                                                type="number"
                                                value={question.points}
                                                onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                                                className="w-32"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })()
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl bg-muted/20">
                            <FileQuestion className="h-12 w-12 mb-4 opacity-20" />
                            <p>Chọn một câu hỏi để chỉnh sửa hoặc thêm mới</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminExamEditor;
