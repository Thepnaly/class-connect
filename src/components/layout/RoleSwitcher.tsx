import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GraduationCap, User, Shield, ChevronDown } from "lucide-react";

export type UserRole = "teacher" | "student" | "admin";

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleConfig = {
  teacher: { label: "Teacher", icon: GraduationCap, color: "text-primary" },
  student: { label: "Student", icon: User, color: "text-success" },
  admin: { label: "Admin", icon: Shield, color: "text-warning" },
};

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const CurrentIcon = roleConfig[currentRole].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CurrentIcon className={`h-4 w-4 ${roleConfig[currentRole].color}`} />
          <span>{roleConfig[currentRole].label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-popover">
        {(Object.keys(roleConfig) as UserRole[]).map((role) => {
          const Icon = roleConfig[role].icon;
          return (
            <DropdownMenuItem
              key={role}
              onClick={() => onRoleChange(role)}
              className="gap-2 cursor-pointer"
            >
              <Icon className={`h-4 w-4 ${roleConfig[role].color}`} />
              <span>{roleConfig[role].label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
