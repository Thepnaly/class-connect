import { students } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function ManageStudents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, studentName: string) => {
    toast({
      title: `${action} Student`,
      description: `${action} action for ${studentName} (Demo only)`,
    });
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Manage Students</h2>
          <p className="text-muted-foreground mt-1">Add, edit, or remove student records</p>
        </div>
        <Button className="gap-2" onClick={() => handleAction("Add", "New Student")}>
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student List</CardTitle>
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
                <TableHead>Student Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="table-row-hover">
                  <TableCell className="font-medium">{student.studentCode}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction("Edit", student.name)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleAction("Delete", student.name)}
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
