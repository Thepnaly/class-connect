import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  FileBarChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Weekly attendance trend data
const weeklyTrendData = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 91 },
  { day: "Thu", attendance: 85 },
  { day: "Fri", attendance: 78 },
  { day: "Sat", attendance: 95 },
  { day: "Sun", attendance: 0 },
];

// Attendance by subject data
const subjectAttendanceData = [
  { subject: "Data Structures", rate: 92, color: "hsl(var(--primary))" },
  { subject: "Web Dev", rate: 88, color: "hsl(var(--info))" },
  { subject: "Networks", rate: 75, color: "hsl(var(--warning))" },
  { subject: "Database", rate: 90, color: "hsl(var(--success))" },
  { subject: "Software Eng", rate: 85, color: "hsl(var(--primary))" },
  { subject: "OS", rate: 82, color: "hsl(var(--info))" },
];

export function HodOverview() {
  const kpiStats = {
    todayAttendance: 92,
    attendanceTrend: +2.5,
    activeClasses: 8,
    lowAttendanceAlerts: 3,
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Department Overview</h2>
        <p className="text-muted-foreground mt-1">Executive summary for the Head of Department</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {/* Today's Attendance Rate */}
        <Card className="card-hover border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Today's Attendance Rate</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-4xl font-bold">{kpiStats.todayAttendance}%</p>
                  <span className="flex items-center text-success text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4" />
                    {kpiStats.attendanceTrend}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">vs. last week</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Active Classes */}
        <Card className="card-hover border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Active Classes</p>
                <p className="text-4xl font-bold mt-1">{kpiStats.activeClasses}</p>
                <p className="text-xs text-muted-foreground mt-1">Running today</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Low Attendance Alerts */}
        <Card className="card-hover border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Low Attendance Alerts</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-4xl font-bold text-destructive">{kpiStats.lowAttendanceAlerts}</p>
                  <span className="flex items-center text-destructive text-sm font-medium">
                    <ArrowDownRight className="h-4 w-4" />
                    Classes
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Below 80% threshold</p>
              </div>
              <div className="h-14 w-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Weekly Attendance Trends - Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Attendance Trends</CardTitle>
            <CardDescription>Daily attendance percentage this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="day" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Attendance']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance by Subject - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attendance by Subject</CardTitle>
            <CardDescription>Comparison across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAttendanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]}
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="subject" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    width={90}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Attendance Rate']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="rate" 
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Access Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-info/5 border-primary/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileBarChart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">View Full Detailed Reports</h3>
                <p className="text-muted-foreground mt-1">
                  Access comprehensive attendance reports, student analytics, and departmental statistics
                </p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Note: This links to the shared Admin Report Module
                </p>
              </div>
            </div>
            <Button size="lg" className="gap-2">
              <FileBarChart className="h-5 w-5" />
              Open Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}