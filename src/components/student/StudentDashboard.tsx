import { useState, useEffect } from "react";
import { studentCourses, attendanceRecords, classDates, students } from "@/data/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, CheckCircle2, History, Clock, AlertCircle, Scan, Sparkles, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock schedule with time ranges
const courseSchedules = [
  { courseId: "1", day: "Monday", startHour: 9, endHour: 12, section: "4COM1" },
  { courseId: "3", day: "Tuesday", startHour: 9, endHour: 12, section: "4COM1" },
  { courseId: "4", day: "Thursday", startHour: 13, endHour: 16, section: "4COM1" },
];

// Mock attendance progress per course
const courseAttendanceProgress = [
  { courseId: "1", courseName: "Data Structures and Algorithms", courseCode: "CS301", present: 10, total: 12, percentage: 83 },
  { courseId: "3", courseName: "Web Application Development", courseCode: "IT301", present: 11, total: 12, percentage: 92 },
  { courseId: "4", courseName: "Software Engineering", courseCode: "CS401", present: 12, total: 12, percentage: 100 },
];

const getDayName = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
};

const getCurrentHour = () => new Date().getHours();

export function StudentDashboard() {
  const [checkInCode, setCheckInCode] = useState("");
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [aiCheckInSuccess, setAiCheckInSuccess] = useState(false);
  const [showAiAnimation, setShowAiAnimation] = useState(false);

  const student = students[0];
  const studentRecords = attendanceRecords.filter((r) => r.studentId === student.id);
  const activeClass = classDates.find((d) => d.isActive);
  const currentDay = getDayName();
  const currentHour = getCurrentHour();

  // Simulate AI detection after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!aiCheckInSuccess && !checkInSuccess) {
        setShowAiAnimation(true);
        setTimeout(() => {
          setAiCheckInSuccess(true);
          toast({
            title: "AI Check-in Successful!",
            description: "Face recognized and verified automatically.",
          });
        }, 2000);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [aiCheckInSuccess, checkInSuccess]);

  // Get today's classes with status
  const getTodaySchedule = () => {
    return courseSchedules
      .filter((s) => s.day === currentDay)
      .map((schedule) => {
        const course = studentCourses.find((c) => c.id === schedule.courseId);
        const isOngoing = currentHour >= schedule.startHour && currentHour < schedule.endHour;
        const isNext = currentHour < schedule.startHour;
        const isPast = currentHour >= schedule.endHour;
        return { ...schedule, course, isOngoing, isNext, isPast };
      })
      .sort((a, b) => a.startHour - b.startHour);
  };

  const todaySchedule = getTodaySchedule();
  const hasClassToday = todaySchedule.length > 0;
  const ongoingClass = todaySchedule.find((s) => s.isOngoing);

  const handleCheckIn = () => {
    if (checkInCode === "123456") {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      setCheckInTime(timeStr);
      setCheckInSuccess(true);
      toast({
        title: "Check-in Successful!",
        description: `You checked in at ${timeStr}`,
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter the correct 6-digit code from your teacher.",
        variant: "destructive",
      });
    }
  };

  const resetCheckIn = () => {
    setCheckInCode("");
    setCheckInSuccess(false);
    setCheckInTime("");
    setIsCheckInDialogOpen(false);
  };

  const getCourseName = (classDateId: string) => {
    const classDate = classDates.find((d) => d.id === classDateId);
    if (!classDate) return "Unknown Course";
    const course = studentCourses.find((c) => c.id === classDate.courseId);
    return course ? `${course.courseCode} - ${course.courseName}` : "Unknown Course";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    present: studentRecords.filter((r) => r.status === "O").length,
    late: studentRecords.filter((r) => r.status === "L").length,
    absent: studentRecords.filter((r) => r.status === "X").length,
    leave: studentRecords.filter((r) => r.status === "Y").length,
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-success";
    if (percentage >= 75) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="container py-8 px-4 animate-fade-in">
      {/* Profile Card */}
      <Card className="mb-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
              <p className="text-muted-foreground">
                {student.studentCode} • Year {student.year} - Class 2
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Major: Computer Engineering
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* AI Recognition Status Banner */}
      <div className="mb-6">
        {showAiAnimation && !aiCheckInSuccess && (
          <div className="bg-gradient-to-r from-primary/20 via-info/20 to-primary/20 rounded-xl p-6 border border-primary/30 animate-pulse">
            <div className="flex items-center justify-center gap-3">
              <Scan className="h-8 w-8 text-primary animate-pulse" />
              <span className="text-lg font-medium">Scanning for facial recognition...</span>
            </div>
          </div>
        )}
        
        {aiCheckInSuccess && (
          <div className="relative overflow-hidden bg-gradient-to-r from-success/20 via-success/10 to-success/20 rounded-xl p-6 border border-success/30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-success/10 to-transparent animate-shimmer"></div>
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-success/30 animate-ping"></div>
                <div className="relative h-20 w-20 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-success mb-1">Check-in Successful via Face ID</h3>
                <p className="text-muted-foreground">Verified at {new Date().toLocaleTimeString()}</p>
              </div>
              <Badge className="bg-success/20 text-success border-success/30 gap-2">
                <Sparkles className="h-3 w-3" />
                AI Recognition Active
              </Badge>
            </div>
          </div>
        )}

        {!showAiAnimation && !aiCheckInSuccess && (
          <div className="bg-gradient-to-r from-info/10 to-primary/10 rounded-xl p-4 border border-info/30 flex items-center gap-3">
            <div className="relative">
              <Scan className="h-6 w-6 text-info" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
            </div>
            <div>
              <span className="font-medium text-info">AI Recognition Active</span>
              <p className="text-xs text-muted-foreground">Face detection enabled for automatic check-in</p>
            </div>
          </div>
        )}
      </div>

      {/* Today's Schedule Priority View */}
      {hasClassToday && (
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
              <Badge variant="outline" className="ml-2">{currentDay}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((schedule) => (
                <div
                  key={schedule.courseId}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                    schedule.isOngoing
                      ? "bg-success/10 border-success/30 ring-2 ring-success/20"
                      : schedule.isNext
                      ? "bg-warning/5 border-warning/20"
                      : "bg-muted/30 border-border/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      schedule.isOngoing ? "bg-success/20" : schedule.isNext ? "bg-warning/20" : "bg-muted"
                    }`}>
                      <BookOpen className={`h-6 w-6 ${
                        schedule.isOngoing ? "text-success" : schedule.isNext ? "text-warning" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold">{schedule.course?.courseCode}</p>
                      <p className="text-sm text-muted-foreground">{schedule.course?.courseName}</p>
                      <p className="text-xs text-muted-foreground">Section: {schedule.section}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {schedule.startHour.toString().padStart(2, "0")}:00 - {schedule.endHour.toString().padStart(2, "0")}:00
                    </p>
                    {schedule.isOngoing && (
                      <Badge className="bg-success text-success-foreground mt-1 animate-pulse">
                        Ongoing
                      </Badge>
                    )}
                    {schedule.isNext && (
                      <Badge variant="outline" className="border-warning text-warning mt-1">
                        Next Class
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-3xl font-bold text-success">{stats.present}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-3xl font-bold text-warning">{stats.late}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-3xl font-bold text-destructive">{stats.absent}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leave</p>
                <p className="text-3xl font-bold text-info">{stats.leave}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Manual Check-in
            </CardTitle>
            <CardDescription>
              {activeClass
                ? "Enter the 6-digit code if AI recognition is unavailable."
                : "No active check-in session at the moment."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline" disabled={!activeClass || aiCheckInSuccess}>
                  {aiCheckInSuccess ? "Already Checked In" : activeClass ? "Enter Code Manually" : "No Active Session"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card">
                <DialogHeader>
                  <DialogTitle>Enter Check-in Code</DialogTitle>
                  <DialogDescription>
                    Enter the 6-digit code provided by your teacher
                  </DialogDescription>
                </DialogHeader>
                {!checkInSuccess ? (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>6-Digit Code</Label>
                      <Input
                        value={checkInCode}
                        onChange={(e) => setCheckInCode(e.target.value)}
                        placeholder="Enter code..."
                        maxLength={6}
                        className="text-center text-2xl tracking-widest"
                      />
                    </div>
                    <Button className="w-full" onClick={handleCheckIn}>
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Check-in Successful!</h3>
                    <p className="text-muted-foreground">
                      You checked in at <span className="font-semibold">{checkInTime}</span>
                    </p>
                    <Button className="mt-6" onClick={resetCheckIn}>
                      Done
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Attendance History
            </CardTitle>
            <CardDescription>View your complete attendance record for all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  View History
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Attendance History</DialogTitle>
                  <DialogDescription>Your complete attendance record</DialogDescription>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow className="table-header">
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Note</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentRecords.map((record) => {
                      const classDate = classDates.find((d) => d.id === record.classDateId);
                      return (
                        <TableRow key={record.id} className="table-row-hover">
                          <TableCell>{classDate ? formatDate(classDate.date) : "-"}</TableCell>
                          <TableCell className="max-w-48 truncate">
                            {getCourseName(record.classDateId)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={record.status} showLabel />
                          </TableCell>
                          <TableCell>{record.checkInTime || "-"}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {record.note || "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <div>
        <h3 className="text-xl font-semibold mb-4">My Courses</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentCourses.map((course) => {
            const schedule = courseSchedules.find((s) => s.courseId === course.id && s.day === currentDay);
            const isOngoing = schedule && currentHour >= schedule.startHour && currentHour < schedule.endHour;
            const isNext = schedule && currentHour < schedule.startHour;

            return (
              <Card
                key={course.id}
                className={`card-hover transition-all duration-300 ${
                  isOngoing ? "ring-2 ring-success border-success/30" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {course.courseCode}
                        {isOngoing && (
                          <Badge className="bg-success text-success-foreground text-xs animate-pulse">
                            Ongoing
                          </Badge>
                        )}
                        {isNext && (
                          <Badge variant="outline" className="border-warning text-warning text-xs">
                            Next
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">{course.courseName}</CardDescription>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {course.credits} Credits
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{course.schedule}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}