import { useState } from "react";
import { HodSidebar, HodView } from "./HodSidebar";
import { HodOverview } from "./HodOverview";
import { AdminReports } from "../admin/AdminReports";

export function HodDashboard() {
  const [currentView, setCurrentView] = useState<HodView>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [reportFilter, setReportFilter] = useState<{ lowAttendance?: boolean }>({});

  const handleNavigateToReports = (filter?: { lowAttendance?: boolean }) => {
    setReportFilter(filter || {});
    setCurrentView("reports");
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <HodOverview onNavigateToReports={handleNavigateToReports} />;
      case "reports":
        // Re-use the exact same Admin Reports component with optional filter
        return <AdminReports initialFilter={reportFilter} />;
      default:
        return <HodOverview onNavigateToReports={handleNavigateToReports} />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <HodSidebar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          if (view !== "reports") {
            setReportFilter({});
          }
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className="flex-1 bg-background overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
