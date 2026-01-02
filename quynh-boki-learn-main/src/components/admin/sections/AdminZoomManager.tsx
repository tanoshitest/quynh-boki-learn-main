import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, FileText, Users, PlayCircle, Download, Calendar, X } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Mock Data
const mockRegistrations = [
    { id: 1, name: "Nguyễn Văn A", email: "a.nguyen@example.com", course: "N3 Cấp tốc", date: "2024-01-15", status: "Active" },
    { id: 2, name: "Trần Thị B", email: "b.tran@example.com", course: "N2 Full", date: "2024-01-16", status: "Active" },
    { id: 3, name: "Lê Văn C", email: "c.le@example.com", course: "Kaiwa N4", date: "2024-01-18", status: "Inactive" },
    { id: 4, name: "Phạm Thị D", email: "d.pham@example.com", course: "N1 Vip", date: "2024-01-20", status: "Active" },
    { id: 5, name: "Hoàng Văn E", email: "e.hoang@example.com", course: "N3 Cấp tốc", date: "2024-01-22", status: "Active" },
];

const mockRecords = [
    { id: 1, title: "Buổi 1: Ngữ pháp N3 - Bài 1", date: "2024-01-10", duration: "1h 30m", url: "#", views: 45 },
    { id: 2, title: "Buổi 2: Luyện nghe N2 - Chủ đề 1", date: "2024-01-12", duration: "1h 45m", url: "#", views: 32 },
    { id: 3, title: "Buổi 3: Kanji N4 - Phần 1", date: "2024-01-15", duration: "1h 15m", url: "#", views: 28 },
    { id: 4, title: "Buổi 4: Giải đề N3 - Số 1", date: "2024-01-18", duration: "2h 00m", url: "#", views: 50 },
    { id: 5, title: "Buổi 5: Kaiwa Công sở - Bài 1", date: "2024-01-20", duration: "1h 30m", url: "#", views: 15 },
];

const mockRecaps = [
    { id: 1, title: "Tổng hợp ngữ pháp Tuần 1", date: "2024-01-14", author: "Admin", downloads: 120 },
    { id: 2, title: "Từ vựng chuyên ngành IT - Phần 1", date: "2024-01-16", author: "Admin", downloads: 85 },
    { id: 3, title: "Tips làm bài đọc hiểu N2", date: "2024-01-19", author: "Admin", downloads: 200 },
    { id: 4, title: "Mẫu câu giao tiếp thông dụng", date: "2024-01-21", author: "Admin", downloads: 150 },
    { id: 5, title: "Tổng hợp Kanji N3 thường gặp", date: "2024-01-23", author: "Admin", downloads: 180 },
];

const mockExercises = [
    { id: 1, title: "Bài tập về nhà Buổi 1", deadline: "2024-01-17", submitted: 45, total: 50, status: "Open" },
    { id: 2, title: "Quiz kiểm tra từ vựng", deadline: "2024-01-19", submitted: 30, total: 50, status: "Open" },
    { id: 3, title: "Bài viết chủ đề Gia đình", deadline: "2024-01-22", submitted: 48, total: 50, status: "Closed" },
    { id: 4, title: "Luyện dịch Việt - Nhật", deadline: "2024-01-25", submitted: 10, total: 50, status: "Open" },
    { id: 5, title: "Kiểm tra giữa khóa", deadline: "2024-01-30", submitted: 0, total: 50, status: "Scheduled" },
];

const AdminZoomManager = () => {
    const [dateFilter, setDateFilter] = useState('');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleCreateRoom = () => {
        setIsCreateDialogOpen(false);
        toast({
            title: "Thành công",
            description: "Đã tạo phòng Zoom mới thành công!",
            variant: "default",
        });
    };

    const filterByDate = (items: any[]) => {
        if (!dateFilter) return items;
        return items.filter(item => {
            // Check both 'date' and 'deadline' fields
            const itemDate = item.date || item.deadline;
            return itemDate === dateFilter;
        });
    };

    const filteredRegistrations = filterByDate(mockRegistrations);
    const filteredRecords = filterByDate(mockRecords);
    const filteredRecaps = filterByDate(mockRecaps);
    const filteredExercises = filterByDate(mockExercises);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Quản lý Zoom</h1>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-[180px]"
                        />
                        {dateFilter && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDateFilter('')}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Video className="mr-2 h-4 w-4" />
                                Tạo phòng Zoom mới
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Tạo phòng Zoom mới</DialogTitle>
                                <DialogDescription>
                                    Cấu hình thông tin phòng học trực tuyến mới tại đây.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Tên phòng
                                    </Label>
                                    <Input id="name" defaultValue="Lớp N3 Cấp tốc - Buổi 12" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="duration" className="text-right">
                                        Thời lượng
                                    </Label>
                                    <Input id="duration" defaultValue="90 phút" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleCreateRoom}>OK</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Tabs defaultValue="registrations" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="registrations">Danh sách đăng ký</TabsTrigger>
                    <TabsTrigger value="records">Record</TabsTrigger>
                    <TabsTrigger value="recaps">Recap</TabsTrigger>
                    <TabsTrigger value="exercises">Bài tập</TabsTrigger>
                </TabsList>

                {/* Tab 1: Danh sách đăng ký */}
                <TabsContent value="registrations">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Danh sách học viên đăng ký
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên học viên</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Khóa học</TableHead>
                                        <TableHead>Ngày đăng ký</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRegistrations.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                Không tìm thấy dữ liệu đăng ký cho ngày này
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRegistrations.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell>{item.course}</TableCell>
                                                <TableCell>{item.date}</TableCell>
                                                <TableCell>
                                                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                                                        {item.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 2: Records */}
                <TabsContent value="records">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlayCircle className="h-5 w-5" />
                                Danh sách bản ghi (Records)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tiêu đề</TableHead>
                                        <TableHead>Ngày ghi</TableHead>
                                        <TableHead>Thời lượng</TableHead>
                                        <TableHead>Lượt xem</TableHead>
                                        <TableHead className="text-right">Hành động</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRecords.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                Không tìm thấy bản ghi nào cho ngày này
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRecords.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.date}</TableCell>
                                                <TableCell>{item.duration}</TableCell>
                                                <TableCell>{item.views}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm">Xem lại</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 3: Recaps */}
                <TabsContent value="recaps">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Tổng hợp nội dung (Recaps)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tiêu đề</TableHead>
                                        <TableHead>Ngày đăng</TableHead>
                                        <TableHead>Người đăng</TableHead>
                                        <TableHead>Lượt tải</TableHead>
                                        <TableHead className="text-right">Hành động</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRecaps.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                Không tìm thấy recap nào cho ngày này
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRecaps.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.date}</TableCell>
                                                <TableCell>{item.author}</TableCell>
                                                <TableCell>{item.downloads}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm">
                                                        <Download className="mr-2 h-3 w-3" /> Tải về
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 4: Exercises */}
                <TabsContent value="exercises">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Quản lý bài tập
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên bài tập</TableHead>
                                        <TableHead>Hạn nộp</TableHead>
                                        <TableHead>Đã nộp</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead className="text-right">Hành động</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredExercises.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                Không tìm thấy bài tập nào có hạn nộp vào ngày này
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredExercises.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.deadline}</TableCell>
                                                <TableCell>{item.submitted}/{item.total}</TableCell>
                                                <TableCell>
                                                    <Badge variant={item.status === 'Open' ? 'default' : item.status === 'Closed' ? 'secondary' : 'outline'}>
                                                        {item.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">Chi tiết</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminZoomManager;
