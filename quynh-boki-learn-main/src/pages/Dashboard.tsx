import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import StudentSidebar from '@/components/student/StudentSidebar';
import StudentCourses from '@/components/student/sections/StudentCourses';
import StudentExams from '@/components/student/sections/StudentExams';
import StudentOrders from '@/components/student/sections/StudentOrders';
import StudentCommunities from '@/components/student/sections/StudentCommunities';
import StudentProfile from '@/components/student/sections/StudentProfile';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('courses');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin không xem Dashboard này, chuyển đến trang Quản trị
  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return <StudentCourses />;
      case 'exams':
        return <StudentExams />;
      case 'orders':
        return <StudentOrders />;
      case 'communities':
        return <StudentCommunities />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentCourses />;
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-65px)]">
        <StudentSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 p-8 bg-background">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
