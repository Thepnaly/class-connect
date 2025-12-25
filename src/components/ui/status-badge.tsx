import { cn } from "@/lib/utils";
import { AttendanceStatus, getStatusLabel, getStatusClass } from "@/data/dummyData";

interface StatusBadgeProps {
  status: AttendanceStatus;
  showLabel?: boolean;
  className?: string;
}

export function StatusBadge({ status, showLabel = false, className }: StatusBadgeProps) {
  const isDropped = status === 'Drop';
  const isWithdrawn = status === 'W';
  
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        isDropped ? "bg-black text-white border-white/50" :
        isWithdrawn ? "bg-destructive text-white border-destructive" :
        getStatusClass(status),
        className
      )}
    >
      {showLabel ? getStatusLabel(status) : status}
    </span>
  );
}
