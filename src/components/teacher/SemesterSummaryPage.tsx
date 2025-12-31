import { courses, classDates, attendanceRecords, students, AttendanceStatus } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { ArrowLeft, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SemesterSummaryPageProps {
  courseId: string;
  onBack: () => void;
}

export function SemesterSummaryPage({ courseId, onBack }: SemesterSummaryPageProps) {
  const course = courses.find((c) => c.id === courseId);
  const dates = classDates.filter((d) => d.courseId === courseId);
  const courseStudentIds = [...new Set(attendanceRecords.filter(r => dates.some(d => d.id === r.classDateId)).map(r => r.studentId))];
  
  if (!course) return null;

  const getStudentAttendance = (studentId: string) => {
    const studentRecords: Record<string, AttendanceStatus> = {};
    dates.forEach((date) => {
      const record = attendanceRecords.find(
        (r) => r.studentId === studentId && r.classDateId === date.id
      );
      studentRecords[date.id] = record?.status || "X";
    });
    return studentRecords;
  };

  const getStudentSummary = (studentId: string) => {
    const attendance = getStudentAttendance(studentId);
    const values = Object.values(attendance);
    return {
      present: values.filter((s) => s === "O").length,
      late: values.filter((s) => s === "L").length,
      absent: values.filter((s) => s === "X").length,
      leave: values.filter((s) => s === "Y").length,
    };
  };

  const handleExport = (format: "excel" | "pdf") => {
    toast({
      title: `Export to ${format.toUpperCase()}`,
      description: "Your semester summary is being prepared for download.",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="container py-8 px-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Semester Summary</h2>
          <p className="text-muted-foreground">
            {course.courseCode} - {course.courseName} • Semester {course.semester} | Section: {course.section} | Room: {course.room}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("excel")} className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")} className="gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Matrix</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="sticky left-0 bg-muted/50 z-10">Student Code</TableHead>
                <TableHead className="sticky left-24 bg-muted/50 z-10">Name</TableHead>
                {dates.map((date) => (
                  <TableHead key={date.id} className="text-center min-w-16">
                    {formatDate(date.date)}
                  </TableHead>
                ))}
                <TableHead className="text-center bg-success/10">O</TableHead>
                <TableHead className="text-center bg-warning/10">L</TableHead>
                <TableHead className="text-center bg-destructive/10">X</TableHead>
                <TableHead className="text-center bg-info/10">Y</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseStudentIds.map((studentId) => {
                const student = students.find((s) => s.id === studentId);
                const attendance = getStudentAttendance(studentId);
                const summary = getStudentSummary(studentId);

                return (
                  <TableRow key={studentId} className="table-row-hover">
                    <TableCell className="sticky left-0 bg-card z-10 font-medium">
                      {student?.studentCode}
                    </TableCell>
                    <TableCell className="sticky left-24 bg-card z-10">
                      {student?.name}
                    </TableCell>
                    {dates.map((date) => (
                      <TableCell key={date.id} className="text-center">
                        <StatusBadge status={attendance[date.id]} />
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-semibold text-success">
                      {summary.present}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-warning">
                      {summary.late}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-destructive">
                      {summary.absent}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-info">
                      {summary.leave}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <StatusBadge status="O" />
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="L" />
              <span className="text-sm">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="X" />
              <span className="text-sm">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status="Y" />
              <span className="text-sm">Leave</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
