import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CheckCircle, Eye, Edit } from 'lucide-react';
import CourseFormDialog, { CourseFormData, LessonFormData } from '@/components/admin/CourseFormDialog';
import { formatCurrency, Course, Lesson } from '@/data/courses';
import { useCourse } from '@/contexts/CourseContext';

const AdminCourses = () => {
    const navigate = useNavigate();
    const { courses, updateCourse, addCourse } = useCourse();
    const [courseDialogOpen, setCourseDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<CourseFormData | null>(null);

    // Map global Course objects to CourseFormData for the UI
    const tableCourses: CourseFormData[] = courses.map(course => ({
        id: String(course.id),
        title: course.title,
        description: course.description,
        price: course.price,
        published: course.isPublished,
        lessonsCount: course.lessons.length,
        lessons: course.lessons.map(lesson => ({
            id: String(lesson.id),
            title: lesson.title,
            videoUrl: lesson.videoUrl,
            pdfUrl: lesson.documents?.[0]?.url || '',
            quizTitle: `Quiz bài ${lesson.id}`
        }))
    }));

    const handleAddCourse = () => {
        setEditingCourse(null);
        setCourseDialogOpen(true);
    };

    const handleEditCourse = (courseData: CourseFormData) => {
        setEditingCourse(courseData);
        setCourseDialogOpen(true);
    };

    const handleSaveCourse = (courseData: CourseFormData) => {
        // Map CourseFormData back to Course object
        // NOTE: New courses will need an ID generated if not present
        const courseId = Number(courseData.id) || Date.now();

        const mappedLessons: Lesson[] = courseData.lessons.map((l, index) => ({
            id: Number(l.id) || (index + 1),
            title: l.title,
            duration: '00:00', // Default or calc
            videoUrl: l.videoUrl,
            exam: { timeLimitMinutes: 60, questions: [] }, // Default exam
            documents: l.pdfUrl ? [{ title: 'Tài liệu bài giảng', url: l.pdfUrl }] : [],
            chapters: []
        }));

        const newCourseData: Course = {
            id: courseId,
            title: courseData.title,
            description: courseData.description,
            price: courseData.price,
            isPublished: courseData.published,
            lessons: mappedLessons,
            // Preserve other fields if editing, or set defaults for new
            category: 'other',
            thumbnail: '📚',
            instructor: 'Admin',
            students: 0,
            rating: 0
        };

        if (editingCourse) {
            // Merge with existing to keep other fields like category/thumbnail if possible
            const existing = courses.find(c => c.id === courseId);
            if (existing) {
                updateCourse({ ...existing, ...newCourseData });
            } else {
                addCourse(newCourseData);
            }
        } else {
            addCourse(newCourseData);
        }
    };

    const handleViewCourse = (course: CourseFormData) => {
        navigate(`/admin/courses/${course.id}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Danh sách khóa học</h2>
                <Button size="sm" onClick={handleAddCourse}>
                    + Thêm khóa học
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên khóa học</TableHead>
                            <TableHead>Số bài học</TableHead>
                            <TableHead>Giá</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>{course.lessons?.length || 0}</TableCell>
                                <TableCell>{formatCurrency(course.price)}</TableCell>
                                <TableCell>
                                    {course.published ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                                            <CheckCircle className="h-3 w-3" />
                                            Đã xuất bản
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium">
                                            Bản nháp
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleViewCourse(course)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleEditCourse(course)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <CourseFormDialog
                open={courseDialogOpen}
                onOpenChange={setCourseDialogOpen}
                course={editingCourse}
                onSave={handleSaveCourse}
            />
        </div>
    );
};

export default AdminCourses;
