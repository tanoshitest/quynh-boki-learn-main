import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface CommunityData {
    id: string;
    name: string;
    description: string;
    isPrivate: boolean;
    memberCount: number;
    image: string;
    status: 'active' | 'inactive';
}

interface CommunityFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    community: CommunityData | null;
    onSave: (data: CommunityData) => void;
}

const CommunityFormDialog = ({
    open,
    onOpenChange,
    community,
    onSave,
}: CommunityFormDialogProps) => {
    const [formData, setFormData] = useState<Partial<CommunityData>>({
        name: '',
        description: '',
        isPrivate: false,
        image: '',
        status: 'active',
    });

    useEffect(() => {
        if (community) {
            setFormData(community);
        } else {
            setFormData({
                name: '',
                description: '',
                isPrivate: false,
                image: '',
                status: 'active',
            });
        }
    }, [community, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: community?.id || Date.now().toString(),
            name: formData.name || '',
            description: formData.description || '',
            isPrivate: formData.isPrivate || false,
            memberCount: community?.memberCount || 0,
            image: formData.image || '',
            status: formData.status as 'active' | 'inactive' || 'active',
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {community ? 'Chỉnh sửa cộng đồng' : 'Tạo cộng đồng mới'}
                    </DialogTitle>
                    <DialogDescription>
                        {community
                            ? 'Cập nhật thông tin cho cộng đồng này.'
                            : 'Điền thông tin để tạo nội dung mới.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Tên cộng đồng</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="VD: Lớp Boki 3 - K54"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Mô tả ngắn về cộng đồng..."
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Loại nhóm</Label>
                            <Select
                                value={formData.isPrivate ? 'private' : 'public'}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, isPrivate: value === 'private' })
                                }
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Chọn loại" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Công khai</SelectItem>
                                    <SelectItem value="private">Riêng tư</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Trạng thái</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, status: value as 'active' | 'inactive' })
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Chọn trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Hoạt động</SelectItem>
                                    <SelectItem value="inactive">Đã đóng</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Hủy
                        </Button>
                        <Button type="submit">
                            {community ? 'Lưu thay đổi' : 'Tạo mới'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CommunityFormDialog;
