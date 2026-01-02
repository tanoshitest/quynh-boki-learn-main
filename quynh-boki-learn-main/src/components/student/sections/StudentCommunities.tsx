import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ExternalLink, Globe, Lock, CheckCircle2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { demoCommunities } from '@/data/communities';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const StudentCommunities = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const joinedCommunities = demoCommunities.filter(c => c.isJoined);
    const allCommunities = demoCommunities.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCommunityCard = (community: typeof demoCommunities[0], isJoinedView: boolean = false) => (
        <Card key={community.id} className="hover:shadow-md transition-all group">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {community.isPrivate ? (
                            <Lock className="h-5 w-5 text-primary" />
                        ) : (
                            <Globe className="h-5 w-5 text-primary" />
                        )}
                    </div>
                    {community.isJoined ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Đã tham gia
                        </Badge>
                    ) : (
                        <Badge variant="outline">
                            {community.isPrivate ? 'Riêng tư' : 'Công khai'}
                        </Badge>
                    )}
                </div>
                <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                    {community.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                    {community.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <Users className="h-4 w-4 mr-1" />
                    {community.memberCount.toLocaleString()} thành viên
                </div>
                <Button className="w-full" variant={community.isJoined ? "secondary" : "default"} asChild>
                    <Link to={`/community?id=${community.id}`}>
                        {community.isJoined ? 'Truy cập cộng đồng' : 'Xem cộng đồng'}
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Cộng đồng học tập</h2>
                <p className="text-muted-foreground">
                    Tham gia thảo luận, chia sẻ kiến thức cùng các học viên khác
                </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <TabsList>
                        <TabsTrigger value="all">Tất cả cộng đồng</TabsTrigger>
                        <TabsTrigger value="my-communities">Cộng đồng của tôi</TabsTrigger>
                    </TabsList>

                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Tìm kiếm cộng đồng..."
                            className="pl-9 w-full sm:w-[250px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="all" className="space-y-6">
                    {allCommunities.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allCommunities.map(c => renderCommunityCard(c))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <p className="text-muted-foreground">Không tìm thấy cộng đồng nào phù hợp</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="my-communities">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {joinedCommunities.map(c => renderCommunityCard(c, true))}

                        {joinedCommunities.length === 0 && (
                            <div className="col-span-full text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                                <h3 className="font-semibold text-lg text-foreground">Bạn chưa tham gia cộng đồng nào</h3>
                                <p className="text-muted-foreground mt-1 mb-6">Hãy khám phá các cộng đồng để cùng học tập nhé!</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default StudentCommunities;
