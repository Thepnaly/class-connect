import { useState } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, FileText, Eye, Users, AlertTriangle, GraduationCap, PieChart, BarChart3, Calendar, TrendingUp, Award, BookX, Building2, Pencil, ChevronRight, History } from "lucide-react";
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  LabelList,
  LineChart,
  Line
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

// Instructor performance data with detailed columns (grouped by instructor)
const instructorPerformanceData = [
  { id: "1", courseName: "Data Structures and Algorithms", instructorName: "Dr. Piyawat Lertsithichai", section: "4COM1", actualHours: 48, atRiskCount: 2, attendanceCount: 42, droppedCount: 1, resignedCount: 0, checkInMethod: "Face", edited: true, editedOn: "Oct 12, 10:45", studentsModified: 3, editorRole: "teacher" as const },
  { id: "2", courseName: "Data Structures and Algorithms", instructorName: "Dr. Piyawat Lertsithichai", section: "4COM2", actualHours: 48, atRiskCount: 3, attendanceCount: 40, droppedCount: 2, resignedCount: 0, checkInMethod: "Code", edited: true, editedOn: "Oct 10, 14:30", studentsModified: 5, editorRole: "admin" as const },
  { id: "3", courseName: "Database Management Systems", instructorName: "Dr. Piyawat Lertsithichai", section: "4IT_1", actualHours: 45, atRiskCount: 1, attendanceCount: 44, droppedCount: 0, resignedCount: 1, checkInMethod: "Face", edited: true, editedOn: "Oct 8, 16:20", studentsModified: 2, editorRole: "teacher" as const },
  { id: "4", courseName: "Web Application Development", instructorName: "Assoc. Prof. Waraporn Narongrit", section: "4IT_1", actualHours: 48, atRiskCount: 1, attendanceCount: 44, droppedCount: 0, resignedCount: 1, checkInMethod: "Code", edited: false, editedOn: null, studentsModified: 0, editorRole: null },
  { id: "5", courseName: "Web Application Development", instructorName: "Assoc. Prof. Waraporn Narongrit", section: "4IT_2", actualHours: 45, atRiskCount: 2, attendanceCount: 41, droppedCount: 1, resignedCount: 0, checkInMethod: "Manual", edited: true, editedOn: "Oct 12, 09:15", studentsModified: 3, editorRole: "admin" as const },
  { id: "6", courseName: "Software Engineering", instructorName: "Dr. Chaiwat Suttipong", section: "4COM1", actualHours: 42, atRiskCount: 4, attendanceCount: 38, droppedCount: 2, resignedCount: 1, checkInMethod: "Face", edited: false, editedOn: null, studentsModified: 0, editorRole: null },
  { id: "7", courseName: "Computer Networks", instructorName: "Asst. Prof. Napat Thongrak", section: "3COM1", actualHours: 21, atRiskCount: 8, attendanceCount: 30, droppedCount: 5, resignedCount: 3, checkInMethod: "Code", edited: false, editedOn: null, studentsModified: 0, editorRole: null },
  { id: "8", courseName: "System Analysis", instructorName: "Dr. Kanya Rattanakul", section: "3IT_1", actualHours: 48, atRiskCount: 0, attendanceCount: 45, droppedCount: 0, resignedCount: 0, checkInMethod: "Face", edited: false, editedOn: null, studentsModified: 0, editorRole: null },
  { id: "9", courseName: "Operating Systems", instructorName: "Dr. Prasit Suksawat", section: "3COM2", actualHours: 45, atRiskCount: 2, attendanceCount: 43, droppedCount: 1, resignedCount: 0, checkInMethod: "Manual", edited: false, editedOn: null, studentsModified: 0, editorRole: null },
  { id: "10", courseName: "Artificial Intelligence", instructorName: "Dr. Arisa Petcharat", section: "4IT_2", actualHours: 48, atRiskCount: 1, attendanceCount: 42, droppedCount: 0, resignedCount: 0, checkInMethod: "Face", edited: false, editedOn: null, studentsModified: 0, editorRole: null },
];

// Group instructors for row grouping
const groupedInstructors = instructorPerformanceData.reduce((acc, item) => {
  if (!acc[item.instructorName]) {
    acc[item.instructorName] = [];
  }
  acc[item.instructorName].push(item);
  return acc;
}, {} as Record<string, typeof instructorPerformanceData>);

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

// Section statistics with attendance data
const sectionStatistics = [
  { section: "4COM1", attendanceRate: 92, absenceRate: 5, lateRate: 3, totalStudents: 47, major: "Computer Engineering" },
  { section: "4COM2", attendanceRate: 88, absenceRate: 8, lateRate: 4, totalStudents: 46, major: "Computer Engineering" },
  { section: "4IT_1", attendanceRate: 85, absenceRate: 10, lateRate: 5, totalStudents: 46, major: "Information Technology" },
  { section: "4IT_2", attendanceRate: 78, absenceRate: 15, lateRate: 7, totalStudents: 45, major: "Information Technology" },
  { section: "3COM1", attendanceRate: 75, absenceRate: 18, lateRate: 7, totalStudents: 49, major: "Computer Engineering" },
  { section: "3COM2", attendanceRate: 90, absenceRate: 6, lateRate: 4, totalStudents: 47, major: "Computer Engineering" },
  { section: "3IT_1", attendanceRate: 82, absenceRate: 12, lateRate: 6, totalStudents: 47, major: "Information Technology" },
  { section: "3IT_2", attendanceRate: 55, absenceRate: 35, lateRate: 10, totalStudents: 49, major: "Information Technology" },
];

// Top 3 courses with highest absences
const problematicCourses = [
  { rank: 1, courseName: "Computer Networks", courseCode: "CS201", section: "3COM1", totalAbsences: 156, instructor: "Asst. Prof. Napat Thongrak" },
  { rank: 2, courseName: "Operating Systems", courseCode: "CS401", section: "3IT_2", totalAbsences: 142, instructor: "Dr. Prasit Suksawat" },
  { rank: 3, courseName: "Software Engineering", courseCode: "CS401", section: "4COM1", totalAbsences: 98, instructor: "Dr. Chaiwat Suttipong" },
];

// Year-level comparison data
const yearLevelData = [
  { year: "Year 1", major: "Computer Engineering", avgAttendance: 88, absenceRate: 12 },
  { year: "Year 1", major: "Information Technology", avgAttendance: 85, absenceRate: 15 },
  { year: "Year 2", major: "Computer Engineering", avgAttendance: 86, absenceRate: 14 },
  { year: "Year 2", major: "Information Technology", avgAttendance: 82, absenceRate: 18 },
  { year: "Year 3", major: "Computer Engineering", avgAttendance: 84, absenceRate: 16 },
  { year: "Year 3", major: "Information Technology", avgAttendance: 79, absenceRate: 21 },
  { year: "Year 4", major: "Computer Engineering", avgAttendance: 91, absenceRate: 9 },
  { year: "Year 4", major: "Information Technology", avgAttendance: 88, absenceRate: 12 },
];

// Semester trend data
const semesterTrendData = [
  { week: "Week 1", year1: 95, year2: 93, year3: 90, year4: 94 },
  { week: "Week 2", year1: 92, year2: 90, year3: 88, year4: 92 },
  { week: "Week 3", year1: 90, year2: 88, year3: 85, year4: 91 },
  { week: "Week 4", year1: 88, year2: 86, year3: 82, year4: 90 },
  { week: "Week 5", year1: 87, year2: 84, year3: 80, year4: 89 },
  { week: "Week 6", year1: 85, year2: 82, year3: 78, year4: 88 },
  { week: "Week 7", year1: 86, year2: 83, year3: 79, year4: 89 },
  { week: "Week 8", year1: 88, year2: 85, year3: 81, year4: 91 },
  { week: "Week 9", year1: 89, year2: 86, year3: 82, year4: 92 },
  { week: "Week 10", year1: 90, year2: 87, year3: 83, year4: 93 },
  { week: "Week 11", year1: 88, year2: 85, year3: 80, year4: 91 },
  { week: "Week 12", year1: 85, year2: 82, year3: 77, year4: 89 },
  { week: "Week 13", year1: 82, year2: 79, year3: 74, year4: 87 },
  { week: "Week 14", year1: 80, year2: 77, year3: 72, year4: 85 },
  { week: "Week 15", year1: 78, year2: 75, year3: 70, year4: 83 },
  { week: "Week 16", year1: 85, year2: 82, year3: 78, year4: 90 },
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
    id: "department-overview",
    title: "Departmental Overview & Trends",
    description: "Year-level comparison, trends, and departmental highlights",
    icon: Building2,
  },
  {
    id: "class-summary",
    title: "Class Summary Report",
    description: "Section statistics with attendance rates and problematic courses",
    icon: BarChart3,
  },
  {
    id: "instructor",
    title: "Instructor Teaching Log",
    description: "Teaching frequency distribution and instructor performance",
    icon: GraduationCap,
  },
  {
    id: "department",
    title: "Student Status Distribution",
    description: "Active, dropped, and resigned student counts",
    icon: PieChart,
  },
  {
    id: "section-demographic",
    title: "Section Demographics",
    description: "Gender breakdown by section",
    icon: Users,
  },
  {
    id: "at-risk",
    title: "Risk Watch",
    description: "Students with more than 4 absences",
    icon: AlertTriangle,
  },
];

// Mock audit history data - multiple dates with edits (now includes editor role)
const auditHistoryData: Record<string, { date: string; displayDate: string; studentsModified: number; students: Array<{ id: string; studentCode: string; name: string; status: string; time: string; edited: boolean; editorRole?: 'admin' | 'teacher' }> }[]> = {
  "4COM1": [
    {
      date: "2024-10-12",
      displayDate: "October 12, 2024",
      studentsModified: 3,
      students: [
        { id: "1", studentCode: "65070001", name: "Somsak Prasert", status: "present", time: "09:05", edited: false },
        { id: "2", studentCode: "65070002", name: "Wilawan Thongchai", status: "present", time: "09:02", edited: false },
        { id: "3", studentCode: "65070003", name: "Kittipong Somjai", status: "late", time: "09:25", edited: true, editorRole: "teacher" },
        { id: "4", studentCode: "65070004", name: "Pranee Rattana", status: "present", time: "09:01", edited: false },
        { id: "5", studentCode: "65070005", name: "Thanawat Khunpol", status: "absent", time: "-", edited: true, editorRole: "admin" },
        { id: "6", studentCode: "65070006", name: "Napat Suksawat", status: "present", time: "09:03", edited: false },
        { id: "7", studentCode: "65070007", name: "Arisa Wongsiri", status: "present", time: "09:00", edited: false },
        { id: "8", studentCode: "65070008", name: "Chaiwat Tanaka", status: "excused", time: "-", edited: true, editorRole: "teacher" },
        { id: "9", studentCode: "65070009", name: "Kanya Petcharat", status: "present", time: "09:04", edited: false },
        { id: "10", studentCode: "65070010", name: "Prasit Lertsithichai", status: "present", time: "09:06", edited: false },
      ]
    },
    {
      date: "2024-10-08",
      displayDate: "October 8, 2024",
      studentsModified: 2,
      students: [
        { id: "1", studentCode: "65070001", name: "Somsak Prasert", status: "present", time: "09:00", edited: false },
        { id: "2", studentCode: "65070002", name: "Wilawan Thongchai", status: "late", time: "09:18", edited: true, editorRole: "admin" },
        { id: "3", studentCode: "65070003", name: "Kittipong Somjai", status: "present", time: "09:02", edited: false },
        { id: "4", studentCode: "65070004", name: "Pranee Rattana", status: "present", time: "09:01", edited: false },
        { id: "5", studentCode: "65070005", name: "Thanawat Khunpol", status: "present", time: "09:05", edited: false },
        { id: "6", studentCode: "65070006", name: "Napat Suksawat", status: "excused", time: "-", edited: true, editorRole: "teacher" },
        { id: "7", studentCode: "65070007", name: "Arisa Wongsiri", status: "present", time: "09:03", edited: false },
        { id: "8", studentCode: "65070008", name: "Chaiwat Tanaka", status: "present", time: "09:04", edited: false },
        { id: "9", studentCode: "65070009", name: "Kanya Petcharat", status: "present", time: "09:01", edited: false },
        { id: "10", studentCode: "65070010", name: "Prasit Lertsithichai", status: "present", time: "09:02", edited: false },
      ]
    }
  ],
  "4COM2": [
    {
      date: "2024-10-10",
      displayDate: "October 10, 2024",
      studentsModified: 5,
      students: [
        { id: "1", studentCode: "65070011", name: "Somchai Jaidee", status: "late", time: "09:20", edited: true, editorRole: "teacher" },
        { id: "2", studentCode: "65070012", name: "Nattaya Sombat", status: "present", time: "09:02", edited: false },
        { id: "3", studentCode: "65070013", name: "Wichai Korn", status: "absent", time: "-", edited: true, editorRole: "admin" },
        { id: "4", studentCode: "65070014", name: "Suporn Chai", status: "excused", time: "-", edited: true, editorRole: "teacher" },
        { id: "5", studentCode: "65070015", name: "Narong Suk", status: "present", time: "09:05", edited: false },
        { id: "6", studentCode: "65070016", name: "Pakorn Wang", status: "late", time: "09:25", edited: true, editorRole: "admin" },
        { id: "7", studentCode: "65070017", name: "Siriporn Lee", status: "present", time: "09:00", edited: false },
        { id: "8", studentCode: "65070018", name: "Thawee Prasit", status: "absent", time: "-", edited: true, editorRole: "teacher" },
      ]
    }
  ],
  "4IT_1": [
    {
      date: "2024-10-08",
      displayDate: "October 8, 2024",
      studentsModified: 2,
      students: [
        { id: "1", studentCode: "65070021", name: "Kamon Rattana", status: "present", time: "09:00", edited: false },
        { id: "2", studentCode: "65070022", name: "Suwanna Chai", status: "late", time: "09:15", edited: true, editorRole: "teacher" },
        { id: "3", studentCode: "65070023", name: "Boonchai Wang", status: "present", time: "09:02", edited: false },
        { id: "4", studentCode: "65070024", name: "Malai Suk", status: "excused", time: "-", edited: true, editorRole: "admin" },
      ]
    }
  ],
};

interface AdminReportsProps {
  initialFilter?: { lowAttendance?: boolean };
}

export function AdminReports({ initialFilter }: AdminReportsProps = {}) {
  const [atRiskDialogOpen, setAtRiskDialogOpen] = useState(initialFilter?.lowAttendance || false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [compareYear, setCompareYear] = useState<string | null>(null);
  const [auditHistoryModalOpen, setAuditHistoryModalOpen] = useState(false);
  const [classDetailModalOpen, setClassDetailModalOpen] = useState(false);
  const [selectedAuditSection, setSelectedAuditSection] = useState<string | null>(null);
  const [selectedAuditDate, setSelectedAuditDate] = useState<{ date: string; displayDate: string; studentsModified: number; students: Array<{ id: string; studentCode: string; name: string; status: string; time: string; edited: boolean; editorRole?: 'admin' | 'teacher' }> } | null>(null);

  const handleAuditBadgeClick = (section: string) => {
    setSelectedAuditSection(section);
    setAuditHistoryModalOpen(true);
  };

  const handleDateClick = (dateEntry: typeof selectedAuditDate) => {
    setSelectedAuditDate(dateEntry);
    setAuditHistoryModalOpen(false);
    setClassDetailModalOpen(true);
  };

  const handleBackToHistory = () => {
    setClassDetailModalOpen(false);
    setAuditHistoryModalOpen(true);
  };

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

  const getAttendanceColor = (rate: number) => {
    if (rate >= 80) return "text-success bg-success/10";
    if (rate >= 60) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Academic Reports</h2>
          <p className="text-muted-foreground mt-1">CEIT Department Report Center</p>
        </div>
        
        {/* Year/Semester Selector - No Compare dropdown */}
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
                    report.id === "at-risk" ? "bg-destructive/10" : 
                    report.id === "department-overview" ? "bg-info/10" : "bg-primary/10"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      report.id === "at-risk" ? "text-destructive" : 
                      report.id === "department-overview" ? "text-info" : "text-primary"
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
                          {/* Departmental Overview & Trends */}
                          {report.id === "department-overview" && (
                            <div className="space-y-6">
                              {/* Year-Level Comparison */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                  <TrendingUp className="h-5 w-5 text-info" />
                                  Year-Level Comparison (Year 1-4)
                                </h4>
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="table-header">
                                        <TableHead>Year Level</TableHead>
                                        <TableHead>Major</TableHead>
                                        <TableHead className="text-center">Avg. Attendance %</TableHead>
                                        <TableHead className="text-center">Absence %</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {yearLevelData.map((row, index) => (
                                        <TableRow key={index}>
                                          <TableCell className="font-medium">{row.year}</TableCell>
                                          <TableCell>
                                            <Badge variant="outline" className="text-xs">
                                              {row.major}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <span className={`font-semibold ${row.avgAttendance >= 85 ? "text-success" : row.avgAttendance >= 75 ? "text-warning" : "text-destructive"}`}>
                                              {row.avgAttendance}%
                                            </span>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <span className={`font-semibold ${row.absenceRate <= 12 ? "text-success" : row.absenceRate <= 18 ? "text-warning" : "text-destructive"}`}>
                                              {row.absenceRate}%
                                            </span>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </Card>

                              {/* Trend Analysis Graph */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                  <BarChart3 className="h-5 w-5 text-primary" />
                                  Semester Attendance Trends (Year 1 vs Year 4)
                                </h4>
                                <div className="h-80">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={semesterTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                      <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                                      <YAxis stroke="hsl(var(--muted-foreground))" domain={[60, 100]} />
                                      <Tooltip 
                                        contentStyle={{ 
                                          backgroundColor: "hsl(var(--card))", 
                                          border: "1px solid hsl(var(--border))",
                                          borderRadius: "8px"
                                        }}
                                      />
                                      <Legend />
                                      <Line type="monotone" dataKey="year1" name="Year 1" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ r: 3 }} />
                                      <Line type="monotone" dataKey="year2" name="Year 2" stroke="hsl(48, 96%, 53%)" strokeWidth={2} dot={{ r: 3 }} />
                                      <Line type="monotone" dataKey="year3" name="Year 3" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
                                      <Line type="monotone" dataKey="year4" name="Year 4" stroke="hsl(221, 83%, 53%)" strokeWidth={2} dot={{ r: 3 }} />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </Card>

                              {/* Departmental Highlights */}
                              <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4 border-success/30 bg-success/5">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                                      <Award className="h-5 w-5 text-success" />
                                    </div>
                                    <h4 className="font-semibold">Top Performing Section</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-2xl font-bold text-success">4COM1</p>
                                    <p className="text-sm text-muted-foreground">Computer Engineering - Year 4</p>
                                    <p className="text-lg font-semibold">92% Attendance Rate</p>
                                  </div>
                                </Card>
                                <Card className="p-4 border-destructive/30 bg-destructive/5">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                                      <BookX className="h-5 w-5 text-destructive" />
                                    </div>
                                    <h4 className="font-semibold">Most Absent Course</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-2xl font-bold text-destructive">CS201</p>
                                    <p className="text-sm text-muted-foreground">Computer Networks - 3COM1</p>
                                    <p className="text-lg font-semibold">156 Total Absences</p>
                                  </div>
                                </Card>
                              </div>

                              {/* Year Comparison Section - Only inside this report */}
                              <Card className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-info" />
                                    Year-over-Year Comparison
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Compare with:</span>
                                    <Select value={compareYear || ""} onValueChange={(val) => setCompareYear(val || null)}>
                                      <SelectTrigger className="w-28 h-8">
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="2022">2022</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                {compareYear && compareYear !== selectedYear ? (
                                  <>
                                    <div className="h-80">
                                      <ResponsiveContainer width="100%" height="100%">
                                        <BarChart 
                                          data={[
                                            { section: "4COM1", current: 92, compare: 88 },
                                            { section: "4COM2", current: 88, compare: 85 },
                                            { section: "4IT_1", current: 85, compare: 82 },
                                            { section: "4IT_2", current: 78, compare: 75 },
                                            { section: "3COM1", current: 75, compare: 80 },
                                            { section: "3COM2", current: 90, compare: 86 },
                                            { section: "3IT_1", current: 82, compare: 79 },
                                            { section: "3IT_2", current: 55, compare: 60 },
                                          ]} 
                                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                        >
                                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                          <XAxis dataKey="section" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                                          <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                                          <Tooltip 
                                            contentStyle={{ 
                                              backgroundColor: "hsl(var(--card))", 
                                              border: "1px solid hsl(var(--border))",
                                              borderRadius: "8px"
                                            }}
                                            formatter={(value: number, name: string) => [
                                              `${value}%`,
                                              name === 'current' ? `${selectedYear}` : `${compareYear}`
                                            ]}
                                          />
                                          <Legend 
                                            formatter={(value) => value === 'current' ? `${selectedYear}` : `${compareYear}`}
                                          />
                                          <Bar dataKey="current" fill="hsl(221, 83%, 53%)" name="current" radius={[4, 4, 0, 0]} />
                                          <Bar dataKey="compare" fill="hsl(var(--muted-foreground))" name="compare" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                      </ResponsiveContainer>
                                    </div>
                                    <p className="text-sm text-muted-foreground text-center mt-2">
                                      Side-by-side attendance rate comparison by section
                                    </p>
                                  </>
                                ) : (
                                  <div className="h-40 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                                    <p>Select a comparison year to view the chart</p>
                                  </div>
                                )}
                              </Card>
                            </div>
                          )}

                          {/* Class Summary Report */}
                          {report.id === "class-summary" && (
                            <div className="space-y-6">
                              {/* Section Statistics Table */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">Section Statistics</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Color coding: <span className="text-success font-medium">Green &gt;80%</span> | 
                                  <span className="text-warning font-medium ml-2">Yellow 60-80%</span> | 
                                  <span className="text-destructive font-medium ml-2">Red &lt;60%</span>
                                </p>
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="table-header">
                                        <TableHead>Section</TableHead>
                                        <TableHead>Major</TableHead>
                                        <TableHead className="text-center">Total Students</TableHead>
                                        <TableHead className="text-center">Attendance %</TableHead>
                                        <TableHead className="text-center">Absence %</TableHead>
                                        <TableHead className="text-center">Late %</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {sectionStatistics.map((section) => (
                                        <TableRow key={section.section}>
                                          <TableCell className="font-medium font-mono">{section.section}</TableCell>
                                          <TableCell>
                                            <Badge variant="outline" className="text-xs">
                                              {section.major}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-center">{section.totalStudents}</TableCell>
                                          <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded font-semibold ${getAttendanceColor(section.attendanceRate)}`}>
                                              {section.attendanceRate}%
                                            </span>
                                          </TableCell>
                                          <TableCell className="text-center">
                                            <span className={`font-medium ${section.absenceRate <= 10 ? "text-success" : section.absenceRate <= 20 ? "text-warning" : "text-destructive"}`}>
                                              {section.absenceRate}%
                                            </span>
                                          </TableCell>
                                          <TableCell className="text-center text-muted-foreground">{section.lateRate}%</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </Card>

                              {/* Problematic Courses */}
                              <Card className="p-4 border-destructive/20">
                                <h4 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
                                  <AlertTriangle className="h-5 w-5" />
                                  Top 3 Courses with Highest Absences
                                </h4>
                                <div className="overflow-x-auto">
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="table-header">
                                        <TableHead className="w-16">Rank</TableHead>
                                        <TableHead>Course Code</TableHead>
                                        <TableHead>Course Name</TableHead>
                                        <TableHead>Section</TableHead>
                                        <TableHead>Instructor</TableHead>
                                        <TableHead className="text-center">Total Absences</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {problematicCourses.map((course) => (
                                        <TableRow key={course.rank} className="bg-destructive/5">
                                          <TableCell>
                                            <Badge variant="destructive" className="text-sm">
                                              #{course.rank}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="font-mono font-medium">{course.courseCode}</TableCell>
                                          <TableCell>{course.courseName}</TableCell>
                                          <TableCell className="font-mono">{course.section}</TableCell>
                                          <TableCell>{course.instructor}</TableCell>
                                          <TableCell className="text-center">
                                            <span className="text-destructive font-bold text-lg">{course.totalAbsences}</span>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </Card>
                            </div>
                          )}

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

                              {/* Instructor Performance Table with Row Grouping and Vertical Spanning */}
                              <Card className="p-4">
                                <h4 className="font-semibold mb-4">Instructor Performance Table (Grouped by Name)</h4>
                                <div className="overflow-x-auto">
                                  <Table className="border-collapse">
                                    <TableHeader>
                                      <TableRow className="table-header">
                                        <TableHead className="w-12">No.</TableHead>
                                        <TableHead>Course Name</TableHead>
                                        <TableHead className="border-r border-border">Instructor Name</TableHead>
                                        <TableHead className="text-center">Teaching Section</TableHead>
                                        <TableHead className="text-center">Major</TableHead>
                                        <TableHead className="text-center">Actual Hours</TableHead>
                                        <TableHead className="text-center">At-Risk</TableHead>
                                        <TableHead className="text-center">Attendance</TableHead>
                                        <TableHead className="text-center">Dropped</TableHead>
                                        <TableHead className="text-center">Resigned</TableHead>
                                        <TableHead className="text-center">Check-in</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {Object.entries(groupedInstructors).map(([instructorName, instructorCourses], groupIndex) => (
                                        instructorCourses.map((row, rowIndex) => (
                                          <TableRow key={row.id} className={rowIndex === 0 ? "border-t-2 border-primary/30" : ""}>
                                            <TableCell className={rowIndex > 0 ? "border-t-0" : ""}>{instructorPerformanceData.findIndex(r => r.id === row.id) + 1}</TableCell>
                                            <TableCell className={`font-medium ${rowIndex > 0 ? "border-t-0" : ""}`}>{row.courseName}</TableCell>
                                            {rowIndex === 0 && (
                                              <TableCell 
                                                rowSpan={instructorCourses.length} 
                                                className="font-semibold bg-muted/30 align-middle text-center border-r border-border"
                                              >
                                                {instructorName}
                                              </TableCell>
                                            )}
                                            <TableCell className={`text-center font-mono ${rowIndex > 0 ? "border-t-0" : ""}`}>{row.section}</TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              <Badge variant="outline" className="text-xs">
                                                {row.section.includes("COM") ? "Computer Engineering" : "Information Technology"}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              <span className={row.actualHours >= 48 ? "text-success font-semibold" : row.actualHours >= 36 ? "text-warning" : "text-destructive"}>
                                                {row.actualHours}
                                              </span>
                                            </TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              <Badge variant={row.atRiskCount > 3 ? "destructive" : row.atRiskCount > 0 ? "secondary" : "outline"}>
                                                {row.atRiskCount}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className={`text-center text-success font-medium ${rowIndex > 0 ? "border-t-0" : ""}`}>{row.attendanceCount}</TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              <span className="text-orange-500 font-medium">{row.droppedCount}</span>
                                            </TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              <span className="text-destructive font-medium">{row.resignedCount}</span>
                                            </TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              <Badge variant="outline" className="text-xs">
                                                {row.checkInMethod}
                                              </Badge>
                                            </TableCell>
                                            <TableCell className={`text-center ${rowIndex > 0 ? "border-t-0" : ""}`}>
                                              {row.edited && row.editorRole ? (
                                                <TooltipProvider delayDuration={0}>
                                                  <ShadcnTooltip>
                                                    <TooltipTrigger asChild>
                                                      <Badge 
                                                        className={`text-xs gap-1.5 cursor-pointer transition-all duration-200 ${
                                                          row.editorRole === 'admin' 
                                                            ? "bg-destructive/20 text-destructive border border-destructive/50 hover:bg-destructive/30 hover:border-destructive hover:shadow-md dark:bg-destructive/30 dark:text-red-300 dark:border-destructive/60"
                                                            : "bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:border-primary hover:shadow-md dark:bg-primary/30 dark:text-blue-300 dark:border-primary/60"
                                                        }`}
                                                        onClick={() => handleAuditBadgeClick(row.section)}
                                                      >
                                                        <Pencil className="h-3 w-3" />
                                                        {row.editorRole === 'admin' ? 'Edited by Admin' : 'Edited by Teacher'}
                                                      </Badge>
                                                    </TooltipTrigger>
                                                    <TooltipContent 
                                                      side="top" 
                                                      className={`bg-popover border-2 p-3 shadow-xl rounded-lg ${
                                                        row.editorRole === 'admin' ? 'border-destructive/40' : 'border-primary/40'
                                                      }`}
                                                    >
                                                      <div className="text-sm">
                                                        <div className="flex items-center gap-2 mb-1">
                                                          <History className={`h-3.5 w-3.5 ${row.editorRole === 'admin' ? 'text-destructive' : 'text-primary'}`} />
                                                          <p className="font-semibold text-foreground">Edit History Available</p>
                                                        </div>
                                                        <p className="text-muted-foreground">
                                                          {auditHistoryData[row.section]?.length || 0} date(s) with modifications
                                                        </p>
                                                        <p className={`text-xs mt-1 font-medium ${row.editorRole === 'admin' ? 'text-destructive' : 'text-primary'}`}>
                                                          Click to view edit history →
                                                        </p>
                                                      </div>
                                                    </TooltipContent>
                                                  </ShadcnTooltip>
                                                </TooltipProvider>
                                              ) : row.actualHours === 0 ? (
                                                <Badge variant="destructive" className="text-xs">
                                                  No Teaching Conducted
                                                </Badge>
                                              ) : (
                                                <Badge variant="outline" className="text-xs text-success">
                                                  Active
                                                </Badge>
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))
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
                                <h4 className="font-semibold mb-4">Section-wise Gender Breakdown</h4>
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
                    className="border-green-500/50 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-600 dark:hover:bg-green-950/50"
                    title="Export to Excel"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleExport("pdf", report.title)}
                    className="border-red-500/50 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-600 dark:hover:bg-red-950/50"
                    title="Export to PDF"
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
              At-Risk Students Report
            </DialogTitle>
            <DialogDescription>
              Semester {selectedSemester}/{selectedYear} - Students with more than 4 absences (Read-only view)
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">{atRiskStudents.length} students at risk</span>
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
                    <TableHead>Room/Section</TableHead>
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
                      <TableCell className="font-mono text-sm">{student.studentCode}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        <span className="font-mono">301/{student.section}</span>
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

      {/* Edit History Log Modal - Step 1: Date Selection */}
      <Dialog open={auditHistoryModalOpen} onOpenChange={setAuditHistoryModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center dark:bg-sky-900/40">
                <History className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <span className="block">Edit History Log</span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Section {selectedAuditSection}
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Select a date to view the attendance record with modifications.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {selectedAuditSection && auditHistoryData[selectedAuditSection]?.map((dateEntry, index) => (
              <button
                key={dateEntry.date}
                onClick={() => handleDateClick(dateEntry)}
                className="w-full p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-sky-300 transition-all duration-200 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/40 transition-colors">
                    <Calendar className="h-5 w-5 text-muted-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{dateEntry.displayDate}</p>
                    <p className="text-sm text-muted-foreground">
                      {dateEntry.studentsModified} Student{dateEntry.studentsModified !== 1 ? 's' : ''} Modified
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
            {(!selectedAuditSection || !auditHistoryData[selectedAuditSection]?.length) && (
              <div className="p-8 text-center text-muted-foreground">
                No edit history found for this section.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Class Detail Modal - Step 2: Attendance Record */}
      <Dialog open={classDetailModalOpen} onOpenChange={setClassDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 p-0 rounded-lg"
                onClick={handleBackToHistory}
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>
              <div className="h-10 w-10 rounded-lg bg-sky-100 flex items-center justify-center dark:bg-sky-900/40">
                <Pencil className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <span className="block">Attendance Record - Section {selectedAuditSection}</span>
                <span className="block text-sm font-normal text-muted-foreground">
                  {selectedAuditDate?.displayDate} • {selectedAuditDate?.studentsModified} Students Modified
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Yellow highlighted rows indicate students whose attendance was manually modified by the instructor.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {selectedAuditDate?.displayDate}
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  09:00 - 12:00
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  Room: 301
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-3 w-6 rounded bg-yellow-100 border border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700"></div>
                <span>Modified by Teacher</span>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="table-header">
                    <TableHead className="w-12">No.</TableHead>
                    <TableHead>Student Code</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Check-in Time</TableHead>
                    <TableHead className="text-center">Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedAuditDate?.students.map((student, index) => (
                    <TableRow 
                      key={student.id} 
                      className={student.edited ? "bg-yellow-50 border-l-4 border-l-yellow-400 dark:bg-yellow-900/20 dark:border-l-yellow-600" : ""}
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-mono">{student.studentCode}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={student.status as any} />
                      </TableCell>
                      <TableCell className="text-center font-mono">{student.time}</TableCell>
                      <TableCell className="text-center">
                        {student.edited && (
                          <Badge 
                            className={`text-xs gap-1 ${
                              student.editorRole === 'admin'
                                ? "bg-destructive/20 text-destructive border border-destructive/50 dark:bg-destructive/30 dark:text-red-300"
                                : "bg-primary/20 text-primary border border-primary/50 dark:bg-primary/30 dark:text-blue-300"
                            }`}
                          >
                            <Pencil className="h-2.5 w-2.5" />
                            {student.editorRole === 'admin' ? 'Admin' : 'Teacher'}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 p-3 bg-muted/30 rounded-lg border flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">Summary:</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  Present: {selectedAuditDate?.students.filter(s => s.status === 'present').length || 0}
                </Badge>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                  Late: {selectedAuditDate?.students.filter(s => s.status === 'late').length || 0}
                </Badge>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                  Absent: {selectedAuditDate?.students.filter(s => s.status === 'absent').length || 0}
                </Badge>
                <Badge variant="outline" className="bg-info/10 text-info border-info/30">
                  Excused: {selectedAuditDate?.students.filter(s => s.status === 'excused').length || 0}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: {selectedAuditDate?.students.length || 0} students
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}