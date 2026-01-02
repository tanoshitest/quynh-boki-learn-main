import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';

const StudentProfile = () => {
    const { user } = useAuth();

    if (!user) return null;

    // Derived initials
    const initials = user.name
        ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'HV';

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Thông tin học viên</h2>
                <p className="text-muted-foreground">
                    Quản lý thông tin cá nhân và tài khoản của bạn
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                {/* Sidebar Info Card */}
                <Card className="md:col-span-1 h-fit">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{user.email}</p>

                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/50 rounded-lg justify-center">
                                <Shield className="h-4 w-4" />
                                <span className="capitalize">{user.role === 'student' ? 'Học viên' : 'Quản trị viên'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Info Form */}
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Thông tin chi tiết</CardTitle>
                        <CardDescription>
                            Cập nhật thông tin cá nhân của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Họ và tên</Label>
                                <div className="relative">
                                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="name" defaultValue={user.name} className="pl-9" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" defaultValue={user.email} className="pl-9" disabled />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <div className="relative">
                                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="phone" placeholder="Thêm số điện thoại..." className="pl-9" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dob">Ngày sinh</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="dob" type="date" className="pl-9" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <div className="relative">
                                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="address" placeholder="Thêm địa chỉ..." className="pl-9" />
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-end gap-2">
                            <Button variant="outline">Hủy bỏ</Button>
                            <Button>Lưu thay đổi</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentProfile;
