import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { attendanceRecords, students, courses, classDates, teachers } from "@/data/dummyData";
import { Calendar, FileSpreadsheet, FileText, Eye, Users, User, Building2, BookOpen, AlertTriangle, GraduationCap, PieChart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PieChart as RechartsPC, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Mock data for instructor teaching log
const instructorTeachingLog = [
  { id: "1", name: "Dr. Piyawat Lertsithichai", department: "Computer Science", sessionsTaught: 22, totalRequired: 24, percentage: 92 },
  { id: "2", name: "Assoc. Prof. Waraporn Narongrit", department: "IT", sessionsTaught: 24, totalRequired: 24, percentage: 100 },
  { id: "3", name: "Dr. Chaiwat Suttipong", department: "Computer Science", sessionsTaught: 20, totalRequired: 24, percentage: 83 },
];

// Mock data for student status report
const studentStatusData = [
  { id: "1", studentCode: "65070001", name: "Somchai Prasert", gender: "Male", classNum: 1, status: "Active" },
  { id: "2", studentCode: "65070002", name: "Narong Tanaka", gender: "Male", classNum: 1, status: "Active" },
  { id: "3", studentCode: "65070003", name: "Pranee Wongsiri", gender: "Female", classNum: 1, status: "Active" },
  { id: "4", studentCode: "65070004", name: "Supachai Khunpol", gender: "Male", classNum: 2, status: "Active" },
  { id: "5", studentCode: "65070005", name: "Wilai Charoen", gender: "Female", classNum: 2, status: "On-Leave" },
  { id: "6", studentCode: "65070006", name: "Prasit Suksawat", gender: "Male", classNum: 1, status: "Active" },
  { id: "7", studentCode: "65070007", name: "Napat Vejchapipat", gender: "Male", classNum: 2, status: "Active" },
  { id: "8", studentCode: "65070008", name: "Kanya Rattanakul", gender: "Female", classNum: 1, status: "Active" },
  { id: "9", studentCode: "65070009", name: "Thawee Somjai", gender: "Male", classNum: 2, status: "Dropped" },
  { id: "10", studentCode: "65070010", name: "Arisa Petcharat", gender: "Female", classNum: 2, status: "Active" },
];

// Mock data for at-risk students
const atRiskStudents = [
  { id: "5", studentCode: "65070005", name: "Wilai Charoen", course: "CS301 - Data Structures", absences: 5, percentage: 58 },
  { id: "9", studentCode: "65070009", name: "Thawee Somjai", course: "CS301 - Data Structures", absences: 6, percentage: 50 },
  { id: "4", studentCode: "65070004", name: "Supachai Khunpol", course: "IT301 - Web Dev", absences: 5, percentage: 58 },
];

// Mock data for department overview pie chart
const departmentAttendanceData = [
  { name: "Present", value: 78, color: "hsl(var(--success))" },
  { name: "Late", value: 12, color: "hsl(var(--warning))" },
  { name: "Absent", value: 8, color: "hsl(var(--destructive))" },
  { name: "Leave", value: 2, color: "hsl(var(--info))" },
];

const reports = [
  {
    id: "instructor",
    title: "Instructor Teaching Log",
    description: "Sessions taught by each teacher vs. total required",
    icon: GraduationCap,
  },
  {
    id: "student-status",
    title: "Student Status Report",
    description: "Student ID, Name, Gender, Class, and Status summary",
    icon: Users,
  },
  {
    id: "at-risk",
    title: "At-Risk Report (Risk Watch)",
    description: "Students with more than 4 absences in any subject",
    icon: AlertTriangle,
  },
  {
    id: "department",
    title: "Department Overview",
    description: "CEIT department-wide attendance with charts",
    icon: PieChart,
  },
];

export function AdminReports() {
  const handleExport = (format: "excel" | "pdf", reportName: string) => {
    toast({
      title: `Export ${reportName}`,
      description: `Preparing ${format.toUpperCase()} download...`,
    });
  };

  // Calculate gender/class counts
  const class1Male = studentStatusData.filter(s => s.classNum === 1 && s.gender === "Male").length;
  const class1Female = studentStatusData.filter(s => s.classNum === 1 && s.gender === "Female").length;
  const class2Male = studentStatusData.filter(s => s.classNum === 2 && s.gender === "Male").length;
  const class2Female = studentStatusData.filter(s => s.classNum === 2 && s.gender === "Female").length;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Dropped": return "destructive";
      case "On-Leave": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Academic Reports</h2>
        <p className="text-muted-foreground mt-1">CEIT Department Report Center</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
                    report.id === "at-risk" ? "bg-destructive/10" : "bg-primary/10"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      report.id === "at-risk" ? "text-destructive" : "text-primary"
                    }`} />
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
                    <DialogContent className="bg-card max-w-5xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{report.title}</DialogTitle>
                        <DialogDescription>Semester 2/2024 - CEIT Department</DialogDescription>
                      </DialogHeader>
                      <div className="pt-4">
                        {/* Instructor Teaching Log */}
                        {report.id === "instructor" && (
                          <Table>
                            <TableHeader>
                              <TableRow className="table-header">
                                <TableHead>Instructor Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead className="text-center">Sessions Taught</TableHead>
                                <TableHead className="text-center">Total Required</TableHead>
                                <TableHead className="text-center">Completion %</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {instructorTeachingLog.map((instructor) => (
                                <TableRow key={instructor.id}>
                                  <TableCell className="font-medium">{instructor.name}</TableCell>
                                  <TableCell>{instructor.department}</TableCell>
                                  <TableCell className="text-center">{instructor.sessionsTaught}</TableCell>
                                  <TableCell className="text-center">{instructor.totalRequired}</TableCell>
                                  <TableCell className="text-center">
                                    <span className={`font-semibold ${
                                      instructor.percentage >= 90 ? 'text-success' :
                                      instructor.percentage >= 75 ? 'text-warning' : 'text-destructive'
                                    }`}>
                                      {instructor.percentage}%
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}

                        {/* Student Status Report */}
                        {report.id === "student-status" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="p-4">
                                <p className="text-sm font-medium mb-2">Class 1 Summary</p>
                                <div className="flex gap-4 text-sm">
                                  <span>Male: <strong>{class1Male}</strong></span>
                                  <span>Female: <strong>{class1Female}</strong></span>
                                  <span>Total: <strong>{class1Male + class1Female}</strong></span>
                                </div>
                              </Card>
                              <Card className="p-4">
                                <p className="text-sm font-medium mb-2">Class 2 Summary</p>
                                <div className="flex gap-4 text-sm">
                                  <span>Male: <strong>{class2Male}</strong></span>
                                  <span>Female: <strong>{class2Female}</strong></span>
                                  <span>Total: <strong>{class2Male + class2Female}</strong></span>
                                </div>
                              </Card>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow className="table-header">
                                  <TableHead>Student ID</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="text-center">Gender</TableHead>
                                  <TableHead className="text-center">Class</TableHead>
                                  <TableHead className="text-center">Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {studentStatusData.map((student) => (
                                  <TableRow key={student.id}>
                                    <TableCell>{student.studentCode}</TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell className="text-center">{student.gender}</TableCell>
                                    <TableCell className="text-center">{student.classNum}</TableCell>
                                    <TableCell className="text-center">
                                      <Badge variant={getStatusBadgeVariant(student.status)}>
                                        {student.status}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}

                        {/* At-Risk Report */}
                        {report.id === "at-risk" && (
                          <div className="space-y-4">
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                              <div className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                                <span className="font-semibold">{atRiskStudents.length} students at risk</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Students with more than 4 absences in any subject
                              </p>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow className="table-header">
                                  <TableHead>Student ID</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Course</TableHead>
                                  <TableHead className="text-center">Absences</TableHead>
                                  <TableHead className="text-center">Attendance %</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {atRiskStudents.map((student) => (
                                  <TableRow key={student.id} className="bg-destructive/5">
                                    <TableCell>{student.studentCode}</TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell className="text-center">
                                      <Badge variant="destructive">{student.absences}</Badge>
                                    </TableCell>
                                    <TableCell className="text-center text-destructive font-semibold">
                                      {student.percentage}%
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}

                        {/* Department Overview */}
                        {report.id === "department" && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">CEIT Department Attendance Distribution</h4>
                                <div className="h-64">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPC>
                                      <Pie
                                        data={departmentAttendanceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}%`}
                                      >
                                        {departmentAttendanceData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                      </Pie>
                                      <Tooltip />
                                    </RechartsPC>
                                  </ResponsiveContainer>
                                </div>
                              </Card>
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">Summary Statistics</h4>
                                <div className="space-y-3">
                                  <div className="flex justify-between p-3 bg-success/10 rounded-lg">
                                    <span>Present Rate</span>
                                    <span className="font-bold text-success">78%</span>
                                  </div>
                                  <div className="flex justify-between p-3 bg-warning/10 rounded-lg">
                                    <span>Late Rate</span>
                                    <span className="font-bold text-warning">12%</span>
                                  </div>
                                  <div className="flex justify-between p-3 bg-destructive/10 rounded-lg">
                                    <span>Absent Rate</span>
                                    <span className="font-bold text-destructive">8%</span>
                                  </div>
                                  <div className="flex justify-between p-3 bg-info/10 rounded-lg">
                                    <span>Leave Rate</span>
                                    <span className="font-bold text-info">2%</span>
                                  </div>
                                </div>
                              </Card>
                            </div>
                            <Card className="p-4">
                              <h4 className="font-semibold mb-4">Department Totals</h4>
                              <div className="grid grid-cols-4 gap-4 text-center">
                                <div className="p-4 bg-muted/30 rounded-lg">
                                  <p className="text-2xl font-bold">205</p>
                                  <p className="text-sm text-muted-foreground">Total Students</p>
                                </div>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                  <p className="text-2xl font-bold">12</p>
                                  <p className="text-sm text-muted-foreground">Total Courses</p>
                                </div>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                  <p className="text-2xl font-bold">8</p>
                                  <p className="text-sm text-muted-foreground">Total Instructors</p>
                                </div>
                                <div className="p-4 bg-muted/30 rounded-lg">
                                  <p className="text-2xl font-bold text-success">87%</p>
                                  <p className="text-sm text-muted-foreground">Overall Attendance</p>
                                </div>
                              </div>
                            </Card>
                          </div>
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