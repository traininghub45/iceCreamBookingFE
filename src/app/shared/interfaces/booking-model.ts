// booking.model.ts
export interface Booking {
    id?: number;
    userName?: string;
    phoneNumber:string;
    email:string
    eventDate: string;
    location?: string;
    numberOfGuests: number;
    iceCreamPreferences?: string;
    isApproved: boolean;
  }
  