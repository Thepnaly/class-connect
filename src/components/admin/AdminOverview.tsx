import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi, 
  Camera, 
  Users, 
  AlertTriangle, 
  Eye,
  CheckCircle2,
  Clock
} from "lucide-react";

// Active sessions data (class sessions, not individual students)
const activeSessions = [
  { id: "1", time: "09:00 - 12:00", subject: "Data Structures and Algorithms", room: "301", teacher: "Dr. Piyawat Lertsithichai", attendanceRatio: "35/40", status: "ongoing" },
  { id: "2", time: "09:00 - 12:00", subject: "Web Application Development", room: "305", teacher: "Assoc. Prof. Waraporn Narongrit", attendanceRatio: "28/32", status: "ongoing" },
  { id: "3", time: "09:00 - 12:00", subject: "Computer Networks", room: "402", teacher: "Asst. Prof. Napat Thongrak", attendanceRatio: "42/45", status: "ongoing" },
  { id: "4", time: "08:00 - 11:00", subject: "Database Management Systems", room: "303", teacher: "Dr. Piyawat Lertsithichai", attendanceRatio: "38/40", status: "ended" },
  { id: "5", time: "08:00 - 11:00", subject: "Software Engineering", room: "401", teacher: "Dr. Chaiwat Suttipong", attendanceRatio: "30/35", status: "ended" },
  { id: "6", time: "13:00 - 16:00", subject: "Operating Systems", room: "302", teacher: "Dr. Prasit Suksawat", attendanceRatio: "0/38", status: "scheduled" },
];

export function AdminOverview() {
  const systemStats = {
    apiStatus: "connected",
    activeCameras: 12,
    totalCameras: 15,
    liveClasses: 3,
    errorCount: 2,
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

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">System Monitoring</h2>
        <p className="text-muted-foreground mt-1">Real-time status of the Face Recognition Attendance System</p>
      </div>

      {/* System Status Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {/* API Status */}
        <Card className="card-hover border-success/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">API Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                  <p className="text-xl font-bold text-success">Connected</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Wifi className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Status */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Camera Status</p>
                <p className="text-3xl font-bold">{systemStats.activeCameras}<span className="text-lg text-muted-foreground">/{systemStats.totalCameras}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">Active Devices</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Classes */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Classes</p>
                <p className="text-3xl font-bold text-info">{systemStats.liveClasses}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Ongoing Sessions</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Logs */}
        <Card className="card-hover border-warning/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error Logs</p>
                <p className="text-3xl font-bold text-warning">{systemStats.errorCount}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Warnings Today</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
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
    </div>
  );
}