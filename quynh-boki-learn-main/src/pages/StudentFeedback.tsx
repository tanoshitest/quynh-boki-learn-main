import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

interface Feedback {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
    course?: string;
}

const demoFeedbacks: Feedback[] = [
    {
        id: 1,
        name: "Nguyễn Thị Mai",
        role: "Học viên N3",
        avatar: "",
        content: "Khóa học rất chi tiết, cô Quỳnh giảng dễ hiểu, mình đã đỗ N3 ngay lần thi đầu tiên!",
        rating: 5,
        course: "Luyện thi N3 cấp tốc"
    },
    {
        id: 2,
        name: "Trần Văn Hùng",
        role: "Học viên N2",
        avatar: "",
        content: "Tài liệu phong phú, video chất lượng cao. Hệ thống thi thử rất sát với đề thi thật.",
        rating: 5,
        course: "Combo N2 trọn gói"
    },
    {
        id: 3,
        name: "Lê Thu Hà",
        role: "Người đi làm",
        avatar: "",
        content: "Mình rất bận nhưng vẫn theo kịp bài giảng nhờ lộ trình linh hoạt. Cảm ơn team đã hỗ trợ nhiệt tình.",
        rating: 4,
        course: "Kaiwa Giao tiếp công sở"
    },
    {
        id: 4,
        name: "Phạm Minh Đức",
        role: "Du học sinh",
        avatar: "",
        content: "Nhờ khóa học mà mình tự tin hơn hẳn khi giao tiếp với người Nhật. Rất đáng tiền!",
        rating: 5,
        course: "Tiếng Nhật sơ cấp N5-N4"
    },
    {
        id: 5,
        name: "Ngô Lan Hương",
        role: "Học viên N1",
        avatar: "",
        content: "Kiến thức chuyên sâu, giải thích ngữ pháp cặn kẽ. Rất phù hợp cho những ai muốn chinh phục N1.",
        rating: 5,
        course: "Chinh phục N1"
    },
    {
        id: 6,
        name: "Đỗ Tuấn Anh",
        role: "Kỹ sư cầu nối",
        avatar: "",
        content: "Các bài giảng về IT tiếng Nhật rất thực tế, giúp ích nhiều cho công việc hiện tại của mình.",
        rating: 4,
        course: "Tiếng Nhật chuyên ngành IT"
    },
    {
        id: 7,
        name: "Vũ Thị Tuyết",
        role: "Học viên mới",
        avatar: "",
        content: "Giao diện web đẹp, dễ sử dụng. Mới học được 1 tuần nhưng thấy rất hứng thú.",
        rating: 5,
        course: "Khóa học nhập môn"
    },
    {
        id: 8,
        name: "Hoàng Văn Nam",
        role: "Thực tập sinh",
        avatar: "",
        content: "Nhờ cô Quỳnh mà em đã vượt qua phỏng vấn đi Nhật. Cảm ơn cô và trung tâm nhiều ạ!",
        rating: 5,
        course: "Luyện phỏng vấn đi Nhật"
    },
    {
        id: 9,
        name: "Đặng Thùy Linh",
        role: "Mẹ bỉm sữa",
        avatar: "",
        content: "Tranh thủ lúc con ngủ để học, bài giảng chia nhỏ rất tiện lợi. Đã học xong N4 rồi ạ.",
        rating: 5,
        course: "Combo N5-N4"
    },
    {
        id: 10,
        name: "Bùi Tiến Dũng",
        role: "Sinh viên năm 3",
        avatar: "",
        content: "Giá khóa học hợp lý, chất lượng vượt mong đợi. Sẽ giới thiệu cho bạn bè cùng học.",
        rating: 4,
        course: "Luyện đề N3"
    }
];

const StudentFeedback = () => {
    return (
        <Layout>
            <div className="bg-muted/30 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold mb-4 font-display">Học viên nói gì về chúng tôi</h1>
                        <p className="text-lg text-muted-foreground">
                            Hơn 10,000 học viên đã tin tưởng và thành công cùng Quỳnh BOKI. Đây là những chia sẻ chân thực nhất từ họ.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demoFeedbacks.map((item) => (
                            <Card key={item.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={item.avatar} alt={item.name} />
                                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-lg leading-none mb-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.role}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Quote className="h-8 w-8 text-primary/10 absolute -top-2 -left-2 transform -scale-x-100" />
                                        <p className="text-muted-foreground relative z-10 pl-6 italic">
                                            "{item.content}"
                                        </p>
                                    </div>
                                    {item.course && (
                                        <div className="mt-4 pt-4 border-t border-border/50">
                                            <p className="text-xs text-primary font-medium uppercase tracking-wide">
                                                Đã học: {item.course}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default StudentFeedback;
