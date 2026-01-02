import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, demoCourse, allCourses as initialCourses } from '@/data/courses';

interface CourseContextType {
    courses: Course[];
    getCourse: (id: number | string) => Course | undefined;
    updateCourse: (updatedCourse: Course) => void;
    addCourse: (newCourse: Course) => void;
    deleteCourse: (id: number | string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
    // Initialize with your mock data
    const [courses, setCourses] = useState<Course[]>([demoCourse, ...initialCourses]);

    const getCourse = (id: number | string) => {
        return courses.find(c => c.id === Number(id));
    };

    const updateCourse = (updatedCourse: Course) => {
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    };

    const addCourse = (newCourse: Course) => {
        setCourses(prev => [...prev, newCourse]);
    };

    const deleteCourse = (id: number | string) => {
        setCourses(prev => prev.filter(c => c.id !== Number(id)));
    };

    return (
        <CourseContext.Provider value={{ courses, getCourse, updateCourse, addCourse, deleteCourse }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
};
