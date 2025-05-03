'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Dog, User, CheckCircle, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarPicker } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Booking {
  id: string;
  petName: string;
  ownerName: string;
  service: string;
  requestedDate: string;
  requestedTime: string;
  status: 'Pending' | 'Scheduled' | 'Cancelled'; // Added Cancelled status
}

interface BookingRequestsProps {
  bookings: Booking[];
  role: 'clinic' | 'daycare';
}

export default function BookingRequests({ bookings: initialBookings, role }: BookingRequestsProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleAccept = (bookingId: string, date: Date | undefined) => {
    if (!date) {
       toast({
         title: 'Scheduling Error',
         description: 'Please select a date to schedule the booking.',
         variant: 'destructive',
       });
       return;
    }

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'Scheduled', requestedDate: format(date, "yyyy-MM-dd") } : booking
      )
    );
    toast({
      title: 'Booking Scheduled',
      description: `Booking ${bookingId} has been successfully scheduled for ${format(date, "PPP")}.`,
    });
    setSelectedDate(undefined); // Reset date picker
  };

  // Added handleCancel function
  const handleCancel = (bookingId: string) => {
     setBookings((prevBookings) =>
       prevBookings.map((booking) =>
         booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
       )
     );
     toast({
       title: 'Booking Cancelled',
       description: `Booking ${bookingId} has been cancelled.`,
       variant: 'destructive',
     });
   };

  const getStatusVariant = (status: Booking['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'default'; // Uses primary color (teal)
      case 'Pending':
        return 'secondary'; // Uses secondary color (light gray)
      case 'Cancelled':
        return 'destructive'; // Uses destructive color
      default:
        return 'outline';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
               <CardTitle className="text-lg">{booking.service}</CardTitle>
                <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
            </div>
            <CardDescription className="flex items-center pt-1">
                <Dog className="mr-1 h-4 w-4 text-muted-foreground" /> {booking.petName}
            </CardDescription>
             <CardDescription className="flex items-center">
               <User className="mr-1 h-4 w-4 text-muted-foreground" /> {booking.ownerName}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{booking.requestedDate}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{booking.requestedTime}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {booking.status === 'Pending' && (
              <>
               {/* Cancel Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <XCircle className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will cancel the booking request for {booking.petName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Back</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleCancel(booking.id)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Confirm Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                 {/* Accept/Schedule Popover */}
                <Popover>
                   <PopoverTrigger asChild>
                     <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                       <CheckCircle className="mr-1 h-4 w-4" />
                       Schedule
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-auto p-0">
                     <CalendarPicker
                       mode="single"
                       selected={selectedDate}
                       onSelect={setSelectedDate}
                       initialFocus
                     />
                     <div className="p-2 border-t border-border">
                        <Button
                           size="sm"
                           className="w-full bg-primary hover:bg-primary/90"
                           onClick={() => handleAccept(booking.id, selectedDate)}
                           disabled={!selectedDate}
                         >
                           Confirm Schedule on {selectedDate ? format(selectedDate, "PPP") : '...'}
                         </Button>
                     </div>
                   </PopoverContent>
                 </Popover>
              </>
            )}
             {booking.status === 'Scheduled' && (
                 <AlertDialog>
                   <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
                       <XCircle className="mr-1 h-4 w-4" />
                       Cancel Scheduled
                     </Button>
                   </AlertDialogTrigger>
                   <AlertDialogContent>
                     <AlertDialogHeader>
                       <AlertDialogTitle>Cancel Scheduled Booking?</AlertDialogTitle>
                       <AlertDialogDescription>
                         Are you sure you want to cancel this already scheduled booking for {booking.petName} on {booking.requestedDate}?
                       </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                       <AlertDialogCancel>Back</AlertDialogCancel>
                       <AlertDialogAction
                         onClick={() => handleCancel(booking.id)}
                         className="bg-destructive hover:bg-destructive/90"
                       >
                         Confirm Cancellation
                       </AlertDialogAction>
                     </AlertDialogFooter>
                   </AlertDialogContent>
                 </AlertDialog>
             )}
          </CardFooter>
        </Card>
      ))}
       {bookings.length === 0 && (
         <div className="col-span-full text-center text-muted-foreground py-10">
           No booking requests found.
         </div>
       )}
    </div>
  );
}
