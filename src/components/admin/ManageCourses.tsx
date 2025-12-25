import { courses } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function ManageCourses() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(
    (c) =>
      c.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, courseName: string) => {
    toast({
      title: `${action} Course`,
      description: `${action} action for ${courseName} (Demo only)`,
    });
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Manage Courses</h2>
          <p className="text-muted-foreground mt-1">Add, edit, or remove course records</p>
        </div>
        <Button className="gap-2" onClick={() => handleAction("Add", "New Course")}>
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course List</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="table-row-hover">
                  <TableCell className="font-medium">{course.courseCode}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.teacherName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{course.credits}</Badge>
                  </TableCell>
                  <TableCell>{course.schedule}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction("Edit", course.courseName)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleAction("Delete", course.courseName)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
