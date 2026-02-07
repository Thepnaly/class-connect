import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Camera, 
  Users, 
  Eye,
  CheckCircle2,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AttendanceStatus, getStatusLabel } from "@/data/dummyData";

// Active sessions data (class sessions, not individual students)
const activeSessions = [
  { id: "1", time: "09:00 - 12:00", subject: "Data Structures and Algorithms", room: "301", teacher: "Dr. Piyawat Lertsithichai", attendanceRatio: "35/40", status: "ongoing" },
  { id: "2", time: "09:00 - 12:00", subject: "Web Application Development", room: "305", teacher: "Assoc. Prof. Waraporn Narongrit", attendanceRatio: "28/32", status: "ongoing" },
  { id: "3", time: "09:00 - 12:00", subject: "Computer Networks", room: "402", teacher: "Asst. Prof. Napat Thongrak", attendanceRatio: "42/45", status: "ongoing" },
  { id: "4", time: "08:00 - 11:00", subject: "Database Management Systems", room: "303", teacher: "Dr. Piyawat Lertsithichai", attendanceRatio: "38/40", status: "ended" },
  { id: "5", time: "08:00 - 11:00", subject: "Software Engineering", room: "401", teacher: "Dr. Chaiwat Suttipong", attendanceRatio: "30/35", status: "ended" },
  { id: "6", time: "13:00 - 16:00", subject: "Operating Systems", room: "302", teacher: "Dr. Prasit Suksawat", attendanceRatio: "0/38", status: "scheduled" },
];

// Mock student data for the session detail modal
const mockSessionStudents = [
  { id: "1", studentCode: "65070001", name: "Somsak Prasert", photo: null, checkInTime: "09:05", status: "O" as AttendanceStatus },
  { id: "2", studentCode: "65070002", name: "Wilawan Thongchai", photo: null, checkInTime: "09:02", status: "O" as AttendanceStatus },
  { id: "3", studentCode: "65070003", name: "Kittipong Somjai", photo: null, checkInTime: "09:25", status: "L" as AttendanceStatus },
  { id: "4", studentCode: "65070004", name: "Pranee Rattana", photo: null, checkInTime: "09:01", status: "O" as AttendanceStatus },
  { id: "5", studentCode: "65070005", name: "Thanawat Khunpol", photo: null, checkInTime: "-", status: "X" as AttendanceStatus },
  { id: "6", studentCode: "65070006", name: "Napat Suksawat", photo: null, checkInTime: "09:03", status: "O" as AttendanceStatus },
  { id: "7", studentCode: "65070007", name: "Arisa Wongsiri", photo: null, checkInTime: "09:00", status: "O" as AttendanceStatus },
  { id: "8", studentCode: "65070008", name: "Chaiwat Tanaka", photo: null, checkInTime: "-", status: "Y" as AttendanceStatus },
  { id: "9", studentCode: "65070009", name: "Kanya Petcharat", photo: null, checkInTime: "09:04", status: "O" as AttendanceStatus },
  { id: "10", studentCode: "65070010", name: "Prasit Lertsithichai", photo: null, checkInTime: "09:06", status: "O" as AttendanceStatus },
];

export function AdminOverview() {
  const [selectedSession, setSelectedSession] = useState<typeof activeSessions[0] | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [sessionStudents, setSessionStudents] = useState(mockSessionStudents);

  const systemStats = {
    activeCameras: 12,
    totalCameras: 15,
    liveClasses: 3,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return (
          <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/20">
            <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
            On-going
          </Badge>
        );
      case "ended":
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            Ended
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-info/15 text-info border-info/30 hover:bg-info/20">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleViewDetails = (session: typeof activeSessions[0]) => {
    setSelectedSession(session);
    setSessionStudents(mockSessionStudents); // Reset to default
    setDetailModalOpen(true);
  };

  const handleStatusChange = (studentId: string, newStatus: AttendanceStatus) => {
    setSessionStudents(prev => 
      prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s)
    );
    toast({
      title: "Status Updated",
      description: `Changed status to ${getStatusLabel(newStatus)}`,
    });
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">System Monitoring</h2>
        <p className="text-muted-foreground mt-1">Real-time status of the Face Recognition Attendance System</p>
      </div>

      {/* System Status Cards */}
      <div className="grid gap-6 md:grid-cols-2 mb-8 max-w-4xl mx-auto">
        {/* Camera Status */}
        <Card className="card-hover">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Camera Status</p>
                <p className="text-4xl font-bold mt-1">{systemStats.activeCameras}<span className="text-xl text-muted-foreground">/{systemStats.totalCameras}</span></p>
                <p className="text-sm text-muted-foreground mt-1">Active Devices</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Camera className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Classes */}
        <Card className="card-hover">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Classes</p>
                <p className="text-4xl font-bold text-info mt-1">{systemStats.liveClasses}</p>
                <p className="text-sm text-muted-foreground mt-1">Ongoing Sessions</p>
              </div>
              <div className="h-16 w-16 rounded-xl bg-info/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Active Sessions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Today's Active Sessions
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Class sessions currently running or completed today</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead>Time</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead className="text-center">Attendance</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id} className="table-row-hover">
                  <TableCell className="font-mono text-sm">{session.time}</TableCell>
                  <TableCell className="font-medium">{session.subject}</TableCell>
                  <TableCell>
                    <span className="bg-muted px-2 py-0.5 rounded text-sm">
                      Room {session.room}
                    </span>
                  </TableCell>
                  <TableCell>{session.teacher}</TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold">{session.attendanceRatio}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(session.status)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1.5"
                      disabled={session.status === "scheduled"}
                      onClick={() => handleViewDetails(session)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Detail Modal with Editable Attendance Table */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="bg-card max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Session Attendance Details
            </DialogTitle>
            <DialogDescription>
              {selectedSession?.subject} • {selectedSession?.time} • Room {selectedSession?.room}
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            {/* Session Info */}
            <div className="flex items-center gap-4 mb-4 p-3 bg-muted/30 rounded-lg border">
              <Badge variant="outline">Teacher: {selectedSession?.teacher}</Badge>
              <Badge variant="outline">Attendance: {selectedSession?.attendanceRatio}</Badge>
              {selectedSession && getStatusBadge(selectedSession.status)}
            </div>

            {/* Attendance Table - Same as Teacher's view with Admin editing */}
            <Table>
              <TableHeader>
                <TableRow className="table-header">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Time In</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Edit Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionStudents.map((student, index) => {
                  const isSpecialStatus = student.status === 'Drop' || student.status === 'W';
                  return (
                    <TableRow 
                      key={student.id} 
                      className={
                        isSpecialStatus 
                          ? student.status === 'Drop' ? 'bg-black text-white' : 'bg-destructive text-white'
                          : ''
                      }
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-mono text-sm">{student.studentCode}</TableCell>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.photo || undefined} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center font-mono">{student.checkInTime}</TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={student.status} showLabel />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={student.status}
                          onValueChange={(value) => handleStatusChange(student.id, value as AttendanceStatus)}
                        >
                          <SelectTrigger className={`w-36 h-8 ${isSpecialStatus ? 'bg-white/20 border-white/50 text-white' : ''}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="O">Present (O)</SelectItem>
                            <SelectItem value="L">Late (L)</SelectItem>
                            <SelectItem value="X">Absent (X)</SelectItem>
                            <SelectItem value="Y">Leave (Y)</SelectItem>
                            <SelectItem value="Drop">Dropped (Drop)</SelectItem>
                            <SelectItem value="W">Withdrawn (W)</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Summary */}
            <div className="mt-4 p-3 bg-muted/30 rounded-lg border flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">Summary:</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  Present: {sessionStudents.filter(s => s.status === 'O').length}
                </Badge>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                  Late: {sessionStudents.filter(s => s.status === 'L').length}
                </Badge>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                  Absent: {sessionStudents.filter(s => s.status === 'X').length}
                </Badge>
                <Badge variant="outline" className="bg-info/10 text-info border-info/30">
                  Leave: {sessionStudents.filter(s => s.status === 'Y').length}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: {sessionStudents.length} students
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3 italic">
              Note: Changes made here will be logged as "Edited by Admin" in the audit trail.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
