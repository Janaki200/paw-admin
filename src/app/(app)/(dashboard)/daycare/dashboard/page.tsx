import BookingRequests from '@/components/booking-requests';
import { PawPrintIcon } from '@/components/icons/paw-print';

// Mock data for booking requests - replace with actual data fetching
const mockDaycareBookings = [
  { id: 'd1', petName: 'Rocky', ownerName: 'Eve Adams', service: 'Full Day', requestedDate: '2024-08-15', requestedTime: 'Drop-off: 8:00 AM', status: 'Pending' },
  { id: 'd2', petName: 'Bella', ownerName: 'Frank Green', service: 'Half Day (AM)', requestedDate: '2024-08-15', requestedTime: 'Drop-off: 7:30 AM', status: 'Scheduled' },
  { id: 'd3', petName: 'Charlie', ownerName: 'Grace Hall', service: 'Full Day', requestedDate: '2024-08-16', requestedTime: 'Drop-off: 9:00 AM', status: 'Pending' },
   { id: 'd4', petName: 'Luna', ownerName: 'Hank Moody', service: 'Boarding (3 days)', requestedDate: '2024-08-20', requestedTime: 'Drop-off: 5:00 PM', status: 'Pending' },
];

export default function DaycareDashboardPage() {
   return (
    <>
      <div className="flex items-center">
          <PawPrintIcon className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold md:text-2xl">Daycare Dashboard</h1>
       </div>
      <BookingRequests bookings={mockDaycareBookings} role="daycare" />
    </>
  );
}
