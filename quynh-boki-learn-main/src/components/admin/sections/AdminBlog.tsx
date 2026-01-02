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
import { CheckCircle, Edit, Trash2 } from 'lucide-react';
import BlogFormDialog, { BlogPostData } from '@/components/admin/BlogFormDialog';

const demoBlogPosts: BlogPostData[] = [
    {
        id: 'blog-1',
        title: 'Bí quyết đậu Boki Level 3 ngay lần thi đầu tiên',
        excerpt: 'Chia sẻ kinh nghiệm và phương pháp học tập hiệu quả từ các học viên xuất sắc.',
        content: 'Nội dung chi tiết bài viết...',
        category: 'Kinh nghiệm',
        author: 'Quỳnh BOKI',
        imageUrl: '',
        published: true,
        createdAt: '10/12/2024'
    },
    {
        id: 'blog-2',
        title: 'Tổng quan về kế toán Nhật Bản - Nissho Boki',
        excerpt: 'Tìm hiểu về hệ thống kế toán chuẩn Nhật và tầm quan trọng của chứng chỉ Boki.',
        content: 'Nội dung chi tiết bài viết...',
        category: 'Kiến thức',
        author: 'Quỳnh BOKI',
        imageUrl: '',
        published: true,
        createdAt: '08/12/2024'
    },
];

const AdminBlog = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPostData[]>(demoBlogPosts);
    const [blogDialogOpen, setBlogDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);

    const handleAddBlogPost = () => {
        setEditingPost(null);
        setBlogDialogOpen(true);
    };

    const handleEditBlogPost = (post: BlogPostData) => {
        setEditingPost(post);
        setBlogDialogOpen(true);
    };

    const handleSaveBlogPost = (postData: BlogPostData) => {
        if (editingPost) {
            setBlogPosts(prev => prev.map(p => p.id === postData.id ? postData : p));
        } else {
            setBlogPosts(prev => [...prev, postData]);
        }
    };

    const handleDeleteBlogPost = (postId: string) => {
        setBlogPosts(prev => prev.filter(p => p.id !== postId));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Quản lý Blog</h2>
                <Button size="sm" onClick={handleAddBlogPost}>
                    + Thêm bài viết
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tiêu đề</TableHead>
                            <TableHead>Danh mục</TableHead>
                            <TableHead>Tác giả</TableHead>
                            <TableHead>Ngày tạo</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium max-w-[200px] truncate">{post.title}</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                        {post.category}
                                    </span>
                                </TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>{post.createdAt}</TableCell>
                                <TableCell>
                                    {post.published ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                                            <CheckCircle className="h-3 w-3" />
                                            Đã xuất bản
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium">
                                            Bản nháp
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditBlogPost(post)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteBlogPost(post.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <BlogFormDialog
                open={blogDialogOpen}
                onOpenChange={setBlogDialogOpen}
                post={editingPost}
                onSave={handleSaveBlogPost}
            />
        </div>
    );
};

export default AdminBlog;
