import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CheckCircle, Eye, Edit, Download } from 'lucide-react';
import StudentDetailDialog, { StudentData } from '@/components/admin/StudentDetailDialog';

const demoStudents = [
    { id: '2', name: 'Nguyễn Văn A', email: 'hocvien1@gmail.com', joinedAt: '2024-01-15', status: 'active' },
    { id: '3', name: 'Trần Thị B', email: 'hocvien2@gmail.com', joinedAt: '2024-02-20', status: 'active' },
    { id: '4', name: 'Lê Văn C', email: 'hocvien3@gmail.com', joinedAt: '2024-03-10', status: 'pending' },
];

const AdminStudents = () => {
    const [studentDialogOpen, setStudentDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

    const handleViewStudent = (student: StudentData) => {
        setSelectedStudent(student);
        setStudentDialogOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Danh sách học viên</h2>
                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Xuất CSV
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Họ tên</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ngày tham gia</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {demoStudents.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.joinedAt}</TableCell>
                                <TableCell>
                                    {student.status === 'active' ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                                            <CheckCircle className="h-3 w-3" />
                                            Hoạt động
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium">
                                            Chờ xác nhận
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleViewStudent(student)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <StudentDetailDialog
                open={studentDialogOpen}
                onOpenChange={setStudentDialogOpen}
                student={selectedStudent}
            />
        </div>
    );
};

export default AdminStudents;
