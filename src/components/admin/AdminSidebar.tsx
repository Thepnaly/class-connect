import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type AdminView =
  | "dashboard"
  | "students"
  | "teachers"
  | "courses"
  | "reports"
  | "settings";

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: "dashboard" as AdminView, label: "Dashboard", icon: LayoutDashboard },
  { id: "students" as AdminView, label: "Manage Students", icon: Users },
  { id: "teachers" as AdminView, label: "Manage Teachers", icon: GraduationCap },
  { id: "courses" as AdminView, label: "Manage Courses", icon: BookOpen },
  { id: "reports" as AdminView, label: "Reports", icon: BarChart3 },
  { id: "settings" as AdminView, label: "System Settings", icon: Settings },
];

export function AdminSidebar({
  currentView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 h-[calc(100vh-64px)] sticky top-16",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "sidebar-item w-full text-left",
                  isActive && "sidebar-item-active"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
