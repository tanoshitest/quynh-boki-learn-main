import { useState, useEffect } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Users,
  Globe,
  Lock,
  Heart,
  MessageCircle,
  Send,
  Image as ImageIcon,
  MoreHorizontal,
  ThumbsUp,
  Share2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import { Community as ICommunity, Post, Comment, demoCommunities } from '@/data/communities';

const Community = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunity | null>(null);
  const [communities, setCommunities] = useState<ICommunity[]>(demoCommunities);
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const communityId = searchParams.get('id');
    if (communityId) {
      const foundCommunity = communities.find(c => c.id === communityId);
      if (foundCommunity) {
        setSelectedCommunity(foundCommunity);
      }
    }
  }, [searchParams, communities]);

  // Allow public access, so we remove the immediate redirect
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const handleSelectCommunity = (community: ICommunity) => {
    if (community.isPrivate && !user) {
      toast.error("Vui lòng đăng nhập để tham gia nhóm riêng tư này");
      return;
    }
    setSelectedCommunity(community);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !selectedCommunity) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: '',
        initials: user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      },
      content: newPostContent,
      createdAt: 'Vừa xong',
      likes: 0,
      isLiked: false,
      comments: [],
    };

    setCommunities(prev => prev.map(c =>
      c.id === selectedCommunity.id
        ? { ...c, posts: [newPost, ...c.posts] }
        : c
    ));
    setSelectedCommunity(prev => prev ? { ...prev, posts: [newPost, ...prev.posts] } : null);
    setNewPostContent('');
    toast.success('Đã đăng bài thành công!');
  };

  const handleLikePost = (postId: string) => {
    if (!selectedCommunity) return;

    const updatePosts = (posts: Post[]) =>
      posts.map(p =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      );

    setCommunities(prev => prev.map(c =>
      c.id === selectedCommunity.id
        ? { ...c, posts: updatePosts(c.posts) }
        : c
    ));
    setSelectedCommunity(prev => prev ? { ...prev, posts: updatePosts(prev.posts) } : null);
  };

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]?.trim() || !selectedCommunity) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        avatar: '',
        initials: user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      },
      content: newComment[postId],
      createdAt: 'Vừa xong',
      likes: 0,
    };

    const updatePosts = (posts: Post[]) =>
      posts.map(p =>
        p.id === postId
          ? { ...p, comments: [...p.comments, comment] }
          : p
      );

    setCommunities(prev => prev.map(c =>
      c.id === selectedCommunity.id
        ? { ...c, posts: updatePosts(c.posts) }
        : c
    ));
    setSelectedCommunity(prev => prev ? { ...prev, posts: updatePosts(prev.posts) } : null);
    setNewComment(prev => ({ ...prev, [postId]: '' }));
    toast.success('Đã thêm bình luận!');
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <Layout>
      <div className="container py-8">
        {!selectedCommunity ? (
          <>
            {/* Community List */}
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Cộng đồng
              </h1>
              <p className="text-muted-foreground">
                Kết nối, học hỏi và chia sẻ cùng các học viên khác
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <Card
                  key={community.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                  onClick={() => handleSelectCommunity(community)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                          {community.isPrivate ? (
                            <Lock className="h-6 w-6 text-primary-foreground" />
                          ) : (
                            <Globe className="h-6 w-6 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <Badge variant={community.isPrivate ? 'secondary' : 'default'} className="mt-1">
                            {community.isPrivate ? 'Riêng tư' : 'Công khai'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{community.memberCount} thành viên</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Community Feed */}
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setSelectedCommunity(null)} className="mb-4">
                ← Quay lại danh sách
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  {selectedCommunity.isPrivate ? (
                    <Lock className="h-8 w-8 text-primary-foreground" />
                  ) : (
                    <Globe className="h-8 w-8 text-primary-foreground" />
                  )}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {selectedCommunity.name}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {selectedCommunity.memberCount} thành viên
                    <Badge variant={selectedCommunity.isPrivate ? 'secondary' : 'default'} className="ml-2">
                      {selectedCommunity.isPrivate ? 'Riêng tư' : 'Công khai'}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                {user ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Textarea
                            placeholder="Bạn đang nghĩ gì?"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            className="resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Ảnh
                            </Button>
                            <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                              <Send className="h-4 w-4 mr-2" />
                              Đăng
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-muted/50">
                    <CardContent className="py-6 text-center">
                      <p className="text-muted-foreground mb-4">Đăng nhập để tham gia thảo luận cùng cộng đồng</p>
                      <Button asChild>
                        <Link to="/login">Đăng nhập ngay</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Posts */}
                {selectedCommunity.posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-secondary">
                              {post.author.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Post Content */}
                      <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{post.likes} lượt thích</span>
                        <span>{post.comments.length} bình luận</span>
                      </div>

                      <Separator className="mb-3" />

                      {/* Post Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex-1 ${post.isLiked ? 'text-primary' : ''}`}
                          onClick={() => {
                            if (!user) {
                              toast.error("Vui lòng đăng nhập để thích bài viết");
                              return;
                            }
                            handleLikePost(post.id);
                          }}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                          Thích
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Bình luận
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          Chia sẻ
                        </Button>
                      </div>

                      {/* Comments Section */}
                      {(showComments[post.id] || post.comments.length > 0) && (
                        <div className="mt-4 space-y-4">
                          <Separator />

                          {/* Existing Comments */}
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-muted">
                                  {comment.author.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-muted rounded-xl px-4 py-2">
                                <p className="font-medium text-sm">{comment.author.name}</p>
                                <p className="text-sm text-foreground">{comment.content}</p>
                                <p className="text-xs text-muted-foreground mt-1">{comment.createdAt}</p>
                              </div>
                            </div>
                          ))}

                          {/* Add Comment */}
                          {user ? (
                            <div className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex gap-2">
                                <Input
                                  placeholder="Viết bình luận..."
                                  value={newComment[post.id] || ''}
                                  onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleAddComment(post.id);
                                    }
                                  }}
                                  className="rounded-full"
                                />
                                <Button
                                  size="icon"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!newComment[post.id]?.trim()}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-2 text-sm text-muted-foreground bg-muted/30 rounded-lg">
                              <Link to="/login" className="text-primary hover:underline font-medium">Đăng nhập</Link> để bình luận
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {selectedCommunity.posts.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Chưa có bài đăng nào. Hãy là người đầu tiên!</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Giới thiệu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedCommunity.description}</p>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {selectedCommunity.isPrivate ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{selectedCommunity.isPrivate ? 'Nhóm riêng tư' : 'Nhóm công khai'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCommunity.memberCount} thành viên</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thành viên nổi bật</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'Quỳnh BOKI', role: 'Admin', initials: 'QB' },
                      { name: 'Nguyễn Văn A', role: 'Thành viên', initials: 'NA' },
                      { name: 'Trần Thị B', role: 'Thành viên', initials: 'TB' },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-secondary">{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Community;
