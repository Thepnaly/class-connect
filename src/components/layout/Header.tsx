import { RoleSwitcher, UserRole } from "./RoleSwitcher";
import { GraduationCap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function Header({ currentRole, onRoleChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">CS&IT Attendance</h1>
            <p className="text-xs text-muted-foreground">Computer Science & IT Department</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              3
            </span>
          </Button>
          <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
        </div>
      </div>
    </header>
  );
}
