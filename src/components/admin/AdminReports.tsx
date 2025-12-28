import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, FileText, Eye, Users, AlertTriangle, GraduationCap, PieChart, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  PieChart as RechartsPC, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

// Mock data for instructor teaching log with expanded data
const instructorTeachingLog = [
  { id: "1", courseCode: "CS301", courseName: "Data Structures", name: "Dr. Piyawat Lertsithichai", sessionsTaught: 16, totalRequired: 16, percentage: 100 },
  { id: "2", courseCode: "IT301", courseName: "Web Development", name: "Assoc. Prof. Waraporn Narongrit", sessionsTaught: 16, totalRequired: 16, percentage: 100 },
  { id: "3", courseCode: "CS401", courseName: "Software Engineering", name: "Dr. Chaiwat Suttipong", sessionsTaught: 14, totalRequired: 16, percentage: 88 },
  { id: "4", courseCode: "IT401", courseName: "Database Systems", name: "Dr. Somchai Prasert", sessionsTaught: 12, totalRequired: 16, percentage: 75 },
  { id: "5", courseCode: "CS201", courseName: "Computer Networks", name: "Asst. Prof. Napat Thongrak", sessionsTaught: 7, totalRequired: 16, percentage: 44 },
  { id: "6", courseCode: "IT201", courseName: "System Analysis", name: "Dr. Kanya Rattanakul", sessionsTaught: 16, totalRequired: 16, percentage: 100 },
];

// Teaching completion distribution data for bar chart
const teachingCompletionData = [
  { name: "Perfect (100%)", count: 3, fill: "hsl(142, 76%, 36%)" },
  { name: "Good (80-99%)", count: 1, fill: "hsl(48, 96%, 53%)" },
  { name: "Average (50-79%)", count: 1, fill: "hsl(38, 92%, 50%)" },
  { name: "Below Standard (<50%)", count: 1, fill: "hsl(0, 84%, 60%)" },
];

// Student Status Distribution (based on 1,233 total students)
const studentStatusDistribution = [
  { name: "Active Students", value: 1156, percentage: 93.8, color: "hsl(142, 76%, 36%)" },
  { name: "Dropped Students", value: 52, percentage: 4.2, color: "hsl(0, 84%, 60%)" },
  { name: "Resigned/Withdrawn", value: 25, percentage: 2.0, color: "hsl(38, 92%, 50%)" },
];

// Section-wise demographic data
const sectionDemographicData = [
  { section: "4COM1", droppedMale: 2, droppedFemale: 1, activeMale: 25, activeFemale: 18, total: 46 },
  { section: "4COM2", droppedMale: 1, droppedFemale: 2, activeMale: 22, activeFemale: 20, total: 45 },
  { section: "4IT1", droppedMale: 3, droppedFemale: 0, activeMale: 20, activeFemale: 22, total: 45 },
  { section: "4IT2", droppedMale: 1, droppedFemale: 1, activeMale: 18, activeFemale: 25, total: 45 },
  { section: "3COM1", droppedMale: 2, droppedFemale: 2, activeMale: 28, activeFemale: 16, total: 48 },
  { section: "3COM2", droppedMale: 0, droppedFemale: 1, activeMale: 24, activeFemale: 22, total: 47 },
  { section: "3IT1", droppedMale: 1, droppedFemale: 0, activeMale: 21, activeFemale: 24, total: 46 },
  { section: "3IT2", droppedMale: 2, droppedFemale: 1, activeMale: 19, activeFemale: 26, total: 48 },
];

// Enhanced at-risk students data
const atRiskStudents = [
  { id: "1", studentCode: "65070005", name: "Wilai Charoen", course: "CS301 - Data Structures", room: "301", section: "4COM2", department: "CEIT", absences: 5, percentage: 58 },
  { id: "2", studentCode: "65070009", name: "Thawee Somjai", course: "CS301 - Data Structures", room: "301", section: "4COM2", department: "CEIT", absences: 6, percentage: 50 },
  { id: "3", studentCode: "65070004", name: "Supachai Khunpol", course: "IT301 - Web Development", room: "302", section: "4IT1", department: "CEIT", absences: 5, percentage: 58 },
  { id: "4", studentCode: "65070015", name: "Pranee Wongsiri", course: "CS401 - Software Engineering", room: "303", section: "4COM1", department: "CEIT", absences: 7, percentage: 42 },
  { id: "5", studentCode: "65070022", name: "Narong Tanaka", course: "IT401 - Database Systems", room: "305", section: "4IT2", department: "CEIT", absences: 5, percentage: 58 },
];

// Student status report data
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

const reports = [
  {
    id: "instructor",
    title: "Instructor Teaching Log",
    titleThai: "KPI การสอนของครู",
    description: "Teaching completion distribution with bar chart",
    icon: GraduationCap,
  },
  {
    id: "department",
    title: "Department Overview",
    titleThai: "ภาพรวมภาควิชา",
    description: "Student status distribution across CEIT",
    icon: PieChart,
  },
  {
    id: "section-demographic",
    title: "Section Demographics",
    titleThai: "รายงานแยกเพศรายห้อง",
    description: "Gender breakdown by section",
    icon: Users,
  },
  {
    id: "at-risk",
    title: "Risk Watch",
    titleThai: "เจาะลึกกลุ่มเสี่ยง",
    description: "Students with more than 4 absences",
    icon: AlertTriangle,
  },
];

export function AdminReports() {
  const [atRiskDialogOpen, setAtRiskDialogOpen] = useState(false);

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

  // Perfect completion instructors
  const perfectInstructors = instructorTeachingLog.filter(i => i.percentage === 100);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Dropped": return "destructive";
      case "On-Leave": return "secondary";
      default: return "outline";
    }
  };

  const totalDropped = sectionDemographicData.reduce((acc, s) => acc + s.droppedMale + s.droppedFemale, 0);
  const totalActive = sectionDemographicData.reduce((acc, s) => acc + s.activeMale + s.activeFemale, 0);

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
                    <p className="text-sm text-muted-foreground">{report.titleThai}</p>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {report.id === "at-risk" ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="flex-1 gap-2"
                        onClick={() => setAtRiskDialogOpen(true)}
                      >
                        <Eye className="h-4 w-4" />
                        View ({atRiskStudents.length} at risk)
                      </Button>
                    </>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card max-w-6xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{report.title}</DialogTitle>
                          <DialogDescription>Semester 2/2024 - CEIT Department</DialogDescription>
                        </DialogHeader>
                        <div className="pt-4">
                          {/* Instructor Teaching Log with Bar Chart */}
                          {report.id === "instructor" && (
                            <div className="space-y-6">
                              {/* Bar Chart */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                  <BarChart3 className="h-5 w-5 text-primary" />
                                  Teaching Completion Distribution
                                </h4>
                                <div className="h-64">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={teachingCompletionData} layout="vertical">
                                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                                      <YAxis 
                                        type="category" 
                                        dataKey="name" 
                                        width={150} 
                                        stroke="hsl(var(--muted-foreground))"
                                        tick={{ fontSize: 12 }}
                                      />
                                      <Tooltip 
                                        contentStyle={{ 
                                          backgroundColor: "hsl(var(--card))", 
                                          border: "1px solid hsl(var(--border))",
                                          borderRadius: "8px"
                                        }} 
                                      />
                                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                        {teachingCompletionData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </Card>

                              {/* Perfect Completion Table */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4 text-success flex items-center gap-2">
                                  ✓ Perfect Completion (100% / 16 Sessions)
                                </h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow className="table-header">
                                      <TableHead className="w-12">No.</TableHead>
                                      <TableHead>Course Code</TableHead>
                                      <TableHead>Course Name</TableHead>
                                      <TableHead>Instructor</TableHead>
                                      <TableHead className="text-center">Sessions</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {perfectInstructors.map((instructor, index) => (
                                      <TableRow key={instructor.id} className="bg-success/5">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-mono">{instructor.courseCode}</TableCell>
                                        <TableCell>{instructor.courseName}</TableCell>
                                        <TableCell className="font-medium">{instructor.name}</TableCell>
                                        <TableCell className="text-center">
                                          <Badge className="bg-success text-success-foreground">
                                            {instructor.sessionsTaught}/{instructor.totalRequired}
                                          </Badge>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Card>

                              {/* Full Teaching Log */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">All Instructors</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow className="table-header">
                                      <TableHead>Course Code</TableHead>
                                      <TableHead>Course Name</TableHead>
                                      <TableHead>Instructor</TableHead>
                                      <TableHead className="text-center">Sessions</TableHead>
                                      <TableHead className="text-center">Completion %</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {instructorTeachingLog.map((instructor) => (
                                      <TableRow key={instructor.id}>
                                        <TableCell className="font-mono">{instructor.courseCode}</TableCell>
                                        <TableCell>{instructor.courseName}</TableCell>
                                        <TableCell className="font-medium">{instructor.name}</TableCell>
                                        <TableCell className="text-center">
                                          {instructor.sessionsTaught}/{instructor.totalRequired}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <span className={`font-semibold ${
                                            instructor.percentage === 100 ? 'text-success' :
                                            instructor.percentage >= 80 ? 'text-warning' :
                                            instructor.percentage >= 50 ? 'text-orange-500' : 'text-destructive'
                                          }`}>
                                            {instructor.percentage}%
                                          </span>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Card>
                            </div>
                          )}

                          {/* Department Overview with Donut Chart */}
                          {report.id === "department" && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <Card className="p-4">
                                  <h4 className="font-semibold mb-4">Student Status Distribution</h4>
                                  <p className="text-sm text-muted-foreground mb-4">Total Students: 1,233</p>
                                  <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RechartsPC>
                                        <Pie
                                          data={studentStatusDistribution}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={60}
                                          outerRadius={90}
                                          paddingAngle={3}
                                          dataKey="value"
                                          label={({ name, percentage }) => `${percentage.toFixed(1)}%`}
                                        >
                                          {studentStatusDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                          ))}
                                        </Pie>
                                        <Tooltip 
                                          formatter={(value: number, name: string) => [`${value} students`, name]}
                                          contentStyle={{ 
                                            backgroundColor: "hsl(var(--card))", 
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "8px"
                                          }}
                                        />
                                        <Legend />
                                      </RechartsPC>
                                    </ResponsiveContainer>
                                  </div>
                                </Card>
                                <Card className="p-4">
                                  <h4 className="font-semibold mb-4">Status Breakdown</h4>
                                  <div className="space-y-4">
                                    {studentStatusDistribution.map((status) => (
                                      <div key={status.name} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: `${status.color}20` }}>
                                        <div className="flex items-center gap-3">
                                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: status.color }}></div>
                                          <span className="font-medium">{status.name}</span>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-2xl font-bold">{status.value.toLocaleString()}</p>
                                          <p className="text-sm text-muted-foreground">{status.percentage}%</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Card>
                              </div>
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">Department Summary</h4>
                                <div className="grid grid-cols-4 gap-4 text-center">
                                  <div className="p-4 bg-muted/30 rounded-lg">
                                    <p className="text-2xl font-bold">1,233</p>
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
                                    <p className="text-2xl font-bold text-success">93.8%</p>
                                    <p className="text-sm text-muted-foreground">Active Rate</p>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          )}

                          {/* Section Demographics Table */}
                          {report.id === "section-demographic" && (
                            <div className="space-y-4">
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">Section-wise Gender Breakdown</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow className="table-header">
                                      <TableHead rowSpan={2} className="align-middle">Section</TableHead>
                                      <TableHead colSpan={3} className="text-center border-x border-border">Dropped/Resigned</TableHead>
                                      <TableHead colSpan={3} className="text-center border-r border-border">Active Students</TableHead>
                                      <TableHead rowSpan={2} className="text-center align-middle">Grand Total</TableHead>
                                    </TableRow>
                                    <TableRow className="table-header">
                                      <TableHead className="text-center border-l border-border">Male</TableHead>
                                      <TableHead className="text-center">Female</TableHead>
                                      <TableHead className="text-center border-r border-border">Total</TableHead>
                                      <TableHead className="text-center">Male</TableHead>
                                      <TableHead className="text-center">Female</TableHead>
                                      <TableHead className="text-center border-r border-border">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {sectionDemographicData.map((section) => (
                                      <TableRow key={section.section}>
                                        <TableCell className="font-medium">{section.section}</TableCell>
                                        <TableCell className="text-center text-destructive">{section.droppedMale}</TableCell>
                                        <TableCell className="text-center text-destructive">{section.droppedFemale}</TableCell>
                                        <TableCell className="text-center font-semibold text-destructive border-r border-border">
                                          {section.droppedMale + section.droppedFemale}
                                        </TableCell>
                                        <TableCell className="text-center text-success">{section.activeMale}</TableCell>
                                        <TableCell className="text-center text-success">{section.activeFemale}</TableCell>
                                        <TableCell className="text-center font-semibold text-success border-r border-border">
                                          {section.activeMale + section.activeFemale}
                                        </TableCell>
                                        <TableCell className="text-center font-bold">{section.total}</TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow className="bg-muted/50 font-bold">
                                      <TableCell>Total</TableCell>
                                      <TableCell className="text-center text-destructive">
                                        {sectionDemographicData.reduce((acc, s) => acc + s.droppedMale, 0)}
                                      </TableCell>
                                      <TableCell className="text-center text-destructive">
                                        {sectionDemographicData.reduce((acc, s) => acc + s.droppedFemale, 0)}
                                      </TableCell>
                                      <TableCell className="text-center text-destructive border-r border-border">
                                        {totalDropped}
                                      </TableCell>
                                      <TableCell className="text-center text-success">
                                        {sectionDemographicData.reduce((acc, s) => acc + s.activeMale, 0)}
                                      </TableCell>
                                      <TableCell className="text-center text-success">
                                        {sectionDemographicData.reduce((acc, s) => acc + s.activeFemale, 0)}
                                      </TableCell>
                                      <TableCell className="text-center text-success border-r border-border">
                                        {totalActive}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {sectionDemographicData.reduce((acc, s) => acc + s.total, 0)}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Card>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
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

      {/* At-Risk Dialog */}
      <Dialog open={atRiskDialogOpen} onOpenChange={setAtRiskDialogOpen}>
        <DialogContent className="bg-card max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              At-Risk Students Detail
            </DialogTitle>
            <DialogDescription>Students with more than 4 absences in any subject</DialogDescription>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">{atRiskStudents.length} students at risk</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Immediate intervention recommended for students below 60% attendance
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="table-header">
                  <TableHead className="w-12">No.</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Room/Section</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-center">Absences</TableHead>
                  <TableHead className="text-center">Attendance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atRiskStudents.map((student, index) => (
                  <TableRow key={student.id} className="bg-destructive/5">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-mono">{student.studentCode}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      <span className="font-mono">{student.room}/{student.section}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.department}</Badge>
                    </TableCell>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
