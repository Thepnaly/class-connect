import { useState } from "react";
import { AdminSidebar, AdminView } from "./AdminSidebar";
import { AdminOverview } from "./AdminOverview";
import { AdminReports } from "./AdminReports";
import { AdminLogs } from "./AdminLogs";

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [logFilter, setLogFilter] = useState<"all" | "error" | "warning">("all");

  const handleViewChange = (view: AdminView) => {
    setCurrentView(view);
    if (view !== "logs") {
      setLogFilter("all");
    }
  };

  const handleNavigateToLogs = (filter: "error" | "warning") => {
    setLogFilter(filter);
    setCurrentView("logs");
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminOverview onNavigateToLogs={handleNavigateToLogs} />;
      case "reports":
        return <AdminReports />;
      case "logs":
        return <AdminLogs initialFilter={logFilter} />;
      default:
        return <AdminOverview onNavigateToLogs={handleNavigateToLogs} />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className="flex-1 bg-background overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}