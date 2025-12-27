import { Camera, CheckCircle2, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock AI recognition log entries
const aiLogEntries = [
  { id: 1, studentId: "65070001", name: "Somchai Prasert", time: "09:02:15", verified: true, avatar: "" },
  { id: 2, studentId: "65070002", name: "Narong Tanaka", time: "09:03:42", verified: true, avatar: "" },
  { id: 3, studentId: "65070003", name: "Pranee Wongsiri", time: "09:05:18", verified: true, avatar: "" },
  { id: 4, studentId: "65070008", name: "Kanya Rattanakul", time: "09:06:33", verified: true, avatar: "" },
];

interface AIRecognitionWidgetProps {
  courseName: string;
  section: string;
  room: string;
}

export function AIRecognitionWidget({ courseName, section, room }: AIRecognitionWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="ai-widget-glass border-primary/20 overflow-hidden">
      <CardHeader className="pb-3 bg-sidebar/80 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2 text-sidebar-foreground">
            <div className="relative">
              <Camera className="h-5 w-5 text-success" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
            </div>
            Live AI Recognition
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-sidebar-foreground/70 mt-1">
          Course: {courseName} | Section: {section} | Room: {room}
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-3 bg-sidebar/60 max-h-80 overflow-y-auto">
          <div className="space-y-2">
            {aiLogEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="bg-sidebar-accent/50 rounded-lg p-2.5 border border-sidebar-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 ring-2 ring-success/50">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {entry.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm text-sidebar-foreground truncate">{entry.name}</span>
                      {entry.verified && (
                        <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-sidebar-foreground/70">{entry.studentId}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant="secondary" className="bg-success/20 text-success border-0 text-xs">
                      ✓
                    </Badge>
                    <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">{entry.time}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center gap-2 py-2 text-sidebar-foreground/50">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
              <span className="text-xs">Scanning...</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}