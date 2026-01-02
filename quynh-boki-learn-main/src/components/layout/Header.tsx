import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, User, LogOut, Menu, X, Shield, GraduationCap, Users } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout, loginAsRole } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginAsRole = (role: 'admin' | 'student') => {
    loginAsRole(role);
    navigate('/dashboard');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero shadow-soft group-hover:shadow-glow transition-all duration-300">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Quỳnh <span className="text-primary">BOKI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Trang chủ
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/feedback"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Học viên Feedback
          </Link>
          <Link
            to="/courses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Khóa học và tài liệu
          </Link>
          <Link
            to="/community"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cộng đồng
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Kiến thức
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Liên hệ
          </Link>
          {user && user.role === 'student' && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Dashboard Học viên
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard Admin
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{user.name}</span>
              {user.role === 'admin' && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">Đăng nhập</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => handleLoginAsRole('admin')}
                  className="cursor-pointer"
                >
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  <div>
                    <p className="font-medium">Đăng nhập Admin</p>
                    <p className="text-xs text-muted-foreground">Quản lý khóa học & học viên</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLoginAsRole('student')}
                  className="cursor-pointer"
                >
                  <GraduationCap className="h-4 w-4 mr-2 text-green-600" />
                  <div>
                    <p className="font-medium">Đăng nhập Học viên</p>
                    <p className="text-xs text-muted-foreground">Xem khóa học & làm bài thi</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-3">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Về chúng tôi
            </Link>
            <Link
              to="/feedback"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Học viên Feedback
            </Link>
            <Link
              to="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Khóa học và tài liệu
            </Link>
            <Link
              to="/community"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cộng đồng
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kiến thức
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên hệ
            </Link>
            {user && user.role === 'student' && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard Học viên
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard Admin
              </Link>
            )}
            <div className="border-t border-border pt-3 mt-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleLoginAsRole('admin')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Đăng nhập Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleLoginAsRole('student')}
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Đăng nhập Học viên
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
