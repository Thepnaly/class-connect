import { useState } from "react";
import { RoleSwitcher, UserRole } from "./RoleSwitcher";
import { GraduationCap, Bell, Camera, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

// Mock AI recognition log entries
const aiLogEntries = [
  { id: 1, studentId: "65070001", name: "Somchai Prasert", time: "09:02:15", verified: true, avatar: "" },
  { id: 2, studentId: "65070002", name: "Narong Tanaka", time: "09:03:42", verified: true, avatar: "" },
  { id: 3, studentId: "65070003", name: "Pranee Wongsiri", time: "09:05:18", verified: true, avatar: "" },
  { id: 4, studentId: "65070008", name: "Kanya Rattanakul", time: "09:06:33", verified: true, avatar: "" },
];

export function Header({ currentRole, onRoleChange }: HeaderProps) {
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);

  return (
    <>
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
            {currentRole === "teacher" && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsAIDrawerOpen(true)}
              >
                <Camera className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                </span>
              </Button>
            )}
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

      {/* AI Recognition Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-96 transform transition-transform duration-300 ease-out ${
          isAIDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-sidebar/95 backdrop-blur-xl border-l border-sidebar-border shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground flex items-center gap-2">
                <Camera className="h-5 w-5 text-success" />
                Live AI Recognition Log
              </h2>
              <p className="text-xs text-sidebar-foreground/70 mt-1">CEIT-301 (Section: 4COM1)</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setIsAIDrawerOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-100px)]">
            {aiLogEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="bg-sidebar-accent/50 rounded-lg p-3 border border-sidebar-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-success/50">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {entry.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sidebar-foreground truncate">{entry.name}</span>
                      {entry.verified && (
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-sidebar-foreground/70">{entry.studentId}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant="secondary" className="bg-success/20 text-success border-0">
                      Verified
                    </Badge>
                    <p className="text-xs text-sidebar-foreground/50 mt-1">{entry.time}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center gap-2 py-4 text-sidebar-foreground/50">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-sm">Scanning for faces...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isAIDrawerOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsAIDrawerOpen(false)}
        />
      )}
    </>
  );
}
