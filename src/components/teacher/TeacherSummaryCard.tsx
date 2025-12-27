import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, TrendingUp, AlertTriangle } from "lucide-react";

interface TeacherSummaryCardProps {
  totalClasses: number;
  avgAttendance: number;
  atRiskStudents: number;
}

export function TeacherSummaryCard({ totalClasses, avgAttendance, atRiskStudents }: TeacherSummaryCardProps) {
  return (
    <Card className="card-hover border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Teaching Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-xl font-bold">{totalClasses}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Attendance</p>
              <p className="text-xl font-bold text-success">{avgAttendance}%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">At-Risk Students</p>
              <p className="text-xl font-bold text-destructive">{atRiskStudents}</p>
              <p className="text-xs text-muted-foreground">&gt;4 absences</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}