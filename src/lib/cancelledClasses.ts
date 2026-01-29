// Shared state for cancelled classes between Teacher and Student dashboards
// This simulates a database/API for the prototype

export interface CancelledClass {
  classDateId: string;
  courseId: string;
  reason: string;
  cancelledAt: string;
  cancelledBy: string;
}

// In-memory store for cancelled classes (simulates database)
let cancelledClasses: CancelledClass[] = [];

// Event listeners for real-time updates
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const cancelledClassesStore = {
  // Get all cancelled classes
  getAll: (): CancelledClass[] => {
    return [...cancelledClasses];
  },

  // Check if a class is cancelled
  isCancelled: (classDateId: string): boolean => {
    return cancelledClasses.some(c => c.classDateId === classDateId);
  },

  // Check if a course has any cancelled classes today
  isCancelledToday: (courseId: string): CancelledClass | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return cancelledClasses.find(c => 
      c.courseId === courseId && 
      c.cancelledAt.startsWith(today)
    );
  },

  // Get cancellation info for a class
  getCancellation: (classDateId: string): CancelledClass | undefined => {
    return cancelledClasses.find(c => c.classDateId === classDateId);
  },

  // Cancel a class
  cancel: (classDateId: string, courseId: string, reason: string, cancelledBy: string): void => {
    if (!cancelledClassesStore.isCancelled(classDateId)) {
      cancelledClasses.push({
        classDateId,
        courseId,
        reason,
        cancelledAt: new Date().toISOString(),
        cancelledBy,
      });
      // Notify all listeners
      listeners.forEach(listener => listener());
    }
  },

  // Subscribe to changes
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Reset (for testing)
  reset: (): void => {
    cancelledClasses = [];
    listeners.forEach(listener => listener());
  },
};
