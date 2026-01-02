import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const awards = [
    {
        title: "Nền tảng giáo dục tốt nhất 2024",
        description: "Được bình chọn bởi Hiệp hội EdTech Việt Nam",
        icon: Award,
        image: "/images/award_1.png",
    },
    {
        title: "Chất lượng giảng dạy xuất sắc",
        description: "Giải thưởng uy tín công nhận phương pháp dạy hiệu quả",
        icon: Star,
        image: "/images/award_2.png",
    },
    {
        title: "Top 10 Startup EdTech",
        description: "Vinh danh những đóng góp đổi mới sáng tạo trong giáo dục",
        icon: Trophy,
        image: "/images/award_3.png",
    },
];

const AwardsSection = () => {
    return (
        <section className="py-20 md:py-32 bg-background border-t border-border">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <div className="space-y-6 animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                            <Trophy className="h-4 w-4" />
                            Thành tựu nổi bật
                        </div>

                        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                            Sự công nhận cho <br />
                            <span className="text-primary">Chất lượng đào tạo</span>
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Quỳnh BOKI tự hào nhận được nhiều giải thưởng uy tín trong lĩnh vực giáo dục.
                            Đây là minh chứng cho nỗ lực không ngừng nghỉ trong việc mang đến chương trình
                            học chất lượng nhất cho học viên.
                        </p>

                        <ul className="space-y-4 pt-4">
                            {awards.map((award, index) => (
                                <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="h-10 w-10 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0 text-primary-foreground">
                                        <award.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{award.title}</h4>
                                        <p className="text-sm text-muted-foreground">{award.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Carousel */}
                    <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl blur-3xl -z-10" />

                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                }),
                            ]}
                            className="w-full"
                        >
                            <CarouselContent>
                                {awards.map((award, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card className="overflow-hidden border-none shadow-2xl rounded-2xl">
                                                <CardContent className="flex aspect-[4/3] items-center justify-center p-0 relative">
                                                    <img
                                                        src={award.image}
                                                        alt={award.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                                                        <h3 className="text-white text-xl font-bold">{award.title}</h3>
                                                        <p className="text-white/80 text-sm">{award.description}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
