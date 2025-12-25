import { useState } from "react";
import { studentCourses, attendanceRecords, classDates, students } from "@/data/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { BookOpen, Calendar, CheckCircle2, History, Clock, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function StudentDashboard() {
  const [checkInCode, setCheckInCode] = useState("");
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");

  const student = students[0]; // Current logged-in student
  const studentRecords = attendanceRecords.filter((r) => r.studentId === student.id);

  // Get the active class
  const activeClass = classDates.find((d) => d.isActive);

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

  // Calculate stats
  const stats = {
    present: studentRecords.filter((r) => r.status === "O").length,
    late: studentRecords.filter((r) => r.status === "L").length,
    absent: studentRecords.filter((r) => r.status === "X").length,
    leave: studentRecords.filter((r) => r.status === "Y").length,
  };

  return (
    <div className="container py-8 px-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Welcome, {student.name}</h2>
        <p className="text-muted-foreground mt-1">
          {student.studentCode} • {student.department} • Year {student.year}
        </p>
      </div>

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
              Check-in Today
            </CardTitle>
            <CardDescription>
              {activeClass
                ? "There is an active class session. Enter the code to check in."
                : "No active check-in session at the moment."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!activeClass}>
                  {activeClass ? "Check-in Now" : "No Active Session"}
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

      {/* Registered Courses */}
      <div>
        <h3 className="text-xl font-semibold mb-4">My Courses</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentCourses.map((course) => (
            <Card key={course.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{course.courseCode}</CardTitle>
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
          ))}
        </div>
      </div>
    </div>
  );
}
