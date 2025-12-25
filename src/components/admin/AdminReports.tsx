import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { attendanceRecords, students, courses, classDates } from "@/data/dummyData";
import { Calendar, FileSpreadsheet, FileText, Eye, Users, User, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const reports = [
  {
    id: "daily",
    title: "Daily Attendance Report",
    description: "View and export attendance data for a specific day",
    icon: Calendar,
  },
  {
    id: "term",
    title: "Term Summary / Single Course",
    description: "Comprehensive attendance summary for a course or semester",
    icon: Users,
  },
  {
    id: "student",
    title: "Individual Student History",
    description: "Complete attendance history for a specific student",
    icon: User,
  },
  {
    id: "schoolwide",
    title: "School-wide Summary",
    description: "Overview of attendance across all departments",
    icon: Building2,
  },
];

export function AdminReports() {
  const handleExport = (format: "excel" | "pdf", reportName: string) => {
    toast({
      title: `Export ${reportName}`,
      description: `Preparing ${format.toUpperCase()} download...`,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground mt-1">Generate and export attendance reports</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{report.title}</DialogTitle>
                        <DialogDescription>Preview of report data</DialogDescription>
                      </DialogHeader>
                      <div className="pt-4">
                        {report.id === "daily" && (
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
                              {attendanceRecords.slice(0, 8).map((record) => (
                                <TableRow key={record.id}>
                                  <TableCell>{record.studentCode}</TableCell>
                                  <TableCell>{record.studentName}</TableCell>
                                  <TableCell>CS301</TableCell>
                                  <TableCell>
                                    <StatusBadge status={record.status} showLabel />
                                  </TableCell>
                                  <TableCell>{record.checkInTime || "-"}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                        {report.id === "term" && (
                          <div className="space-y-4">
                            <div className="flex gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">Course:</span>
                                <span>CS301 - Data Structures</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">Semester:</span>
                                <span>2/2024</span>
                              </div>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow className="table-header">
                                  <TableHead>Student</TableHead>
                                  {classDates.slice(0, 3).map((d) => (
                                    <TableHead key={d.id} className="text-center">
                                      {formatDate(d.date)}
                                    </TableHead>
                                  ))}
                                  <TableHead className="text-center">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {students.slice(0, 5).map((student) => (
                                  <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell className="text-center">
                                      <StatusBadge status="O" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <StatusBadge status="L" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <StatusBadge status="O" />
                                    </TableCell>
                                    <TableCell className="text-center font-semibold">
                                      2/3
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                        {report.id === "student" && (
                          <div className="space-y-4">
                            <div className="flex gap-4 text-sm">
                              <span className="font-semibold">Student:</span>
                              <span>65070001 - Somchai Prasert</span>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow className="table-header">
                                  <TableHead>Date</TableHead>
                                  <TableHead>Course</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Check-in Time</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {attendanceRecords
                                  .filter((r) => r.studentId === "1")
                                  .map((record) => {
                                    const classDate = classDates.find(
                                      (d) => d.id === record.classDateId
                                    );
                                    return (
                                      <TableRow key={record.id}>
                                        <TableCell>
                                          {classDate ? formatDate(classDate.date) : "-"}
                                        </TableCell>
                                        <TableCell>CS301</TableCell>
                                        <TableCell>
                                          <StatusBadge status={record.status} showLabel />
                                        </TableCell>
                                        <TableCell>{record.checkInTime || "-"}</TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                        {report.id === "schoolwide" && (
                          <Table>
                            <TableHeader>
                              <TableRow className="table-header">
                                <TableHead>Department</TableHead>
                                <TableHead className="text-center">Total Students</TableHead>
                                <TableHead className="text-center">Present</TableHead>
                                <TableHead className="text-center">Late</TableHead>
                                <TableHead className="text-center">Absent</TableHead>
                                <TableHead className="text-center">Attendance Rate</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Computer Science</TableCell>
                                <TableCell className="text-center">120</TableCell>
                                <TableCell className="text-center text-success">102</TableCell>
                                <TableCell className="text-center text-warning">8</TableCell>
                                <TableCell className="text-center text-destructive">10</TableCell>
                                <TableCell className="text-center font-semibold">91.7%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Information Technology</TableCell>
                                <TableCell className="text-center">85</TableCell>
                                <TableCell className="text-center text-success">70</TableCell>
                                <TableCell className="text-center text-warning">10</TableCell>
                                <TableCell className="text-center text-destructive">5</TableCell>
                                <TableCell className="text-center font-semibold">94.1%</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleExport("excel", report.title)}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleExport("pdf", report.title)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
