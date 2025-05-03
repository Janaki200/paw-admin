import { CalendarCheck } from 'lucide-react';

export default function DaycareBookingsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <CalendarCheck className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          Daycare Bookings
        </h3>
        <p className="text-sm text-muted-foreground">
          View and manage all scheduled daycare attendances here.
        </p>
        {/* Placeholder for booking management table/calendar */}
      </div>
    </div>
  );
}
