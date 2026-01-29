import { useState } from "react";
import { classDates, attendanceRecords, courses, AttendanceStatus, getStatusLabel, getRowClass } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, Clock, Plus, StopCircle, FileSpreadsheet, FileText, Pencil, MessageSquare, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cancelledClassesStore } from "@/lib/cancelledClasses";

interface DailyCheckInPageProps {
  classDateId: string;
  onBack: () => void;
}

export function DailyCheckInPage({ classDateId, onBack }: DailyCheckInPageProps) {
  const classDate = classDates.find((d) => d.id === classDateId);
  const course = classDate ? courses.find((c) => c.id === classDate.courseId) : null;
  const initialRecords = attendanceRecords.filter((r) => r.classDateId === classDateId);
  
  const [records, setRecords] = useState(initialRecords);
  const [isCheckInActive, setIsCheckInActive] = useState(classDate?.isActive || false);
  const [checkInCode, setCheckInCode] = useState(classDate?.checkInCode || "");
  const [duration, setDuration] = useState(15);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [cancelClassModalOpen, setCancelClassModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [noteText, setNoteText] = useState("");
  const [isClassCancelled, setIsClassCancelled] = useState(cancelledClassesStore.isCancelled(classDateId));

  if (!classDate) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStartCheckIn = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCheckInCode(code);
    setIsCheckInActive(true);
    toast({
      title: "Check-in Started",
      description: `Check-in code: ${code}. Duration: ${duration} minutes.`,
    });
  };

  const handleEndCheckIn = () => {
    setIsCheckInActive(false);
    toast({
      title: "Check-in Ended",
      description: "Students can no longer check in.",
    });
  };

  const handleExtend = () => {
    setTimeRemaining((prev) => prev + 300);
    toast({
      title: "Time Extended",
      description: "Added 5 minutes to check-in duration.",
    });
  };

  const handleStatusChange = (recordId: string, newStatus: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === recordId ? { ...r, status: newStatus } : r
      )
    );
    toast({
      title: "Status Updated",
      description: `Changed status to ${getStatusLabel(newStatus)}`,
    });
  };

  const handleSaveNote = (recordId: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === recordId ? { ...r, note: noteText } : r
      )
    );
    setEditingNote(null);
    setNoteText("");
    toast({ title: "Note Saved" });
  };

  const handleExport = (format: "excel" | "pdf") => {
    toast({
      title: `Export to ${format.toUpperCase()}`,
      description: "Your file is being prepared for download.",
    });
  };

  const statusCounts = {
    present: records.filter((r) => r.status === "O").length,
    late: records.filter((r) => r.status === "L").length,
    absent: records.filter((r) => r.status === "X").length,
    leave: records.filter((r) => r.status === "Y").length,
    dropped: records.filter((r) => r.status === "Drop").length,
    withdrawn: records.filter((r) => r.status === "W").length,
  };

  return (
    <div className="container py-8 px-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Daily Check-in</h2>
          <p className="text-muted-foreground">
            {formatDate(classDate.date)} • {classDate.time} | Section: {course?.section || 'N/A'} | Room: {course?.room || 'N/A'}
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Check-in Control
            </span>
            {isCheckInActive && (
              <Badge className="bg-success text-success-foreground animate-pulse">
                Active • Code: {checkInCode}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {!isCheckInActive ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Clock className="h-4 w-4" />
                      Set Duration
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <DialogHeader>
                      <DialogTitle>Set Check-in Duration</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          min={5}
                          max={60}
                        />
                      </div>
                      <Button className="w-full" onClick={() => {}}>
                        Confirm Duration
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button onClick={handleStartCheckIn} className="gap-2">
                  <Play className="h-4 w-4" />
                  Start Check-in
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setCancelClassModalOpen(true)} 
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel Class
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleExtend} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Extend +5 min
                </Button>
                <Button variant="destructive" onClick={handleEndCheckIn} className="gap-2">
                  <StopCircle className="h-4 w-4" />
                  End Early
                </Button>
              </>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-6 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{statusCounts.present}</div>
              <div className="text-sm text-muted-foreground">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{statusCounts.late}</div>
              <div className="text-sm text-muted-foreground">Late</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{statusCounts.absent}</div>
              <div className="text-sm text-muted-foreground">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{statusCounts.leave}</div>
              <div className="text-sm text-muted-foreground">Leave</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{statusCounts.dropped}</div>
              <div className="text-sm text-muted-foreground">Dropped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{statusCounts.withdrawn}</div>
              <div className="text-sm text-muted-foreground">Withdrawn</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Attendance Records</CardTitle>
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
                <TableHead className="w-12">#</TableHead>
                <TableHead>Student Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Drop/Withdraw</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => {
                const rowClass = getRowClass(record.status);
                const isSpecialStatus = record.status === 'Drop' || record.status === 'W';
                
                return (
                  <TableRow key={record.id} className={`table-row-hover ${rowClass}`}>
                    <TableCell className={`font-medium ${isSpecialStatus ? 'text-white' : ''}`}>{index + 1}</TableCell>
                    <TableCell className={isSpecialStatus ? 'text-white' : ''}>{record.studentCode}</TableCell>
                    <TableCell className={isSpecialStatus ? 'text-white' : ''}>{record.studentName}</TableCell>
                    <TableCell>
                      <StatusBadge status={record.status} showLabel />
                    </TableCell>
                    <TableCell className={isSpecialStatus ? 'text-white' : ''}>{record.checkInTime || "-"}</TableCell>
                    <TableCell>
                      {record.status === 'Drop' ? (
                        <Badge className="bg-black text-white border-white">Dropped</Badge>
                      ) : record.status === 'W' ? (
                        <Badge className="bg-destructive text-white">Withdrawn</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={record.status}
                        onValueChange={(value) => handleStatusChange(record.id, value as AttendanceStatus)}
                      >
                        <SelectTrigger className={`w-32 h-8 ${isSpecialStatus ? 'bg-white/20 border-white/50 text-white' : ''}`}>
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
                    <TableCell>
                      {editingNote === record.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="h-8 w-32"
                            placeholder="Enter note..."
                          />
                          <Button size="sm" variant="ghost" onClick={() => handleSaveNote(record.id)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`text-sm truncate max-w-24 ${isSpecialStatus ? 'text-white/80' : 'text-muted-foreground'}`}>
                            {record.note || "-"}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`h-6 w-6 ${isSpecialStatus ? 'text-white hover:bg-white/20' : ''}`}
                            onClick={() => {
                              setEditingNote(record.id);
                              setNoteText(record.note);
                            }}
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cancel Class Modal */}
      <Dialog open={cancelClassModalOpen} onOpenChange={setCancelClassModalOpen}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Cancel Class
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this class session. This will be logged for administrative records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancellationReason">Reason for Cancellation</Label>
              <Textarea
                id="cancellationReason"
                placeholder="Enter the reason for cancelling this class (e.g., instructor illness, emergency, etc.)"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setCancelClassModalOpen(false);
              setCancellationReason("");
            }}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (!cancellationReason.trim()) {
                  toast({
                    title: "Error",
                    description: "Please provide a reason for cancellation.",
                    variant: "destructive",
                  });
                  return;
                }
                // Update the shared store
                cancelledClassesStore.cancel(
                  classDateId, 
                  classDate.courseId, 
                  cancellationReason, 
                  "Dr. Somchai Prasert"
                );
                setIsClassCancelled(true);
                toast({
                  title: "Class Cancelled",
                  description: "The class has been cancelled and students will be notified.",
                });
                setCancelClassModalOpen(false);
                setCancellationReason("");
              }}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
