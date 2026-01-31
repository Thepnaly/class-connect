import { useState } from "react";
import { HodSidebar, HodView } from "./HodSidebar";
import { HodOverview } from "./HodOverview";
import { AdminReports } from "../admin/AdminReports";

export function HodDashboard() {
  const [currentView, setCurrentView] = useState<HodView>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <HodOverview />;
      case "reports":
        // Re-use the exact same Admin Reports component
        return <AdminReports />;
      default:
        return <HodOverview />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <HodSidebar
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