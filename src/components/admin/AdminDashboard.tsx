import { useState } from "react";
import { AdminSidebar, AdminView } from "./AdminSidebar";
import { AdminOverview } from "./AdminOverview";
import { ManageStudents } from "./ManageStudents";
import { ManageTeachers } from "./ManageTeachers";
import { ManageCourses } from "./ManageCourses";
import { AdminReports } from "./AdminReports";
import { SystemSettings } from "./SystemSettings";

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminOverview />;
      case "students":
        return <ManageStudents />;
      case "teachers":
        return <ManageTeachers />;
      case "courses":
        return <ManageCourses />;
      case "reports":
        return <AdminReports />;
      case "settings":
        return <SystemSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className="flex-1 bg-background overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
