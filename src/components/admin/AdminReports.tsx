import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, FileText, Eye, Users, AlertTriangle, GraduationCap, PieChart, BarChart3, Calendar } from "lucide-react";
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
  Legend,
  LabelList
} from "recharts";

// Teaching frequency distribution data (sessions 0-16)
const teachingFrequencyData = [
  { sessions: 0, count: 2, percentage: 1.1 },
  { sessions: 1, count: 1, percentage: 0.6 },
  { sessions: 2, count: 1, percentage: 0.6 },
  { sessions: 3, count: 2, percentage: 1.1 },
  { sessions: 4, count: 3, percentage: 1.7 },
  { sessions: 5, count: 2, percentage: 1.1 },
  { sessions: 6, count: 4, percentage: 2.3 },
  { sessions: 7, count: 3, percentage: 1.7 },
  { sessions: 8, count: 5, percentage: 2.9 },
  { sessions: 9, count: 6, percentage: 3.4 },
  { sessions: 10, count: 8, percentage: 4.6 },
  { sessions: 11, count: 10, percentage: 5.7 },
  { sessions: 12, count: 14, percentage: 8.0 },
  { sessions: 13, count: 12, percentage: 6.9 },
  { sessions: 14, count: 16, percentage: 9.1 },
  { sessions: 15, count: 16, percentage: 9.1 },
  { sessions: 16, count: 73, percentage: 41.7 },
];

// Instructor performance data with detailed columns
const instructorPerformanceData = [
  { id: "1", courseName: "Data Structures and Algorithms", instructorName: "Dr. Piyawat Lertsithichai", section: "4COM1", actualHours: 48, atRiskCount: 2, attendanceCount: 42, droppedCount: 1, resignedCount: 0 },
  { id: "2", courseName: "Data Structures and Algorithms", instructorName: "Dr. Piyawat Lertsithichai", section: "4COM2", actualHours: 48, atRiskCount: 3, attendanceCount: 40, droppedCount: 2, resignedCount: 0 },
  { id: "3", courseName: "Web Application Development", instructorName: "Assoc. Prof. Waraporn Narongrit", section: "4IT_1", actualHours: 48, atRiskCount: 1, attendanceCount: 44, droppedCount: 0, resignedCount: 1 },
  { id: "4", courseName: "Web Application Development", instructorName: "Assoc. Prof. Waraporn Narongrit", section: "4IT_2", actualHours: 45, atRiskCount: 2, attendanceCount: 41, droppedCount: 1, resignedCount: 0 },
  { id: "5", courseName: "Software Engineering", instructorName: "Dr. Chaiwat Suttipong", section: "4COM1", actualHours: 42, atRiskCount: 4, attendanceCount: 38, droppedCount: 2, resignedCount: 1 },
  { id: "6", courseName: "Database Systems", instructorName: "Dr. Somchai Prasert", section: "4IT_1", actualHours: 36, atRiskCount: 5, attendanceCount: 35, droppedCount: 3, resignedCount: 2 },
  { id: "7", courseName: "Computer Networks", instructorName: "Asst. Prof. Napat Thongrak", section: "3COM1", actualHours: 21, atRiskCount: 8, attendanceCount: 30, droppedCount: 5, resignedCount: 3 },
  { id: "8", courseName: "System Analysis", instructorName: "Dr. Kanya Rattanakul", section: "3IT_1", actualHours: 48, atRiskCount: 0, attendanceCount: 45, droppedCount: 0, resignedCount: 0 },
  { id: "9", courseName: "Operating Systems", instructorName: "Dr. Prasit Suksawat", section: "3COM2", actualHours: 45, atRiskCount: 2, attendanceCount: 43, droppedCount: 1, resignedCount: 0 },
  { id: "10", courseName: "Artificial Intelligence", instructorName: "Dr. Arisa Petcharat", section: "4IT_2", actualHours: 48, atRiskCount: 1, attendanceCount: 42, droppedCount: 0, resignedCount: 0 },
];

// Student Status Distribution (based on 1,233 total students)
const studentStatusDistribution = [
  { name: "Active Students", value: 1156, percentage: 93.8, color: "hsl(142, 76%, 36%)" },
  { name: "Dropped Students", value: 52, percentage: 4.2, color: "hsl(38, 92%, 50%)" },
  { name: "Resigned/Withdrawn", value: 25, percentage: 2.0, color: "hsl(0, 84%, 60%)" },
];

// Section-wise demographic data with proper structure
const sectionDemographicData = [
  { no: 1, section: "4COM1", droppedMale: 2, droppedFemale: 1, resignedMale: 0, resignedFemale: 1, activeMale: 25, activeFemale: 18, total: 47 },
  { no: 2, section: "4COM2", droppedMale: 1, droppedFemale: 2, resignedMale: 1, resignedFemale: 0, activeMale: 22, activeFemale: 20, total: 46 },
  { no: 3, section: "4IT_1", droppedMale: 3, droppedFemale: 0, resignedMale: 0, resignedFemale: 1, activeMale: 20, activeFemale: 22, total: 46 },
  { no: 4, section: "4IT_2", droppedMale: 1, droppedFemale: 1, resignedMale: 0, resignedFemale: 0, activeMale: 18, activeFemale: 25, total: 45 },
  { no: 5, section: "3COM1", droppedMale: 2, droppedFemale: 2, resignedMale: 1, resignedFemale: 0, activeMale: 28, activeFemale: 16, total: 49 },
  { no: 6, section: "3COM2", droppedMale: 0, droppedFemale: 1, resignedMale: 0, resignedFemale: 0, activeMale: 24, activeFemale: 22, total: 47 },
  { no: 7, section: "3IT_1", droppedMale: 1, droppedFemale: 0, resignedMale: 1, resignedFemale: 0, activeMale: 21, activeFemale: 24, total: 47 },
  { no: 8, section: "3IT_2", droppedMale: 2, droppedFemale: 1, resignedMale: 0, resignedFemale: 1, activeMale: 19, activeFemale: 26, total: 49 },
];

// Enhanced at-risk students data with specific majors
const atRiskStudents = [
  { id: "1", studentCode: "65070005", name: "Wilai Charoen", course: "CS301 - Data Structures", section: "4COM2", major: "Computer Engineering", phone: "081-234-5678", email: "wilai.c@student.ceit.edu", absences: 5, percentage: 58 },
  { id: "2", studentCode: "65070009", name: "Thawee Somjai", course: "CS301 - Data Structures", section: "4COM2", major: "Computer Engineering", phone: "082-345-6789", email: "thawee.s@student.ceit.edu", absences: 6, percentage: 50 },
  { id: "3", studentCode: "65070004", name: "Supachai Khunpol", course: "IT301 - Web Development", section: "4IT_1", major: "Information Technology", phone: "083-456-7890", email: "supachai.k@student.ceit.edu", absences: 5, percentage: 58 },
  { id: "4", studentCode: "65070015", name: "Pranee Wongsiri", course: "CS401 - Software Engineering", section: "4COM1", major: "Computer Engineering", phone: "084-567-8901", email: "pranee.w@student.ceit.edu", absences: 7, percentage: 42 },
  { id: "5", studentCode: "65070022", name: "Narong Tanaka", course: "IT401 - Database Systems", section: "4IT_2", major: "Information Technology", phone: "085-678-9012", email: "narong.t@student.ceit.edu", absences: 5, percentage: 58 },
  { id: "6", studentCode: "65070031", name: "Kanya Rattanakul", course: "CS201 - Computer Networks", section: "3COM1", major: "Computer Engineering", phone: "086-789-0123", email: "kanya.r@student.ceit.edu", absences: 8, percentage: 33 },
  { id: "7", studentCode: "65070044", name: "Prasit Suksawat", course: "CS201 - Computer Networks", section: "3COM1", major: "Computer Engineering", phone: "087-890-1234", email: "prasit.s@student.ceit.edu", absences: 6, percentage: 50 },
];

const reports = [
  {
    id: "instructor",
    title: "Instructor Teaching Log",
    titleThai: "KPI การสอนของครู",
    description: "Teaching frequency distribution and instructor performance",
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

const CustomBarLabel = (props: any) => {
  const { x, y, width, value, percentage } = props;
  if (value === 0) return null;
  return (
    <text x={x + width / 2} y={y - 8} fill="hsl(var(--foreground))" textAnchor="middle" fontSize={11}>
      {value} ({percentage}%)
    </text>
  );
};

export function AdminReports() {
  const [atRiskDialogOpen, setAtRiskDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedSemester, setSelectedSemester] = useState("1");

  const handleExport = (format: "excel" | "pdf", reportName: string) => {
    toast({
      title: `Export ${reportName}`,
      description: `Preparing ${format.toUpperCase()} download...`,
    });
  };

  const totalCourses = teachingFrequencyData.reduce((acc, d) => acc + d.count, 0);
  
  const totalDropped = sectionDemographicData.reduce((acc, s) => acc + s.droppedMale + s.droppedFemale, 0);
  const totalResigned = sectionDemographicData.reduce((acc, s) => acc + s.resignedMale + s.resignedFemale, 0);
  const totalActive = sectionDemographicData.reduce((acc, s) => acc + s.activeMale + s.activeFemale, 0);

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Academic Reports</h2>
          <p className="text-muted-foreground mt-1">CEIT Department Report Center</p>
        </div>
        
        {/* Year/Semester Selector */}
        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Year:</span>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Semester:</span>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
                      <DialogContent className="bg-card max-w-7xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{report.title}</DialogTitle>
                          <DialogDescription>Semester {selectedSemester}/{selectedYear} - CEIT Department</DialogDescription>
                        </DialogHeader>
                        <div className="pt-4">
                          {/* Instructor Teaching Log with Teaching Frequency Bar Chart */}
                          {report.id === "instructor" && (
                            <div className="space-y-6">
                              {/* Header Stats */}
                              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                                <h3 className="text-2xl font-bold text-primary">Total Courses: {totalCourses}</h3>
                                <p className="text-muted-foreground">Teaching Frequency Distribution Analysis</p>
                              </div>

                              {/* Teaching Frequency Bar Chart */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                  <BarChart3 className="h-5 w-5 text-primary" />
                                  Teaching Frequency Distribution (Sessions 0-16)
                                </h4>
                                <div className="h-80">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={teachingFrequencyData} margin={{ top: 30, right: 20, left: 20, bottom: 20 }}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                      <XAxis 
                                        dataKey="sessions" 
                                        stroke="hsl(var(--muted-foreground))"
                                        label={{ value: 'Sessions Taught', position: 'bottom', offset: 0 }}
                                      />
                                      <YAxis 
                                        stroke="hsl(var(--muted-foreground))"
                                        label={{ value: 'Number of Courses', angle: -90, position: 'insideLeft' }}
                                      />
                                      <Tooltip 
                                        contentStyle={{ 
                                          backgroundColor: "hsl(var(--card))", 
                                          border: "1px solid hsl(var(--border))",
                                          borderRadius: "8px"
                                        }}
                                        formatter={(value: number, name: string, props: any) => [
                                          `${value} Courses (${props.payload.percentage}%)`,
                                          `${props.payload.sessions} Sessions`
                                        ]}
                                      />
                                      <Bar 
                                        dataKey="count" 
                                        radius={[4, 4, 0, 0]}
                                        fill="hsl(var(--primary))"
                                      >
                                        {teachingFrequencyData.map((entry, index) => (
                                          <Cell 
                                            key={`cell-${index}`} 
                                            fill={
                                              entry.sessions === 16 ? "hsl(142, 76%, 36%)" :
                                              entry.sessions >= 13 ? "hsl(142, 76%, 50%)" :
                                              entry.sessions >= 8 ? "hsl(48, 96%, 53%)" :
                                              entry.sessions >= 4 ? "hsl(38, 92%, 50%)" :
                                              "hsl(0, 84%, 60%)"
                                            } 
                                          />
                                        ))}
                                        <LabelList 
                                          dataKey="count" 
                                          position="top" 
                                          content={(props: any) => {
                                            const { x, y, width, value, index } = props;
                                            if (value === 0) return null;
                                            const entry = teachingFrequencyData[index];
                                            return (
                                              <text 
                                                x={x + width / 2} 
                                                y={y - 5} 
                                                fill="hsl(var(--foreground))" 
                                                textAnchor="middle" 
                                                fontSize={9}
                                              >
                                                {value} ({entry.percentage}%)
                                              </text>
                                            );
                                          }}
                                        />
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(142, 76%, 36%)" }}></div>
                                    <span className="text-xs">16 Sessions (Perfect)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(142, 76%, 50%)" }}></div>
                                    <span className="text-xs">13-15 Sessions</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(48, 96%, 53%)" }}></div>
                                    <span className="text-xs">8-12 Sessions</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(38, 92%, 50%)" }}></div>
                                    <span className="text-xs">4-7 Sessions</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded" style={{ backgroundColor: "hsl(0, 84%, 60%)" }}></div>
                                    <span className="text-xs">0-3 Sessions</span>
                                  </div>
                                </div>
                              </Card>

                              {/* Instructor Performance Table */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">Instructor Performance Table</h4>
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="table-header">
                                        <TableHead className="w-12">No.</TableHead>
                                        <TableHead>Course Name</TableHead>
                                        <TableHead>Instructor Name</TableHead>
                                        <TableHead className="text-center">Section</TableHead>
                                        <TableHead className="text-center">Actual Hours</TableHead>
                                        <TableHead className="text-center">At-Risk</TableHead>
                                        <TableHead className="text-center">Attendance</TableHead>
                                        <TableHead className="text-center">Dropped</TableHead>
                                        <TableHead className="text-center">Resigned</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {instructorPerformanceData.map((row, index) => (
                                        <TableRow key={row.id}>
                                          <TableCell>{index + 1}</TableCell>
                                          <TableCell className="font-medium">{row.courseName}</TableCell>
                                          <TableCell>{row.instructorName}</TableCell>
                                          <TableCell className="text-center font-mono">{row.section}</TableCell>
                                          <TableCell className="text-center">
                                            <span className={row.actualHours >= 48 ? "text-success font-semibold" : row.actualHours >= 36 ? "text-warning" : "text-destructive"}>
                                              {row.actualHours}
                                            </span>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <Badge variant={row.atRiskCount > 3 ? "destructive" : row.atRiskCount > 0 ? "secondary" : "outline"}>
                                              {row.atRiskCount}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-center text-success font-medium">{row.attendanceCount}</TableCell>
                                          <TableCell className="text-center">
                                            <span className="text-orange-500 font-medium">{row.droppedCount}</span>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <span className="text-destructive font-medium">{row.resignedCount}</span>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
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
                                    <p className="text-2xl font-bold">{totalCourses}</p>
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
                                <h4 className="font-semibold mb-4">Section-wise Gender Breakdown (รายงานแยกเพศรายห้อง)</h4>
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="table-header">
                                        <TableHead rowSpan={2} className="align-middle w-12">No.</TableHead>
                                        <TableHead rowSpan={2} className="align-middle">Section Name</TableHead>
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
                                      {sectionDemographicData.map((section) => {
                                        const droppedTotal = section.droppedMale + section.droppedFemale + section.resignedMale + section.resignedFemale;
                                        const activeTotal = section.activeMale + section.activeFemale;
                                        return (
                                          <TableRow key={section.section}>
                                            <TableCell>{section.no}</TableCell>
                                            <TableCell className="font-medium">{section.section}</TableCell>
                                            <TableCell className="text-center text-orange-500">{section.droppedMale + section.resignedMale}</TableCell>
                                            <TableCell className="text-center text-orange-500">{section.droppedFemale + section.resignedFemale}</TableCell>
                                            <TableCell className="text-center font-semibold text-orange-500 border-r border-border">
                                              {droppedTotal}
                                            </TableCell>
                                            <TableCell className="text-center text-success">{section.activeMale}</TableCell>
                                            <TableCell className="text-center text-success">{section.activeFemale}</TableCell>
                                            <TableCell className="text-center font-semibold text-success border-r border-border">
                                              {activeTotal}
                                            </TableCell>
                                            <TableCell className="text-center font-bold">{section.total}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                      <TableRow className="bg-muted/50 font-bold">
                                        <TableCell></TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell className="text-center text-orange-500">
                                          {sectionDemographicData.reduce((acc, s) => acc + s.droppedMale + s.resignedMale, 0)}
                                        </TableCell>
                                        <TableCell className="text-center text-orange-500">
                                          {sectionDemographicData.reduce((acc, s) => acc + s.droppedFemale + s.resignedFemale, 0)}
                                        </TableCell>
                                        <TableCell className="text-center text-orange-500 border-r border-border">
                                          {totalDropped + totalResigned}
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
                                </div>
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

      {/* At-Risk Dialog with Enhanced Details */}
      <Dialog open={atRiskDialogOpen} onOpenChange={setAtRiskDialogOpen}>
        <DialogContent className="bg-card max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              At-Risk Students Detail (เจาะลึกกลุ่มเสี่ยง)
            </DialogTitle>
            <DialogDescription>
              Semester {selectedSemester}/{selectedYear} - Students with more than 4 absences in any subject
            </DialogDescription>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="table-header">
                    <TableHead className="w-12">No.</TableHead>
                    <TableHead>Student ID</TableHead>
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
                  {atRiskStudents.map((student, index) => (
                    <TableRow key={student.id} className="bg-destructive/5">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-mono">{student.studentCode}</TableCell>
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
    </div>
  );
}
