import { students, teachers, courses, attendanceRecords } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Users, GraduationCap, BookOpen, TrendingUp, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function AdminOverview() {
  // Today's attendance (simulated)
  const todaysRecords = attendanceRecords.slice(0, 10);

  const stats = {
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalCourses: courses.length,
    attendanceRate: 87,
  };

  const handleExport = (format: "excel" | "pdf") => {
    toast({
      title: `Export to ${format.toUpperCase()}`,
      description: "Your report is being prepared for download.",
    });
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of the attendance management system</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold">{stats.totalStudents}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-3xl font-bold">{stats.totalTeachers}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold">{stats.totalCourses}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Today's Attendance</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExport("excel")} className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Export Excel
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("pdf")} className="gap-2">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead>Student Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysRecords.map((record) => (
                <TableRow key={record.id} className="table-row-hover">
                  <TableCell className="font-medium">{record.studentCode}</TableCell>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>CS301 - Data Structures</TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} showLabel />
                  </TableCell>
                  <TableCell>{record.checkInTime || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
