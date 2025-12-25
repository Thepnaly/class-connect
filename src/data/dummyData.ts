// Dummy data for the attendance system

export type AttendanceStatus = 'O' | 'L' | 'X' | 'Y' | 'Drop' | 'W';

export interface Student {
  id: string;
  studentCode: string;
  name: string;
  email: string;
  department: string;
  year: number;
}

export interface Teacher {
  id: string;
  teacherCode: string;
  name: string;
  email: string;
  department: string;
}

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  credits: number;
  semester: string;
  schedule: string;
}

export interface ClassDate {
  id: string;
  courseId: string;
  date: string;
  time: string;
  room: string;
  checkInCode?: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classDateId: string;
  status: AttendanceStatus;
  checkInTime?: string;
  isDropped: boolean;
  note: string;
}

// Students
export const students: Student[] = [
  { id: '1', studentCode: '65070001', name: 'Somchai Prasert', email: 'somchai@uni.ac.th', department: 'Computer Science', year: 3 },
  { id: '2', studentCode: '65070002', name: 'Narong Tanaka', email: 'narong@uni.ac.th', department: 'Computer Science', year: 3 },
  { id: '3', studentCode: '65070003', name: 'Pranee Wongsiri', email: 'pranee@uni.ac.th', department: 'IT', year: 3 },
  { id: '4', studentCode: '65070004', name: 'Supachai Khunpol', email: 'supachai@uni.ac.th', department: 'Computer Science', year: 3 },
  { id: '5', studentCode: '65070005', name: 'Wilai Charoen', email: 'wilai@uni.ac.th', department: 'IT', year: 3 },
  { id: '6', studentCode: '65070006', name: 'Prasit Suksawat', email: 'prasit@uni.ac.th', department: 'Computer Science', year: 3 },
  { id: '7', studentCode: '65070007', name: 'Napat Vejchapipat', email: 'napat@uni.ac.th', department: 'IT', year: 3 },
  { id: '8', studentCode: '65070008', name: 'Kanya Rattanakul', email: 'kanya@uni.ac.th', department: 'Computer Science', year: 3 },
  { id: '9', studentCode: '65070009', name: 'Thawee Somjai', email: 'thawee@uni.ac.th', department: 'IT', year: 3 },
  { id: '10', studentCode: '65070010', name: 'Arisa Petcharat', email: 'arisa@uni.ac.th', department: 'Computer Science', year: 3 },
];

// Teachers
export const teachers: Teacher[] = [
  { id: '1', teacherCode: 'T001', name: 'Dr. Piyawat Lertsithichai', email: 'piyawat@uni.ac.th', department: 'Computer Science' },
  { id: '2', teacherCode: 'T002', name: 'Assoc. Prof. Waraporn Narongrit', email: 'waraporn@uni.ac.th', department: 'IT' },
  { id: '3', teacherCode: 'T003', name: 'Dr. Chaiwat Suttipong', email: 'chaiwat@uni.ac.th', department: 'Computer Science' },
];

// Courses
export const courses: Course[] = [
  { id: '1', courseCode: 'CS301', courseName: 'Data Structures and Algorithms', teacherId: '1', teacherName: 'Dr. Piyawat Lertsithichai', credits: 3, semester: '2/2024', schedule: 'Mon 09:00-12:00' },
  { id: '2', courseCode: 'CS302', courseName: 'Database Management Systems', teacherId: '1', teacherName: 'Dr. Piyawat Lertsithichai', credits: 3, semester: '2/2024', schedule: 'Wed 13:00-16:00' },
  { id: '3', courseCode: 'IT301', courseName: 'Web Application Development', teacherId: '2', teacherName: 'Assoc. Prof. Waraporn Narongrit', credits: 3, semester: '2/2024', schedule: 'Tue 09:00-12:00' },
  { id: '4', courseCode: 'CS401', courseName: 'Software Engineering', teacherId: '3', teacherName: 'Dr. Chaiwat Suttipong', credits: 3, semester: '2/2024', schedule: 'Thu 13:00-16:00' },
];

// Class Dates for CS301
export const classDates: ClassDate[] = [
  { id: '1', courseId: '1', date: '2024-12-02', time: '09:00-12:00', room: 'Room 301', isActive: false },
  { id: '2', courseId: '1', date: '2024-12-09', time: '09:00-12:00', room: 'Room 301', isActive: false },
  { id: '3', courseId: '1', date: '2024-12-16', time: '09:00-12:00', room: 'Room 301', isActive: false },
  { id: '4', courseId: '1', date: '2024-12-23', time: '09:00-12:00', room: 'Room 301', checkInCode: '123456', isActive: true },
  { id: '5', courseId: '1', date: '2024-12-30', time: '09:00-12:00', room: 'Room 301', isActive: false },
  { id: '6', courseId: '2', date: '2024-12-04', time: '13:00-16:00', room: 'Room 402', isActive: false },
  { id: '7', courseId: '2', date: '2024-12-11', time: '13:00-16:00', room: 'Room 402', isActive: false },
  { id: '8', courseId: '2', date: '2024-12-18', time: '13:00-16:00', room: 'Room 402', isActive: false },
];

// Attendance Records
export const attendanceRecords: AttendanceRecord[] = [
  // Class Date 1 (Dec 2)
  { id: '1', studentId: '1', studentCode: '65070001', studentName: 'Somchai Prasert', classDateId: '1', status: 'O', checkInTime: '09:02', isDropped: false, note: '' },
  { id: '2', studentId: '2', studentCode: '65070002', studentName: 'Narong Tanaka', classDateId: '1', status: 'O', checkInTime: '08:58', isDropped: false, note: '' },
  { id: '3', studentId: '3', studentCode: '65070003', studentName: 'Pranee Wongsiri', classDateId: '1', status: 'L', checkInTime: '09:22', isDropped: false, note: 'Traffic jam' },
  { id: '4', studentId: '4', studentCode: '65070004', studentName: 'Supachai Khunpol', classDateId: '1', status: 'O', checkInTime: '09:05', isDropped: false, note: '' },
  { id: '5', studentId: '5', studentCode: '65070005', studentName: 'Wilai Charoen', classDateId: '1', status: 'X', isDropped: false, note: '' },
  { id: '6', studentId: '6', studentCode: '65070006', studentName: 'Prasit Suksawat', classDateId: '1', status: 'O', checkInTime: '08:55', isDropped: false, note: '' },
  { id: '7', studentId: '7', studentCode: '65070007', studentName: 'Napat Vejchapipat', classDateId: '1', status: 'Y', isDropped: false, note: 'Medical leave' },
  { id: '8', studentId: '8', studentCode: '65070008', studentName: 'Kanya Rattanakul', classDateId: '1', status: 'O', checkInTime: '09:00', isDropped: false, note: '' },
  { id: '9', studentId: '9', studentCode: '65070009', studentName: 'Thawee Somjai', classDateId: '1', status: 'L', checkInTime: '09:18', isDropped: false, note: '' },
  { id: '10', studentId: '10', studentCode: '65070010', studentName: 'Arisa Petcharat', classDateId: '1', status: 'Drop', checkInTime: '', isDropped: true, note: 'Dropped course' },
  { id: '10b', studentId: '11', studentCode: '65070011', studentName: 'Wichai Somphong', classDateId: '1', status: 'W', checkInTime: '', isDropped: false, note: 'Withdrawn from university' },

  // Class Date 2 (Dec 9)
  { id: '11', studentId: '1', studentCode: '65070001', studentName: 'Somchai Prasert', classDateId: '2', status: 'O', checkInTime: '09:00', isDropped: false, note: '' },
  { id: '12', studentId: '2', studentCode: '65070002', studentName: 'Narong Tanaka', classDateId: '2', status: 'L', checkInTime: '09:25', isDropped: false, note: '' },
  { id: '13', studentId: '3', studentCode: '65070003', studentName: 'Pranee Wongsiri', classDateId: '2', status: 'O', checkInTime: '09:03', isDropped: false, note: '' },
  { id: '14', studentId: '4', studentCode: '65070004', studentName: 'Supachai Khunpol', classDateId: '2', status: 'O', checkInTime: '09:01', isDropped: false, note: '' },
  { id: '15', studentId: '5', studentCode: '65070005', studentName: 'Wilai Charoen', classDateId: '2', status: 'O', checkInTime: '08:55', isDropped: false, note: '' },
  { id: '16', studentId: '6', studentCode: '65070006', studentName: 'Prasit Suksawat', classDateId: '2', status: 'X', isDropped: false, note: '' },
  { id: '17', studentId: '7', studentCode: '65070007', studentName: 'Napat Vejchapipat', classDateId: '2', status: 'O', checkInTime: '09:02', isDropped: false, note: '' },
  { id: '18', studentId: '8', studentCode: '65070008', studentName: 'Kanya Rattanakul', classDateId: '2', status: 'O', checkInTime: '09:00', isDropped: false, note: '' },
  { id: '19', studentId: '9', studentCode: '65070009', studentName: 'Thawee Somjai', classDateId: '2', status: 'Y', isDropped: false, note: 'Family emergency' },

  // Class Date 3 (Dec 16)
  { id: '20', studentId: '1', studentCode: '65070001', studentName: 'Somchai Prasert', classDateId: '3', status: 'O', checkInTime: '09:05', isDropped: false, note: '' },
  { id: '21', studentId: '2', studentCode: '65070002', studentName: 'Narong Tanaka', classDateId: '3', status: 'O', checkInTime: '09:00', isDropped: false, note: '' },
  { id: '22', studentId: '3', studentCode: '65070003', studentName: 'Pranee Wongsiri', classDateId: '3', status: 'O', checkInTime: '08:58', isDropped: false, note: '' },
  { id: '23', studentId: '4', studentCode: '65070004', studentName: 'Supachai Khunpol', classDateId: '3', status: 'X', isDropped: false, note: '' },
  { id: '24', studentId: '5', studentCode: '65070005', studentName: 'Wilai Charoen', classDateId: '3', status: 'L', checkInTime: '09:20', isDropped: false, note: '' },
  { id: '25', studentId: '6', studentCode: '65070006', studentName: 'Prasit Suksawat', classDateId: '3', status: 'O', checkInTime: '09:02', isDropped: false, note: '' },
  { id: '26', studentId: '7', studentCode: '65070007', studentName: 'Napat Vejchapipat', classDateId: '3', status: 'O', checkInTime: '09:01', isDropped: false, note: '' },
  { id: '27', studentId: '8', studentCode: '65070008', studentName: 'Kanya Rattanakul', classDateId: '3', status: 'Y', isDropped: false, note: 'Sick leave' },
  { id: '28', studentId: '9', studentCode: '65070009', studentName: 'Thawee Somjai', classDateId: '3', status: 'O', checkInTime: '09:00', isDropped: false, note: '' },
];

// Helper functions
export const getStatusLabel = (status: AttendanceStatus): string => {
  switch (status) {
    case 'O': return 'Present';
    case 'L': return 'Late';
    case 'X': return 'Absent';
    case 'Y': return 'Leave';
    case 'Drop': return 'Dropped';
    case 'W': return 'Withdrawn';
  }
};

export const getStatusClass = (status: AttendanceStatus): string => {
  switch (status) {
    case 'O': return 'status-present';
    case 'L': return 'status-late';
    case 'X': return 'status-absent';
    case 'Y': return 'status-leave';
    case 'Drop': return 'status-dropped';
    case 'W': return 'status-withdrawn';
  }
};

export const getRowClass = (status: AttendanceStatus): string => {
  switch (status) {
    case 'Drop': return 'bg-black text-white';
    case 'W': return 'bg-destructive text-white';
    default: return '';
  }
};

// Registered courses for a student
export const studentCourses = [
  { ...courses[0], enrolled: true },
  { ...courses[2], enrolled: true },
  { ...courses[3], enrolled: true },
];
