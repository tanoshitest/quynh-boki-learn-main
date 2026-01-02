export interface Post {
    id: string;
    author: {
        name: string;
        avatar: string;
        initials: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
    isLiked: boolean;
}

export interface Comment {
    id: string;
    author: {
        name: string;
        avatar: string;
        initials: string;
    };
    content: string;
    createdAt: string;
    likes: number;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    isPrivate: boolean;
    image: string;
    posts: Post[];
    isJoined?: boolean; // Added helper for UI
}

// Demo data
export const demoCommunities: Community[] = [
    {
        id: 'public',
        name: 'Cộng đồng Quỳnh BOKI',
        description: 'Cộng đồng chung cho tất cả học viên và người quan tâm đến kế toán Nhật Bản',
        memberCount: 1250,
        isPrivate: false,
        image: '',
        isJoined: true,
        posts: [
            {
                id: 'p1',
                author: { name: 'Quỳnh BOKI', avatar: '', initials: 'QB' },
                content: '🎉 Chào mừng tất cả các bạn đến với cộng đồng Quỳnh BOKI! Đây là nơi chúng ta cùng nhau học hỏi và chia sẻ kinh nghiệm về kế toán Nhật Bản. Hãy thoải mái đặt câu hỏi và kết nối với nhau nhé!',
                createdAt: '2 giờ trước',
                likes: 45,
                isLiked: false,
                comments: [
                    { id: 'c1', author: { name: 'Nguyễn Văn A', avatar: '', initials: 'NA' }, content: 'Cảm ơn cô Quỳnh! Em rất vui được tham gia!', createdAt: '1 giờ trước', likes: 0 },
                    { id: 'c2', author: { name: 'Trần Thị B', avatar: '', initials: 'TB' }, content: 'Cộng đồng tuyệt vời! 💪', createdAt: '30 phút trước', likes: 0 },
                ],
            },
            {
                id: 'p2',
                author: { name: 'Lê Văn C', avatar: '', initials: 'LC' },
                content: 'Mọi người ơi, có ai biết đề thi Boki 2 năm 2024 có gì mới không ạ? Em đang chuẩn bị thi tháng sau.',
                createdAt: '5 giờ trước',
                likes: 12,
                isLiked: true,
                comments: [
                    { id: 'c3', author: { name: 'Phạm Văn D', avatar: '', initials: 'PD' }, content: 'Năm nay có thêm phần về thuế VAT đấy bạn!', createdAt: '4 giờ trước', likes: 0 },
                ],
            },
        ],
    },
    {
        id: 'boki1-class',
        name: 'Lớp Boki 1 - Khóa T12/2024',
        description: 'Nhóm riêng cho học viên lớp Boki 1 khóa tháng 12/2024',
        memberCount: 35,
        isPrivate: true,
        image: '',
        isJoined: true,
        posts: [
            {
                id: 'p3',
                author: { name: 'Quỳnh BOKI', avatar: '', initials: 'QB' },
                content: '📚 Thông báo: Buổi học tiếp theo sẽ vào thứ 7 tuần này lúc 9h sáng. Các bạn nhớ ôn lại bài về Bút toán kép nhé!',
                createdAt: '1 ngày trước',
                likes: 28,
                isLiked: false,
                comments: [
                    { id: 'c4', author: { name: 'Hoàng Thị E', avatar: '', initials: 'HE' }, content: 'Dạ em ghi nhận ạ!', createdAt: '23 giờ trước', likes: 0 },
                ],
            },
        ],
    },
    {
        id: 'boki3-class',
        name: 'Lớp Boki 3 - Khóa T11/2024',
        description: 'Nhóm riêng cho học viên lớp Boki 3 nâng cao',
        memberCount: 20,
        isPrivate: true,
        image: '',
        isJoined: false,
        posts: [
            {
                id: 'p4',
                author: { name: 'Nguyễn Văn F', avatar: '', initials: 'NF' },
                content: 'Mọi người ơi, phần Báo cáo tài chính hợp nhất khó quá! Ai có tài liệu bổ sung không share mình với 😭',
                createdAt: '3 giờ trước',
                likes: 8,
                isLiked: false,
                comments: [],
            },
        ],
    },
];
