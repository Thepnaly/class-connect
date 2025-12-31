import { useState } from "react";
import { courses, teachers } from "@/data/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Users, Clock } from "lucide-react";
import { ClassDatesPage } from "./ClassDatesPage";
import { DailyCheckInPage } from "./DailyCheckInPage";
import { SemesterSummaryPage } from "./SemesterSummaryPage";
import { AIRecognitionWidget } from "./AIRecognitionWidget";
import { TeacherSummaryCard } from "./TeacherSummaryCard";

type TeacherView = "dashboard" | "classDates" | "checkIn" | "summary";

interface ViewState {
  view: TeacherView;
  courseId?: string;
  classDateId?: string;
}

export function TeacherDashboard() {
  const [viewState, setViewState] = useState<ViewState>({ view: "dashboard" });
  const teacher = teachers[0]; // Current logged-in teacher
  const teacherCourses = courses.filter((c) => c.teacherId === teacher.id);

  if (viewState.view === "classDates" && viewState.courseId) {
    return (
      <ClassDatesPage
        courseId={viewState.courseId}
        onBack={() => setViewState({ view: "dashboard" })}
        onCheckIn={(classDateId) => setViewState({ view: "checkIn", courseId: viewState.courseId, classDateId })}
        onSummary={() => setViewState({ view: "summary", courseId: viewState.courseId })}
      />
    );
  }

  if (viewState.view === "checkIn" && viewState.classDateId) {
    return (
      <DailyCheckInPage
        classDateId={viewState.classDateId}
        onBack={() => setViewState({ view: "classDates", courseId: viewState.courseId })}
      />
    );
  }

  if (viewState.view === "summary" && viewState.courseId) {
    return (
      <SemesterSummaryPage
        courseId={viewState.courseId}
        onBack={() => setViewState({ view: "classDates", courseId: viewState.courseId })}
      />
    );
  }

  return (
    <div className="container py-8 px-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Welcome, {teacher.name}</h2>
        <p className="text-muted-foreground mt-1">Manage your courses and student attendance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Context Banner */}
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="font-semibold text-primary">Current Context:</span>
                <span className="text-foreground">Course: Data Structures</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-foreground">Section: 4COM2</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-foreground">Room: 301</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="stat-card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">My Courses</p>
                    <p className="text-3xl font-bold">{teacherCourses.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold">42</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Classes Today</p>
                    <p className="text-3xl font-bold">1</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                    <p className="text-3xl font-bold">87%</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-semibold mb-4">My Courses</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {teacherCourses.map((course, index) => (
                <Card key={course.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.courseCode}</CardTitle>
                        <CardDescription className="mt-1">{course.courseName}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Room: {course.room}</span>
                          <span className="text-xs bg-info/10 text-info px-2 py-0.5 rounded font-medium">Section: {course.section}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {course.credits} Credits
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Semester {course.semester}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => setViewState({ view: "classDates", courseId: course.id })}
                    >
                      View Class Dates
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - 1 column */}
        <div className="space-y-6">
          <AIRecognitionWidget 
            courseName="Data Structures" 
            section="4COM2" 
            room="301" 
          />
          <TeacherSummaryCard 
            totalClasses={24}
            avgAttendance={87}
            atRiskStudents={3}
          />
        </div>
      </div>
    </div>
  );
}