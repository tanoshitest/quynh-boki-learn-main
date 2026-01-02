import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
}

interface BlogFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPostData | null;
  onSave: (post: BlogPostData) => void;
}

const categories = [
  'Kinh nghiệm',
  'Kiến thức',
  'Nghề nghiệp',
  'Tin tức',
  'Hướng dẫn',
];

const BlogFormDialog = ({ open, onOpenChange, post, onSave }: BlogFormDialogProps) => {
  const [formData, setFormData] = useState<BlogPostData>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    category: 'Kiến thức',
    author: 'Quỳnh BOKI',
    imageUrl: '',
    published: false,
    createdAt: new Date().toLocaleDateString('vi-VN'),
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    } else {
      setFormData({
        id: `blog-${Date.now()}`,
        title: '',
        excerpt: '',
        content: '',
        category: 'Kiến thức',
        author: 'Quỳnh BOKI',
        imageUrl: '',
        published: false,
        createdAt: new Date().toLocaleDateString('vi-VN'),
      });
    }
  }, [post, open]);

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề bài viết</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Tác giả</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Tên tác giả"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Mô tả ngắn</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Nhập mô tả ngắn cho bài viết..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Nội dung bài viết</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Nhập nội dung chi tiết bài viết..."
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL hình ảnh (tùy chọn)</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="published">Xuất bản</Label>
              <p className="text-sm text-muted-foreground">
                Bài viết sẽ hiển thị trên trang Blog
              </p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={!formData.title.trim()}>
            {post ? 'Cập nhật' : 'Thêm bài viết'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogFormDialog;
