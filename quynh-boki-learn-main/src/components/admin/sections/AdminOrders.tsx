import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CheckCircle, Download, XCircle } from 'lucide-react';
import { formatCurrency } from '@/data/courses';

const demoPurchases = [
    { id: '1', studentName: 'Nguyễn Văn A', courseName: 'Boki 1', amount: 1500000, status: 'approved', date: '2024-01-15' },
    { id: '2', studentName: 'Trần Thị B', courseName: 'Boki 1', amount: 1500000, status: 'approved', date: '2024-02-20' },
    { id: '3', studentName: 'Lê Văn C', courseName: 'Boki 1', amount: 1500000, status: 'pending', date: '2024-03-10' },
];

const AdminOrders = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Danh sách thanh toán</h2>
                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Xuất báo cáo
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Học viên</TableHead>
                            <TableHead>Khóa học</TableHead>
                            <TableHead>Số tiền</TableHead>
                            <TableHead>Ngày</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {demoPurchases.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell className="font-medium">{purchase.studentName}</TableCell>
                                <TableCell>{purchase.courseName}</TableCell>
                                <TableCell>{formatCurrency(purchase.amount)}</TableCell>
                                <TableCell>{purchase.date}</TableCell>
                                <TableCell>
                                    {purchase.status === 'approved' ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                                            <CheckCircle className="h-3 w-3" />
                                            Đã duyệt
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium">
                                            Chờ duyệt
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {purchase.status === 'pending' && (
                                        <div className="flex justify-end gap-2">
                                            <Button variant="default" size="sm">
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Duyệt
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminOrders;
