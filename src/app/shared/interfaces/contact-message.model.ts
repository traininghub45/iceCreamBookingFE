// contact.model.ts
export interface ContactMessage {
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
    createdAt?: Date;       // Will be set by backend
    isRead?: boolean;      // Will be managed by backend
  }