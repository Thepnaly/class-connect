import { GraduationCap, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserRole = "teacher" | "student" | "admin" | "hod";

interface HeaderProps {
  currentRole: UserRole;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ currentRole, userName = "User", onLogout }: HeaderProps) {
  const getRoleBadge = () => {
    switch (currentRole) {
      case "teacher":
        return { label: "Teacher", color: "bg-primary text-primary-foreground" };
      case "student":
        return { label: "Student", color: "bg-info text-info-foreground" };
      case "admin":
        return { label: "Administrator", color: "bg-destructive text-destructive-foreground" };
      case "hod":
        return { label: "Head of Department", color: "bg-warning text-warning-foreground" };
      default:
        return { label: "User", color: "bg-muted text-muted-foreground" };
    }
  };

  const roleBadge = getRoleBadge();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">CEIT Attendance</h1>
            <p className="text-xs text-muted-foreground">Computer Engineering and Information Technology Department</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Badge */}
          <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge.color}`}>
            {roleBadge.label}
          </span>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {currentRole}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
