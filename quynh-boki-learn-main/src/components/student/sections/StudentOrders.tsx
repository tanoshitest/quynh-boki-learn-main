import { Card, CardContent } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const StudentOrders = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Đơn hàng của tôi</h2>
                <p className="text-muted-foreground">
                    Lịch sử giao dịch và trạng thái đơn hàng
                </p>
            </div>

            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Chưa có đơn hàng nào</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Bạn chưa mua khóa học nào. Hãy khám phá các khóa học của chúng tôi và đăng ký ngay.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentOrders;
