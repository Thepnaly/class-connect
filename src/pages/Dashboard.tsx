import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Helmet } from "react-helmet-async";

type UserRole = "teacher" | "student" | "admin";

interface AuthUser {
  role: UserRole;
  name: string;
  username: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = sessionStorage.getItem("authUser");
    if (!storedUser) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(storedUser) as AuthUser;
      setAuthUser(user);
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    navigate("/");
  };

  if (!authUser) {
    return null; // Will redirect
  }

  const renderDashboard = () => {
    switch (authUser.role) {
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

  const getRoleTitle = () => {
    switch (authUser.role) {
      case "teacher":
        return "Teacher Dashboard";
      case "student":
        return "Student Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <>
      <Helmet>
        <title>{getRoleTitle()} | CEIT Attendance System</title>
        <meta
          name="description"
          content="CEIT Attendance System Dashboard - Manage check-ins, view reports, and track attendance."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header 
          currentRole={authUser.role} 
          userName={authUser.name}
          onLogout={handleLogout}
        />
        {renderDashboard()}
      </div>
    </>
  );
}
