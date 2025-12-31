import { courses, classDates } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar, ClipboardCheck, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassDatesPageProps {
  courseId: string;
  onBack: () => void;
  onCheckIn: (classDateId: string) => void;
  onSummary: () => void;
}

export function ClassDatesPage({ courseId, onBack, onCheckIn, onSummary }: ClassDatesPageProps) {
  const course = courses.find((c) => c.id === courseId);
  const dates = classDates.filter((d) => d.courseId === courseId);

  if (!course) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container py-8 px-4 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {course.courseCode} - {course.courseName}
          </h2>
          <p className="text-muted-foreground">
            All Class Dates for Semester {course.semester} | Section: {course.section} | Room: {course.room}
          </p>
        </div>
        <Button variant="outline" onClick={onSummary} className="gap-2">
          <BarChart3 className="h-4 w-4" />
          Semester Summary
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Class Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dates.map((classDate, index) => (
                <TableRow key={classDate.id} className="table-row-hover">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{formatDate(classDate.date)}</TableCell>
                  <TableCell>{classDate.time}</TableCell>
                  <TableCell>{classDate.room}</TableCell>
                  <TableCell>
                    {classDate.isActive ? (
                      <Badge className="bg-success text-success-foreground">Active</Badge>
                    ) : new Date(classDate.date) < new Date() ? (
                      <Badge variant="secondary">Completed</Badge>
                    ) : (
                      <Badge variant="outline">Upcoming</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={classDate.isActive ? "default" : "outline"}
                      onClick={() => onCheckIn(classDate.id)}
                      className="gap-2"
                    >
                      <ClipboardCheck className="h-4 w-4" />
                      {classDate.isActive ? "Manage Check-in" : "View Attendance"}
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
