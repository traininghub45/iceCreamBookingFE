// booking.model.ts
export interface Booking {
    id: number;
    userId: number;
    phoneNumber:string;
    email:string
    eventDate: Date;
    location?: string;
    numberOfGuests: number;
    iceCreamPreferences?: string;
    isApproved: boolean;
  }
  