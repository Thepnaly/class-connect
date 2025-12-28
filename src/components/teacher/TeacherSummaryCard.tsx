import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, TrendingUp, AlertTriangle } from "lucide-react";

interface TeacherSummaryCardProps {
  totalClasses: number;
  avgAttendance: number;
  atRiskStudents: number;
}

// At-risk students data for this teacher's courses
const teacherAtRiskStudents = [
  { id: "1", studentCode: "65070005", name: "Wilai Charoen", course: "Data Structures", section: "4COM2", major: "Computer Engineering", phone: "081-234-5678", email: "wilai.c@student.ceit.edu", absences: 5, percentage: 58 },
  { id: "2", studentCode: "65070009", name: "Thawee Somjai", course: "Data Structures", section: "4COM2", major: "Computer Engineering", phone: "082-345-6789", email: "thawee.s@student.ceit.edu", absences: 6, percentage: 50 },
  { id: "3", studentCode: "65070015", name: "Pranee Wongsiri", course: "Data Structures", section: "4COM1", major: "Computer Engineering", phone: "084-567-8901", email: "pranee.w@student.ceit.edu", absences: 7, percentage: 42 },
];

export function TeacherSummaryCard({ totalClasses, avgAttendance, atRiskStudents }: TeacherSummaryCardProps) {
  const [atRiskDialogOpen, setAtRiskDialogOpen] = useState(false);

  return (
    <>
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

          {/* Clickable At-Risk Card */}
          <button
            onClick={() => setAtRiskDialogOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors cursor-pointer border border-transparent hover:border-destructive/30"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">At-Risk Students</p>
                <p className="text-xl font-bold text-destructive">{atRiskStudents}</p>
                <p className="text-xs text-muted-foreground">&gt;4 absences • Click to view</p>
              </div>
            </div>
          </button>
        </CardContent>
      </Card>

      {/* At-Risk Students Dialog */}
      <Dialog open={atRiskDialogOpen} onOpenChange={setAtRiskDialogOpen}>
        <DialogContent className="bg-card max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              At-Risk Students - My Courses
            </DialogTitle>
            <DialogDescription>
              Students with more than 4 absences in your courses (Read-only view)
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">{teacherAtRiskStudents.length} students at risk</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Contact recommended for students below 60% attendance
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="table-header">
                    <TableHead className="w-12">No.</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead className="text-center">Absences</TableHead>
                    <TableHead className="text-center">Attendance %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherAtRiskStudents.map((student, index) => (
                    <TableRow key={student.id} className="bg-destructive/5">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-mono text-sm">{student.studentCode}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        <span className="font-mono">{student.section}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {student.major}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          <div>{student.phone}</div>
                          <div className="text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="destructive">{student.absences}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-destructive font-bold text-lg">{student.percentage}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
