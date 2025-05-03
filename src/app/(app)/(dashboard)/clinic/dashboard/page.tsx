import BookingRequests from '@/components/booking-requests';
import { PawPrintIcon } from '@/components/icons/paw-print';

// Mock data for booking requests - replace with actual data fetching
const mockClinicBookings = [
  { id: 'c1', petName: 'Buddy', ownerName: 'Alice Smith', service: 'Vaccination', requestedDate: '2024-08-15', requestedTime: '10:00 AM', status: 'Pending' },
  { id: 'c2', petName: 'Lucy', ownerName: 'Bob Johnson', service: 'Check-up', requestedDate: '2024-08-16', requestedTime: '02:30 PM', status: 'Pending' },
  { id: 'c3', petName: 'Max', ownerName: 'Charlie Brown', service: 'Dental Cleaning', requestedDate: '2024-08-17', requestedTime: '09:00 AM', status: 'Scheduled' },
   { id: 'c4', petName: 'Daisy', ownerName: 'Diana Prince', service: 'Spaying', requestedDate: '2024-08-18', requestedTime: '11:00 AM', status: 'Pending' },
];


export default function ClinicDashboardPage() {
  return (
    <>
       <div className="flex items-center">
          <PawPrintIcon className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold md:text-2xl">Clinic Dashboard</h1>
       </div>
       <BookingRequests bookings={mockClinicBookings} role="clinic" />
    </>
  );
}
