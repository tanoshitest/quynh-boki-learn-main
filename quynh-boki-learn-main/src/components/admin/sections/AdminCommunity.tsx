import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CheckCircle, Edit, Eye, Lock, MessageCircle, Plus, Trash2, Users } from 'lucide-react';
import CommunityFormDialog, { CommunityData } from '@/components/admin/CommunityFormDialog';
import { toast } from 'sonner';

const demoCommunities: CommunityData[] = [
    {
        id: 'public',
        name: 'Cộng đồng Quỳnh BOKI',
        description: 'Cộng đồng chung cho tất cả học viên',
        memberCount: 1250,
        isPrivate: false,
        status: 'active',
        image: '',
    },
    {
        id: 'boki1-class',
        name: 'Lớp Boki 1 - Khóa T12/2024',
        description: 'Nhóm riêng cho học viên lớp Boki 1',
        memberCount: 35,
        isPrivate: true,
        status: 'active',
        image: '',
    },
    {
        id: 'boki3-class',
        name: 'Lớp Boki 3 - Khóa T11/2024',
        description: 'Nhóm riêng cho học viên lớp Boki 3',
        memberCount: 20,
        isPrivate: true,
        status: 'active',
        image: '',
    },
];

const AdminCommunity = () => {
    const navigate = useNavigate();
    const [communities, setCommunities] = useState<CommunityData[]>(demoCommunities);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCommunity, setEditingCommunity] = useState<CommunityData | null>(null);

    const handleViewCommunity = (id: string) => {
        navigate(`/community?id=${id}`);
    };

    const handleAddCommunity = () => {
        setEditingCommunity(null);
        setDialogOpen(true);
    };

    const handleEditCommunity = (community: CommunityData) => {
        setEditingCommunity(community);
        setDialogOpen(true);
    };

    const handleSaveCommunity = (data: CommunityData) => {
        if (editingCommunity) {
            setCommunities(prev => prev.map(c => c.id === data.id ? data : c));
            toast.success('Đã cập nhật cộng đồng thành công');
        } else {
            setCommunities(prev => [data, ...prev]);
            toast.success('Đã tạo cộng đồng mới thành công');
        }
    };

    const handleDeleteCommunity = (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa cộng đồng này?')) {
            setCommunities(prev => prev.filter(c => c.id !== id));
            toast.success('Đã xóa cộng đồng');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Quản lý cộng đồng</h2>
                <Button size="sm" onClick={handleAddCommunity}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo nhóm mới
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên nhóm</TableHead>
                            <TableHead>Loại nhóm</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead>Thành viên</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {communities.map((community) => (
                            <TableRow key={community.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="h-4 w-4 text-primary" />
                                        {community.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {community.isPrivate ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                            <Lock className="h-3 w-3" />
                                            Riêng tư
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                            <Users className="h-3 w-3" />
                                            Công khai
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate text-muted-foreground">
                                    {community.description}
                                </TableCell>
                                <TableCell>{community.memberCount}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${community.status === 'active'
                                        ? 'bg-green-500/10 text-green-600'
                                        : 'bg-muted text-muted-foreground'
                                        }`}>
                                        <CheckCircle className="h-3 w-3" />
                                        {community.status === 'active' ? 'Hoạt động' : 'Đã đóng'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleViewCommunity(community.id)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleEditCommunity(community)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCommunity(community.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <CommunityFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                community={editingCommunity}
                onSave={handleSaveCommunity}
            />
        </div>
    );
};

export default AdminCommunity;
