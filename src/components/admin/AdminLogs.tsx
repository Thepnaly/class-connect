import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Search, AlertTriangle, AlertCircle, Info } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "error" | "warning" | "info";
  source: string;
  message: string;
}

const mockLogs: LogEntry[] = [
  { id: "1", timestamp: "2024-01-15 09:15:32", level: "error", source: "Camera API", message: "Failed to connect to camera device CAM-003" },
  { id: "2", timestamp: "2024-01-15 09:12:45", level: "warning", source: "Face Recognition", message: "Low confidence match for student 65070025 (72%)" },
  { id: "3", timestamp: "2024-01-15 09:10:18", level: "info", source: "Attendance", message: "Session started for Web Development course" },
  { id: "4", timestamp: "2024-01-15 09:08:55", level: "warning", source: "Network", message: "High latency detected on server connection (450ms)" },
  { id: "5", timestamp: "2024-01-15 09:05:12", level: "error", source: "Database", message: "Connection timeout to attendance database" },
  { id: "6", timestamp: "2024-01-15 09:02:33", level: "info", source: "System", message: "Daily backup completed successfully" },
  { id: "7", timestamp: "2024-01-15 08:58:41", level: "warning", source: "Camera API", message: "Camera CAM-007 operating in low-light mode" },
  { id: "8", timestamp: "2024-01-15 08:55:22", level: "info", source: "Auth", message: "Admin user logged in from IP 192.168.1.100" },
  { id: "9", timestamp: "2024-01-15 08:50:10", level: "warning", source: "Face Recognition", message: "Multiple face detection in frame - Room 301" },
  { id: "10", timestamp: "2024-01-15 08:45:05", level: "warning", source: "Storage", message: "Disk usage approaching 80% threshold" },
];

interface AdminLogsProps {
  initialFilter?: "all" | "error" | "warning";
}

export function AdminLogs({ initialFilter = "all" }: AdminLogsProps) {
  const [filter, setFilter] = useState<"all" | "error" | "warning" | "info">(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const filteredLogs = mockLogs.filter(log => {
    const matchesFilter = filter === "all" || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelBadge = (level: LogEntry["level"]) => {
    switch (level) {
      case "error":
        return (
          <Badge className="bg-destructive/15 text-destructive border-destructive/30">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-warning/15 text-warning border-warning/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        );
      case "info":
        return (
          <Badge className="bg-info/15 text-info border-info/30">
            <Info className="w-3 h-3 mr-1" />
            Info
          </Badge>
        );
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">System Logs</h2>
        <p className="text-muted-foreground mt-1">View and filter system events, errors, and warnings</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter by level:</span>
              <Select value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="error">Errors</SelectItem>
                  <SelectItem value="warning">Warnings</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px] max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Log Entries ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead className="w-[150px]">Source</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="table-row-hover">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell>
                    <span className="bg-muted px-2 py-0.5 rounded text-sm">
                      {log.source}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{log.message}</TableCell>
                </TableRow>
              ))}
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No log entries found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
