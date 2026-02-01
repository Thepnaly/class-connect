import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

interface HodOverviewProps {
  onNavigateToReports?: (filter?: { lowAttendance?: boolean }) => void;
}

export function HodOverview({ onNavigateToReports }: HodOverviewProps) {
  const kpiStats = {
    todayAttendance: 92,
    attendanceTrend: +2.5,
    activeClasses: 8,
    lowAttendanceAlerts: 3,
  };

  const handleLowAttendanceClick = () => {
    if (onNavigateToReports) {
      onNavigateToReports({ lowAttendance: true });
    }
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

        {/* Low Attendance Alerts - Clickable */}
        <Card 
          className="card-hover border-l-4 border-l-destructive cursor-pointer transition-all hover:shadow-md hover:border-destructive/50 group"
          onClick={handleLowAttendanceClick}
        >
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
              <div className="flex items-center gap-2">
                <div className="h-14 w-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-7 w-7 text-destructive" />
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-destructive group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Attendance Trends - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Attendance Trends</CardTitle>
          <CardDescription>Daily attendance percentage this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
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
    </div>
  );
}
