import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Users,
  CreditCard,
  FileText,
  MessageCircle,
  PenLine,
  LogOut,
  Video,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const AdminSidebar = ({ activeView, onViewChange }: AdminSidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      id: 'purchases',
      label: 'Quản lý đơn hàng',
      icon: CreditCard,
    },
    {
      id: 'students',
      label: 'Quản lý học viên',
      icon: Users,
    },
    {
      id: 'courses',
      label: 'Khoá học video',
      icon: BookOpen,
    },
    {
      id: 'zoom',
      label: 'Khoá học Zoom',
      icon: Video,
    },
    {
      id: 'exams',
      label: 'Quản lý đề thi',
      icon: FileText,
    },
    {
      id: 'community',
      label: 'Quản lý cộng đồng',
      icon: MessageCircle,
    },
    {
      id: 'blog',
      label: 'Quản lý Blog',
      icon: PenLine,
    },
  ];

  return (
    <div className="w-64 bg-card border-r h-[calc(100vh-65px)] border-border flex flex-col sticky top-[65px] left-0">
      <div className="p-4 overflow-y-auto">
        <h2 className="font-semibold text-lg px-4 mb-2">Menu quản trị</h2>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                activeView === item.id && 'font-medium'
              )}
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
