import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminCourses from '@/components/admin/sections/AdminCourses';
import AdminStudents from '@/components/admin/sections/AdminStudents';
import AdminOrders from '@/components/admin/sections/AdminOrders';
import AdminBlog from '@/components/admin/sections/AdminBlog';
import AdminExams from '@/components/admin/sections/AdminExams';
import AdminCommunity from '@/components/admin/sections/AdminCommunity';
import AdminZoomManager from '@/components/admin/sections/AdminZoomManager';

const Admin = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('courses');

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return <AdminCourses />;
      case 'students':
        return <AdminStudents />;
      case 'purchases':
        return <AdminOrders />;
      case 'exams':
        return <AdminExams />;
      case 'zoom':
        return <AdminZoomManager />;
      case 'community':
        return <AdminCommunity />;
      case 'blog':
        return <AdminBlog />;
      default:
        return <AdminCourses />;
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="flex min-h-[calc(100vh-65px)] bg-background">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-65px)]">
          {renderContent()}
        </main>
      </div>
    </Layout>
  );
};

export default Admin;
