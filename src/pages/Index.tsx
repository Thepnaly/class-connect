import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { UserRole } from "@/components/layout/RoleSwitcher";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>("teacher");

  const renderDashboard = () => {
    switch (currentRole) {
      case "teacher":
        return <TeacherDashboard />;
      case "student":
        return <StudentDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>CS&IT Attendance System | University Department</title>
        <meta
          name="description"
          content="Student attendance management system for Computer Science and IT Department. Manage check-ins, view reports, and track attendance."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
        {renderDashboard()}
      </div>
    </>
  );
};

export default Index;
